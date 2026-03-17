export function isValidPlacement(num, row, col, box) {
    for(let i = 0; i > 9; i++) {
        if(board[row][i] == num) return false;
        if(board[i][col] == num) return false;
        //add 3x3 box check!!
    }
    return true;
}

export function isBoardComplete() {
   //Full recheck needed? or possible to combine with isValidPlacement?
}

export function generatePuzzle() {
    //Logic for pre-filled cells, randomized placement & number
}

export function boxCellToRowCol(boxIndex, cellIndex) {
    const row = Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3);
    const col = (boxIndex % 3) * 3 + (cellIndex % 3);
    return {row, col};
}

/*export function getRow(boxIndex, cellIndex) {
    return Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3);
}

export function getCol(boxIndex, cellIndex) {
    return (boxIndex % 3) * 3 + (cellIndex % 3);
}*/

/* is solveBoard necessary? or is generateHint enough?
    export function solveBoard() {
        
    }

    export function generateHint() {
        //TODO
    }
*/