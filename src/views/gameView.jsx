import { boxCellToRowCol } from "../model/utilities";
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
        return(
            <span key={n}>
                <button className="nums-bottom" onClick={numberClickCB(n)}>{n}</button>
            </span>
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

            const isSelected = props.selectedCell != null &&
            props.selectedCell.row === row &&
            props.selectedCell.col === col;

            const isInvalid = props.invalidCell != null &&
            props.invalidCell != undefined &&
            props.invalidCell.row === row &&
            props.invalidCell.col === col;

            return (
                <div 
                    key={cellIndex} 
                    className={isSelected ? "cell selected" : isInvalid ? "cell invalid" : "cell"}
                    onClick={cellClickACB(boxIndex, cellIndex)}
                >
                    {props.board[row][col] || ""}
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

    return (
        <div>
            <h1>Sudoku</h1>

            <div className="container">

                <div className="board">
                    {Array(9).fill(null).map(renderBoxCB)}
                </div>
           
                <div>
                    <button onClick={undoCB}>Undo</button>
                    <button onClick={eraseCB}>Erase</button>
                    <button>Notes</button>
                    <button>Hint</button>
                </div>

                <div>
                    {[1,2,3,4,5,6,7,8,9].map(numberLineCB)}
                </div>

            </div>
            
        </div>
    );
}