import {createBoard, createRow, generatePuzzle, loadGame, createNotes} from "./utilities.js";

const saved = loadGame();

let initialState;

if (saved) {
    initialState = {
        ...saved,
        notes: saved.notes ?? createNotes(),
        notesMode: saved.notesMode ?? false,
    };
} else {
    const { puzzle, solution } = generatePuzzle();

    initialState = {
        board: puzzle.map(row => [...row]),
        givenCells: puzzle,
        solution,
        selectedCell: null,
        invalidCell: null,
        history: [],
        status: "playing",
        message: "",
        messageType: "",
        notes: createNotes(),
        notesMode: false,
    };
}

export const model = initialState;

export function startNewGame(model, difficulty) {
    const { puzzle, solution } = generatePuzzle(difficulty);

    model.board = puzzle.map(row => [...row]);
    model.givenCells = puzzle;
    model.solution = solution;
    model.selectedCell = null;
    model.invalidCell = null;
    model.history = [];
    model.status = "playing";
    model.message = "";
    model.messageType = "";
    model.notes = createNotes();
    model.notesMode = false;
}
