export function part2(input: string): number {
  const grid = input.split('\n').map((line) => line.split(''));
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function isValid(r: number, c: number): boolean {
    // verify if the row and column are within the grid
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  function checkDiagonalX(r: number, c: number): boolean {
    // Ensure the center is 'A'
    if (grid[r][c] !== 'A') return false;

    // Check top-left to bottom-right (primary diagonal)
    const primaryMAS = isValid(r - 1, c - 1) && isValid(r + 1, c + 1) && grid[r - 1][c - 1] === 'M' && grid[r + 1][c + 1] === 'S';

    const primarySAM = isValid(r - 1, c - 1) && isValid(r + 1, c + 1) && grid[r - 1][c - 1] === 'S' && grid[r + 1][c + 1] === 'M';

    const primaryXMAS = primaryMAS || primarySAM;

    // Check top-right to bottom-left (secondary diagonal)
    const secondaryMAS = isValid(r - 1, c + 1) && isValid(r + 1, c - 1) && grid[r - 1][c + 1] === 'M' && grid[r + 1][c - 1] === 'S';

    const secondarySAM = isValid(r - 1, c + 1) && isValid(r + 1, c - 1) && grid[r - 1][c + 1] === 'S' && grid[r + 1][c - 1] === 'M';

    const secondaryXMAS = secondaryMAS || secondarySAM;

    // Confirm intersecting "X-MAS" pattern
    return primaryXMAS && secondaryXMAS;
  }

  // Traverse the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r > 0 && r < rows - 1 && c > 0 && c < cols - 1 && checkDiagonalX(r, c)) {
        count++;
      }
    }
  }
  return count;
}
