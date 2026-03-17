import { GameView } from "../views/gameView";
import { boxCellToRowCol } from "../model/utilities";
import { defineComponent, ref } from "vue";

export const Game = defineComponent({
    setup(props) {
        const selectedCell = ref(null);

        function handleCellClickACB(boxIndex, cellIndex) {
            const {row, col} = boxCellToRowCol(boxIndex, cellIndex);
            selectedCell.value = {row, col};
        }

        function handleNumberClickACB(n) {
            //TODO
        }

        function handleEraseACB() {
            //TODO
        }

        function handleUndoACB() {
            //TODO
        }

        return () => (
            <GameView
                onCellClick={handleCellClickACB}
                onNumberClick={handleNumberClickACB}
                onErase={handleEraseACB}
                onUndo={handleUndoACB}
                selectedCell={selectedCell.value}
            />
        );
    }

});
