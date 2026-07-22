import { StartPageView } from "../views/startPageView";
import { useRouter } from "vue-router";
import { startNewGame } from "../model/game.js";
import { clearSavedGame, hasSavedGame, loadGame } from "../model/utilities.js";

export function StartPage(props) {
    const router = useRouter();

    //Handles the start game button click, clearing any saved game and starting a new game with the selected difficulty and navigating to the game view
    function handleStartGameACB(difficulty) {
        clearSavedGame();
        startNewGame(props.model, difficulty);
        router.push('/game');
    }

    //Handles the continue game button click, loading the saved game state and navigating to the game view
    function handleContinueGameACB() {
        const saved = loadGame();
        if (saved == null) return;

        Object.assign(props.model, saved);
        router.push('/game');
    }
   
    return (
        <StartPageView
            onStartGame={handleStartGameACB}
            onContinueGame={handleContinueGameACB}
            showContinue={hasSavedGame()}
        />
    );
}
