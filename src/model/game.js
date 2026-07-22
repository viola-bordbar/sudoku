import {createBoard, createRow, generatePuzzle, loadGame, createNotes} from "./utilities.js";

//Load the saved game from localStorage if it exists
const saved = loadGame();

let initialState;

//If a saved game exists, use it as the initial state; otherwise, generate a new puzzle
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

//The reactive game state shared across the app
export const model = initialState;

//Starts a new game with the specified difficulty, resetting the model state and generating a new puzzle
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
