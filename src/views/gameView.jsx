import { boxCellToRowCol, rowColToBox, isNumberComplete } from "../model/utilities";
import "/src/style.css";

export function GameView(props) {

    function eraseCB() {
        props.onErase();
    }

    function undoCB() {
        props.onUndo();
    }

    function numberClickCB(n) {
        return function() {
            props.onNumberClick(n);
        }
    }

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

    function cellClickACB(boxIndex, cellIndex) {
        return function() {
            props.onCellClick(boxIndex, cellIndex);
        }
    }

    function renderCellCB(boxIndex) {
        return function(_, cellIndex) {
            const {row, col} = boxCellToRowCol(boxIndex, cellIndex);
            const cellValue = props.board[row][col];
            const cellNotes = props.notes?.[row]?.[col] ?? [];

            const isInvalid = props.invalidCell != null &&
            props.invalidCell != undefined &&
            props.invalidCell.row === row &&
            props.invalidCell.col === col;

            const isSelected = props.selectedCell != null &&
            props.selectedCell.row === row &&
            props.selectedCell.col === col;

            const selectedBox = props.selectedCell != null ? 
            rowColToBox(props.selectedCell.row, props.selectedCell.col) : 
            null;

            const isHighlighted = props.selectedCell != null && 
            (props.selectedCell.row === row || 
            props.selectedCell.col === col ||
            boxIndex === selectedBox);

            const selectedValue = props.selectedCell != null ? 
            props.board[props.selectedCell.row][props.selectedCell.col] : 
            null;

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

    function renderBoxCB(_, boxIndex) {
        return(
            <div key={boxIndex} className="box">
                {Array(9).fill(null).map(renderCellCB(boxIndex))}
            </div>
        );
    }

    function notesToggleCB() {
        props.onNotesToggle();
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
                            .filter(n => !isNumberComplete(props.board, n))
                            .map(numberLineCB)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}