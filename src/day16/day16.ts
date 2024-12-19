type State = [number, number, number, number, string];

const parseInput = (input: string): string[][] =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(''));

const findStart = (grid: string[][]): [number, number] => {
  for (let y = 0; y < grid.length; y++) for (let x = 0; x < grid[y].length; x++) if (grid[y][x] === 'S') return [y, x];
  throw new Error('No start position found');
};

const DIR_TO_MOVEMENT: Record<number, [number, number]> = { 0: [-1, 0], 1: [0, 1], 2: [1, 0], 3: [0, -1] };

export const solveReindeerMaze = (input: string) => {
  const grid = parseInput(input);
  const start = findStart(grid);
  const ptWiseMinScore: Record<string, number> = {};
  let queue: State[] = [[start[0], start[1], 1, 0, '']];
  let bestScore = Infinity;
  const paths: [string, number][] = [];

  while (queue.length > 0) {
    const newQueue: State[] = [];

    for (const state of queue) {
      const [y, x, face, score, path] = state;
      const posKey = `${y},${x}`;
      const cacheKey = `${posKey},${face}`;

      if (y < 0 || x < 0 || y >= grid.length || x >= grid[0].length || grid[y][x] === '#') continue;

      const newPath = path + `${posKey}->`;

      if (ptWiseMinScore[cacheKey] !== undefined && ptWiseMinScore[cacheKey] < score) continue;

      ptWiseMinScore[cacheKey] = score;

      if (grid[y][x] === 'E') {
        paths.push([newPath, score]);
        if (score < bestScore) {
          bestScore = score;
        }
        continue;
      }
      const availableMoves = [face, (face + 1) % 4, (face + 3) % 4];
      for (const move of availableMoves) {
        const [dy, dx] = DIR_TO_MOVEMENT[move];
        const nextScore = score + (face === move ? 1 : 1001);
        newQueue.push([y + dy, x + dx, move, nextScore, newPath]);
      }
    }

    queue = newQueue;
  }

  const uniqueTiles = new Set<string>();
  const optimalPaths = paths.filter(([, score]) => score === bestScore);

  for (const [path] of optimalPaths) {
    const tiles = path.split('->');
    for (const tile of tiles) if (tile !== '') uniqueTiles.add(tile);
  }

  return {
    part1: bestScore,
    part2: uniqueTiles.size,
  };
};
