import { GameView } from "../views/gameView";
import { boxCellToRowCol, isValidPlacement, copyRow, saveGame, copyNotes, isPuzzleComplete, clearSavedGame } from "../model/utilities";
import { useRouter } from "vue-router";

export function Game(props) {

    const router = useRouter();

    //Selects a cell when a player clicks on it, converting the box and cell indices to row and column indices
    function handleCellClickACB(boxIndex, cellIndex) {
        const { row, col } = boxCellToRowCol(boxIndex, cellIndex);

        props.model.selectedCell = { row, col };
        props.model.invalidCell = null;
        props.model.message = "";
        props.model.messageType = "";

        saveGame(props.model);
    }

    //Handles a number button click, either placing/removing the number in the selected cell or adding/removing it from the notes, 
    //depending on the current mode. It also checks wether the placement is correct and updates the game state accordingly, 
    //including checking for puzzle completion.
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

            //If the note doesn't exist, add it; if it does, remove it
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

        //If the number is already in the cell, remove it
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

            //Check if the puzzle is complete after placing the number
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

    //Handles the erase button click, clearing the selected cell if it's not a given cell
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

    //Handles the undo button click, reverting the game state to the previous state saved in history if available
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

    //Saves the current board and notes state to the history stack for undo functionality
    function saveHistory() {
        props.model.history.push({
            board: props.model.board.map(copyRow),
            notes: copyNotes(props.model.notes),
        });
    }

    //Handles the notes toggle button click, switching between normal number mode and notes mode
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
