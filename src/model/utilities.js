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

export function isBoardComplete() {
   //Full recheck needed? or possible to combine with isValidPlacement?
}

export function generatePuzzle() {
    //Logic for pre-filled cells, randomized placement & number
}

export function copyRow(r) {
    return [...r];
}

export function boxCellToRowCol(boxIndex, cellIndex) {
    const row = Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3);
    const col = (boxIndex % 3) * 3 + (cellIndex % 3);
    return {row, col};
}