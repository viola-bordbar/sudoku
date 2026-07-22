//LocalStorage key for saving the game
const SAVE_KEY = "sudoku-save";

//Number of cells to remove for each difficulty level
const DIFFICULTY_SETTINGS = {
    easy: 35,
    medium: 45,
    hard: 55,
};

//Create a 9x9 board filled with 0s
export function createBoard() {
    return Array(9).fill(null).map(createRow);
}

//Create a row filled with 0s
export function createRow() {
    return Array(9).fill(0);
}

//Shallow-copies a row so that the original row is not modified when the copy is changed
export function copyRow(r) {
    return [...r];
}

//Checks if a number can be placed in a specific cell without violating Sudoku rules
export function isValidPlacement(board, row, col, num) {
    for(let i = 0; i < 9; i++) {
        if(board[row][i] == num) return false;
        if(board[i][col] == num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for(let r = boxRow; r < boxRow + 3; r++) {
        for(let c = boxCol; c < boxCol + 3; c++) {
            if(board[r][c] === num) return false;
        }
    }

    return true;
}

//Loops through the board so that the first empty cell is found and returned, or null if there are no empty cells
export function findEmptyCell(board) {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(board[i][j] == 0) return {row: i, col: j};
        }
    }

    return null;
}

//Solves the board using backtracking, returning true if a solution is found and false if not
export function solveBoard(board) {
    const emptyCell = findEmptyCell(board);
    if(emptyCell == null) return true; 

    const {row, col} = emptyCell;
    for(let num = 1; num <= 9; num++) {
        if(isValidPlacement(board, row, col, num)) {
            board[row][col] = num; 
            if(solveBoard(board)) return true;
            board[row][col] = 0;
        }
    }

    return false;
}

//Creates a board solution by filling in an empty board with solveBoard
export function generateBoardSolution() {
    const board = createBoard();
    solveBoard(board);
    return board; 
}

//Creates a puzzle by removing numbers from the solution board, making sure there is an existing solution
export function generatePuzzle(difficulty = "medium") {
    const solution = generateBoardSolution();
    const puzzle = solution.map(copyRow); 

    let cellsToRemove = DIFFICULTY_SETTINGS[difficulty] ?? DIFFICULTY_SETTINGS.medium;
    while(cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if(puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            cellsToRemove--;
        }
    }

    return {puzzle, solution};
}

//Checks if a number is complete in the board, meaning it appears 9 times
export function isNumberComplete(board, num) {
    let count = 0;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === num) count++;
        }
    }
    return count === 9;
}

//Checks if the current board matches the solution, meaning the puzzle is complete
export function isPuzzleComplete(board, solution) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== solution[row][col]) {
                return false;
            }
        }
    }

    return true;
}

//Creates a notes grid
export function createNotes() {
    return Array(9).fill(null).map(() =>
        Array(9).fill(null).map(() => [])
    );
}

//Deep-copies a notes grid so history/undo doesn't share references with the current notes grid
export function copyNotes(notes) {
    return notes.map(row =>
        row.map(cellNotes => [...cellNotes])
    );
}

//Converts a box index and cell index to row and column indices
export function boxCellToRowCol(boxIndex, cellIndex) {
    const row = Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3);
    const col = (boxIndex % 3) * 3 + (cellIndex % 3);
    return {row, col};
}

//Converts row and column indices to a box index
export function rowColToBox(row, col) {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

//Returns true if there is a saved game in localStorage, false otherwise
export function hasSavedGame() {
    return loadGame() !== null;
}

//Persists the current game to localStorage
export function saveGame(model) {
    const data = {
        board: model.board,
        givenCells: model.givenCells,
        solution: model.solution,
        selectedCell: model.selectedCell,
        invalidCell: model.invalidCell,
        history: model.history,
        status: model.status,
        notes: model.notes,
        notesMode: model.notesMode,
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

//Loads the saved game from localStorage, returning null if there is no saved game or if the data is invalid
export function loadGame() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

//Clears the saved game from localStorage
export function clearSavedGame() {
    localStorage.removeItem(SAVE_KEY);
}
