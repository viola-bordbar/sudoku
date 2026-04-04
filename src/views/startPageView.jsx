export function StartPageView(props) {

    function startGameACB() {
        props.onStartGame();
    }

    return (
        <div>
            <h1 className="title">Sudoku</h1>

            <p className="subtitle">
                Play sudoku and relax!
            </p>

            <button className="startbutton" onClick={startGameACB}>
                Start new game
            </button>

        </div>
    )
}
