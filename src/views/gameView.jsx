import { boxCellToRowCol, rowColToBox, isNumberComplete } from "../model/utilities";
import "/src/style.css";

export function GameView(props) {

    //Forwards an erase click to the presenter
    function eraseCB() {
        props.onErase();
    }

    //Forwards an undo click to the presenter
    function undoCB() {
        props.onUndo();
    }

    //Forwards a notes toggle click to the presenter
    function notesToggleCB() {
        props.onNotesToggle();
    }

    //Returns a click handler for a number, used for the number pad buttons
    function numberClickCB(n) {
        return function() {
            props.onNumberClick(n);
        }
    }

    //Renders a number button in the number pad 
    function numberLineCB(n) {
        return (
            <button
                key={n}
                className="number-btn"
                onClick={numberClickCB(n)}
            >
                {n}
            </button>
        );
    }

    //Returns a click handler for a cell, used for the board cells
    function cellClickACB(boxIndex, cellIndex) {
        return function() {
            props.onCellClick(boxIndex, cellIndex);
        }
    }

    //Renders a cell in the board, determining its value, notes, and styling based on the current game state
    function renderCellCB(boxIndex) {
        return function(_, cellIndex) {
            const {row, col} = boxCellToRowCol(boxIndex, cellIndex);
            const cellValue = props.board[row][col];
            const cellNotes = props.notes?.[row]?.[col] ?? [];

            //True if the cell is invalid, meaning it was filled with an incorrect number
            const isInvalid = props.invalidCell != null &&
            props.invalidCell != undefined &&
            props.invalidCell.row === row &&
            props.invalidCell.col === col;

            //True if the cell is the currently selected cell
            const isSelected = props.selectedCell != null &&
            props.selectedCell.row === row &&
            props.selectedCell.col === col;

            const selectedBox = props.selectedCell != null ? 
            rowColToBox(props.selectedCell.row, props.selectedCell.col) : 
            null;

            //True if the cell is in the same row, column, or box as the selected cell
            const isHighlighted = props.selectedCell != null && 
            (props.selectedCell.row === row || 
            props.selectedCell.col === col ||
            boxIndex === selectedBox);

            const selectedValue = props.selectedCell != null ? 
            props.board[props.selectedCell.row][props.selectedCell.col] : 
            null;

            //True if the cell has the same value as the selected cell, used for highlighting similar numbers
            const isSameValue = !!selectedValue &&
            props.board[row][col] === selectedValue;

            const className = [
                "cell",
                isInvalid && "invalid",
                isSelected && "selected",
                isHighlighted && "highlighted",
                isSameValue && "same-value",
            ].filter(Boolean).join(" ");

            return (
                <div 
                    key={cellIndex} 
                    className={className}
                    onClick={cellClickACB(boxIndex, cellIndex)}
                >
                    {cellValue ? (
                        cellValue
                    ) : (
                        //If the cell is empty, render its notes if any
                        <div className="notes-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(noteNumber => (
                                <span key={noteNumber}>
                                    {cellNotes.includes(noteNumber) ? noteNumber : ""}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
    }

    //Renders a 3x3 box in the board, containing 9 cells
    function renderBoxCB(_, boxIndex) {
        return(
            <div key={boxIndex} className="box">
                {Array(9).fill(null).map(renderCellCB(boxIndex))}
            </div>
        );
    }

    return (
        <div className="game-page">
            <div className="game-bg-shape game-bg-shape-left"></div>
            <div className="game-bg-shape game-bg-shape-right"></div>

            <div className="game-card">
                <div className="game-header">
                    <div>
                        <p className="game-label">Classic puzzle</p>
                        <h1 className="game-title">Sudoku</h1>
                    </div>

                    <button className="back-btn" onClick={() => window.history.back()}>
                        Back
                    </button>
                </div>

                <div className="game-content">
                    <div className="board">
                        {Array(9).fill(null).map(renderBoxCB)}
                    </div>

                    <div className="game-controls">
                        <div className="message-area">
                            {props.message && (
                                <p className={`game-message ${props.messageType}`}>
                                    {props.message}
                                </p>
                            )}
                        </div>

                        <div className="action-buttons">
                            <button className="action-btn" onClick={undoCB}>
                                <span className="action-icon">↶</span>
                                Undo
                            </button>

                            <button className="action-btn" onClick={eraseCB}>
                                <span className="action-icon">⌫</span>
                                Erase
                            </button>

                            <button className={props.notesMode ? "action-btn notes-btn active" : "action-btn notes-btn"} onClick={notesToggleCB}>
                                <span className="action-icon">✎</span>
                                Notes
                            </button>
                        </div>

                        <div className="number-pad">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9]
                            //Only show numbers that have not been completed on the board
                            .filter(n => !isNumberComplete(props.board, n))
                            .map(numberLineCB)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}