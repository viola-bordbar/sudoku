import {} from "./utilities.js";

function createRow() {
    return Array(9).fill(0);
}

function createBoard() {
    return Array(9).fill(null).map(createRow);
}

export const testPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

export const model = {
    board: testPuzzle.map(r => [...r]),
    givenCells: testPuzzle,
    selectedCell: null,
    invalidCell: null,
    history: [],
    status: "playing"
};

/*export const model = {
    board: createBoard(),
    solution: null, //completed board / "facit"
    givenCells: [], //pre-filled cells (can not be edited)
    selectedCell: null, // {row, col}
    history: [], //for undo
    status: "playing",
};*/
