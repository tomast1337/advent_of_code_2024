export function part1(input: string): number {
  const grid = input.split('\n').map((line) => line.split(''));
  const word = 'XMAS';

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const rows = grid.length;
  const cols = grid[0].length;
  const wordLen = word.length;
  let count = 0;

  function isValid(r: number, c: number): boolean {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of directions) {
        let found = true;
        for (let k = 0; k < wordLen; k++) {
          const nr = r + k * dr;
          const nc = c + k * dc;
          if (!isValid(nr, nc) || grid[nr][nc] !== word[k]) {
            found = false;
            break;
          }
        }
        if (found) count++;
      }
    }
  }

  return count;
}
