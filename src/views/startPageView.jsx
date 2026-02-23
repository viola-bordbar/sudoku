export function StartPageView(props) {

    function startGameACB() {
        props.onStartGame();
    }

    return (
        <div>
            <h1>Sudoku</h1>

            <p>
                Play sudoku and relax!
            </p>

            <button onClick={startGameACB}>Start new game</button>

        </div>
    )
}
