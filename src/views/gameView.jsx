import "/src/style.css";

export function GameView() {

    function numberLineCB(n) {
        return(
            <span key={n}>
                <button className="nums-bottom">{n}</button>
            </span>
        );
    }

    function renderCellCB(_, cellIndex) {
        return <div key={cellIndex} className="cell"/>
    }

    function renderBoxCB(_, boxIndex) {
        return(
            <div key={boxIndex} className="box">
                {Array(9).fill(null).map(renderCellCB)}

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
                    <button>Undo</button>
                    <button>Erase</button>
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