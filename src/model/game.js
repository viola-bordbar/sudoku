import {} from "./utilities.js";

function createRow() {
    return Array(9).fill(0);
}

function createBoard() {
    return Array(9).fill(null).map(createRow);
}

export const model = {
    board: createBoard(),
    solution: null, //completed board / "facit"
    givenCells: [], //pre-filled cells (can not be edited)
    selectedCell: null, // {row, col}
    history: [], //for undo
};
