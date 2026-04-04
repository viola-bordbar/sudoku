import { GameView } from "../views/gameView";
import { boxCellToRowCol, isValidPlacement, copyRow } from "../model/utilities";

export function Game(props) {

    function handleCellClickACB(boxIndex, cellIndex) {
        const {row, col} = boxCellToRowCol(boxIndex, cellIndex);
        props.model.selectedCell = {row, col};
    }

    function handleNumberClickACB(n) {
        if(props.model.selectedCell == null) return;
        const {row, col} = props.model.selectedCell;

        if(!isValidPlacement(props.model.board, row, col, n)) {
            props.model.invalidCell = {row, col};
            props.model.selectedCell = {row, col};
        } else {
            props.model.invalidCell = null;
            props.model.history.push(props.model.board.map(copyRow));
        }

        if(props.model.board[row][col] === n) {
            props.model.board[row][col] = null;
        } else {
            props.model.board[row][col] = n;
        }
    }

    function handleEraseACB() {
        if(props.model.selectedCell == null) return;
        const {row, col} = props.model.selectedCell;

        props.model.history.push(props.model.board.map(copyRow));
        props.model.board[row][col] = null;
    }

    function handleUndoACB() {
        if(props.model.history.length === 0) return;
        const previousBoard = props.model.history.pop();
        props.model.board.forEach(function(row, i) {
            props.model.board[i] = previousBoard[i];
        });
    }

    return (
        <GameView
            onCellClick={handleCellClickACB}
            onNumberClick={handleNumberClickACB}
            onErase={handleEraseACB}
            onUndo={handleUndoACB}
            selectedCell={props.model.selectedCell}
            invalidCell={props.model.invalidCell}
            board={props.model.board}
        />
    );
}
