import { GameView } from "../views/gameView";
import { boxCellToRowCol, isValidPlacement, copyRow, saveGame, copyNotes, isPuzzleComplete, clearSavedGame } from "../model/utilities";
import { useRouter } from "vue-router";

export function Game(props) {

    const router = useRouter();

    function handleCellClickACB(boxIndex, cellIndex) {
        const { row, col } = boxCellToRowCol(boxIndex, cellIndex);

        props.model.selectedCell = { row, col };
        props.model.invalidCell = null;
        props.model.message = "";
        props.model.messageType = "";

        saveGame(props.model);
    }

    function handleNumberClickACB(n) {
        if (props.model.selectedCell == null) {
            props.model.message = "Select a cell first.";
            props.model.messageType = "error";
            return;
        }

        const { row, col } = props.model.selectedCell;

        if (props.model.givenCells[row][col] !== 0) {
            props.model.message = "This number cannot be changed.";
            props.model.messageType = "error";
            return;
        }

        //Notes mode
        if (props.model.notesMode) {
            if (props.model.board[row][col]) {
                props.model.message = "Erase the number before adding notes.";
                props.model.messageType = "error";
                return;
            }

            saveHistory();

            const cellNotes = props.model.notes[row][col];
            const noteIndex = cellNotes.indexOf(n);

            if (noteIndex === -1) {
                cellNotes.push(n);
                cellNotes.sort((a, b) => a - b);
            } else {
                cellNotes.splice(noteIndex, 1);
            }

            props.model.invalidCell = null;
            props.model.message = "";
            props.model.messageType = "";

            saveGame(props.model);
            return;
        }

        //Normal number mode
        saveHistory();

        if (props.model.board[row][col] === n) {
            props.model.board[row][col] = null;
            props.model.invalidCell = null;
            props.model.message = "";
            props.model.messageType = "";

            saveGame(props.model);
            return;
        }

        props.model.board[row][col] = n;

        //Remove notes from the cell after placing a number
        props.model.notes[row][col] = [];

        const isCorrect = props.model.solution[row][col] === n;

        if (isCorrect) {
            props.model.invalidCell = null;

            if (isPuzzleComplete(props.model.board, props.model.solution)) {
                props.model.status = "completed";
                props.model.message = "Puzzle completed! Great job!";
                props.model.messageType = "success";

                clearSavedGame();

                setTimeout(function () {
                    router.push("/startPage");
                }, 3000);

                return;
            }

            props.model.message = "Correct!";
            props.model.messageType = "success";
        } else {
            props.model.invalidCell = { row, col };
            props.model.message = "That number is incorrect.";
            props.model.messageType = "error";
        }

        saveGame(props.model);;
    }

    function handleEraseACB() {
        if (props.model.selectedCell == null) return;
        const { row, col } = props.model.selectedCell;
        if (props.model.givenCells[row][col] !== 0) return;
        saveHistory();

        props.model.board[row][col] = null;
        props.model.notes[row][col] = [];
        props.model.invalidCell = null;
        props.model.message = "";
        props.model.messageType = "";

        saveGame(props.model);
    }

    function handleUndoACB() {
        if (props.model.history.length === 0) return;

        const previousState = props.model.history.pop();

        props.model.board = previousState.board.map(copyRow);
        props.model.notes = copyNotes(previousState.notes);

        props.model.invalidCell = null;
        props.model.message = "";
        props.model.messageType = "";

        saveGame(props.model);
    }

    function saveHistory() {
        props.model.history.push({
            board: props.model.board.map(copyRow),
            notes: copyNotes(props.model.notes),
        });
    }

    function handleNotesToggleACB() {
        props.model.notesMode = !props.model.notesMode;
        props.model.message = props.model.notesMode
            ? "Notes mode enabled."
            : "";

        props.model.messageType = "";
        saveGame(props.model);
    }

    return (
        <GameView
            onCellClick={handleCellClickACB}
            onNumberClick={handleNumberClickACB}
            onErase={handleEraseACB}
            onUndo={handleUndoACB}
            onNotesToggle={handleNotesToggleACB}
            selectedCell={props.model.selectedCell}
            invalidCell={props.model.invalidCell}
            board={props.model.board}
            notes={props.model.notes}
            notesMode={props.model.notesMode}
            message={props.model.message}
            messageType={props.model.messageType}
        />
    );
}
