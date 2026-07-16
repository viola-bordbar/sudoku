import { StartPageView } from "../views/startPageView";
import { useRouter } from "vue-router";
import { startNewGame } from "../model/game.js";
import { clearSavedGame, hasSavedGame, loadGame } from "../model/utilities.js";

export function StartPage(props) {
    const router = useRouter();

    function handleStartGameACB(difficulty) {
        clearSavedGame();
        startNewGame(props.model, difficulty);
        router.push('/game');
    }

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
