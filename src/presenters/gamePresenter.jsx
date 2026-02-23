import { GameView } from "../views/gameView";

export function Game(props) {
    return (
            <GameView
                people={props.model.people}
                expenses={props.model.expenses}
                sumOfCosts={props.model.sumOfCosts}
            />
        );
}