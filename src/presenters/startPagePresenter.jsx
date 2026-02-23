import { StartPageView } from "../views/startPageView";
import { useRouter } from "vue-router";

export function StartPage() {
    const router = useRouter();

    function handleStartGameACB() {
        router.push('/game');
    }
   
    return (
        <StartPageView
            onStartGame={handleStartGameACB}
        />
    );
}
