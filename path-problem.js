function solution(matrix) {
  // make board with Xs
  const [arr, aPos] = makeBoard(matrix);
  if (!aPos.length) return false;

  // depth first search for path
  function dfs(matrix, row, col, visited) {
    let maxRow = matrix.length;
    let maxCol = matrix[0].length;

    // invalid paths: out of boundary, barriers (X), visited squares
    if (row < 0 || row >= maxRow || col < 0 || col >= maxCol || matrix[row][col] === 'X' || visited[row][col]) return;

    visited[row][col] = true;

    // search in all 4 directions
    dfs(matrix, row - 1, col, visited)
    dfs(matrix, row + 1, col, visited)
    dfs(matrix, row, col - 1, visited)
    dfs(matrix, row, col + 1, visited)
  }

  // visited array to track visited coordinates
  let visited = [];
  for (let i = 0; i < arr.length; i++) {
    visited[i] = new Array(arr[0].length).fill(false)
  }

  // start path search from assassin coordinates
  dfs(arr, aPos[0], aPos[1], visited)

  // console.log(visited);
  // if bottom right square cannot be visited, return false
  if (!visited[arr.length - 1][arr[0].length - 1]) return false;

  return true;
}

// converts all guard line of sight to X on squares
function makeBoard(B) {
  let refBoard = [...B]
  let aPos = []

  B.forEach((rowStr, rowIndex) => {
    // find A start position
    if (rowStr.includes('A')) {
      aPos = [rowIndex, B[rowIndex].indexOf('A')];
    }

    // convert all guard line of sight to X in all directions
    if (rowStr.includes('v')) {
      let col = rowStr.indexOf('v');
      for (i = rowIndex; i < B.length; i++) {
        if (refBoard[i][col] == 'X' || ['>', '<', '^'].includes(refBoard[i][col])) break;
        B[i] = addXAt(B[i], col)
      }
    }
    if (rowStr.includes('>')) {
      let col = rowStr.indexOf('>');
      for (i = col; i < rowStr.length; i++) {
        if (refBoard[rowIndex][i] == 'X' || ['v', '<', '^'].includes(refBoard[rowIndex][i])) break;
        B[rowIndex] = addXAt(B[rowIndex], i)
      }
    }
    if (rowStr.includes('<')) {
      let col = rowStr.indexOf('<');
      for (i = col; i >= 0; i--) {
        if (refBoard[rowIndex][i] == 'X' || ['v', '>', '^'].includes(refBoard[rowIndex][i])) break;
        B[rowIndex] = addXAt(B[rowIndex], i)
      }
    }
    if (rowStr.includes('^')) {
      let col = rowStr.indexOf('^');
      for (i = rowIndex; i >= 0; i--) {
        if (refBoard[i][col] == 'X' || ['>', '<', 'v'].includes(refBoard[i][col])) break;
        B[i] = addXAt(B[i], col)
      }
    }
  })
  return [B, aPos];
}

// helper for adding X at index in string
function addXAt(str, index) {
  return str.slice(0, index) + 'X' + str.slice(index + 1)
}

module.exports = { solution };
