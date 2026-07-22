export function StartPageView(props) {

    //Returns a click handler for starting a new game with the given difficulty
    function startGameACB(difficulty) {
        return function () {
            props.onStartGame(difficulty);
        };
    }

    //Forwards a continue game click to the presenter
    function continueGameACB() {
        props.onContinueGame();
    }

    return (
        <div className="start-page">

            <div className="start-card">

                <div className="layered-circles">
                    <span className="circle circle-1"></span>
                    <span className="circle circle-2"></span>
                    <span className="circle circle-3"></span>
                    <span className="circle circle-4"></span>
                </div>

                <div className="sudoku-icon">
                    <div className="sudoku-icon-grid">
                        {Array(9).fill(null).map((_, i) => (
                            <span key={i}></span>
                        ))}
                    </div>
                </div>

                <h1 className="start-title">Sudoku</h1>

                <p className="start-subtitle">
                    Play sudoku and relax!
                </p>

                <div className="start-buttons">
                    {/* Only shown if there is a saved game to resume */}
                    {props.showContinue && (
                        <button
                            className="menu-btn primary-btn"
                            onClick={continueGameACB}
                        >
                            <span className="btn-icon">▶</span>
                            <span>Continue game</span>
                        </button>
                    )}

                    <button
                        className="menu-btn"
                        onClick={startGameACB("easy")}
                    >
                        <span className="btn-icon">✦</span>
                        <span>Easy</span>
                    </button>

                    <button
                        className="menu-btn"
                        onClick={startGameACB("medium")}
                    >
                        <span className="btn-icon">≡</span>
                        <span>Medium</span>
                    </button>

                    <button
                        className="menu-btn"
                        onClick={startGameACB("hard")}
                    >
                        <span className="btn-icon">▲</span>
                        <span>Hard</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
