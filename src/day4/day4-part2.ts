export const part2 = (input: string): number => {
  const grid = input.split('\n').map((line) => line.split(''));
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const isValid = (r: number, c: number) => r >= 0 && r < rows && c >= 0 && c < cols;

  const checkDiagonalX = (r: number, c: number): boolean => {
    if (grid[r][c] !== 'A') return false;

    const primaryMAS = isValid(r - 1, c - 1) && isValid(r + 1, c + 1) && grid[r - 1][c - 1] === 'M' && grid[r + 1][c + 1] === 'S';
    const primarySAM = isValid(r - 1, c - 1) && isValid(r + 1, c + 1) && grid[r - 1][c - 1] === 'S' && grid[r + 1][c + 1] === 'M';
    const primaryXMAS = primaryMAS || primarySAM;

    const secondaryMAS = isValid(r - 1, c + 1) && isValid(r + 1, c - 1) && grid[r - 1][c + 1] === 'M' && grid[r + 1][c - 1] === 'S';
    const secondarySAM = isValid(r - 1, c + 1) && isValid(r + 1, c - 1) && grid[r - 1][c + 1] === 'S' && grid[r + 1][c - 1] === 'M';
    const secondaryXMAS = secondaryMAS || secondarySAM;

    return primaryXMAS && secondaryXMAS;
  };

  // Traverse the grid
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (checkDiagonalX(r, c)) {
        count++;
      }
    }
  }
  return count;
};
