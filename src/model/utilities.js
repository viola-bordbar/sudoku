export function isValidPlacement(board, row, col, num) {
    //row & col check
    for(let i = 0; i < 9; i++) {
        if(board[row][i] == num) return false;
        if(board[i][col] == num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    //3x3 box check
    for(let r = boxRow; r < boxRow + 3; r++) {
        for(let c = boxCol; c < boxCol + 3; c++) {
            if(board[r][c] === num) return false;
        }
    }

    return true;
}

export function createBoard() {
    return Array(9).fill(null).map(createRow);
}

export function createRow() {
    return Array(9).fill(0);
}

//loop through board to find an empty cell (0)
export function findEmptyCell(board) {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(board[i][j] == 0) return {row: i, col: j};
        }
    }

    return null;
}

export function solveBoard(board) {
    //find an empty cell
    const emptyCell = findEmptyCell(board);
    if(emptyCell == null) return true; 

    //when empty cell is found, try placing numbers 1-9 in it and check if valid
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

//create a board solution by filling in an empty board with solveBoard
export function generateBoardSolution() {
    const board = createBoard();
    solveBoard(board);
    return board; 
}

//create a puzzle by removing numbers from the solution board, making sure there is an existing solution
export function generatePuzzle() {
    const solution = generateBoardSolution();
    const puzzle = solution.map(copyRow); 

    let cellsToRemove = 40;
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

export function copyRow(r) {
    return [...r];
}

export function boxCellToRowCol(boxIndex, cellIndex) {
    const row = Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3);
    const col = (boxIndex % 3) * 3 + (cellIndex % 3);
    return {row, col};
}