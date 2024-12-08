import { directions, Position, parseMap } from './util';

const moveGuard1 = (grid: string[][], start: Position, dir: number) => {
  const visited = new Set<string>();
  let { x, y } = start;
  let { x: dx, y: dy } = directions[dir];

  let shouldContinue = true;
  while (shouldContinue) {
    visited.add(`${x},${y}`);
    const [x1, y1] = [x + dx, y + dy];

    if (grid[y1]?.[x1] === '#') {
      dir = (dir + 1) % 4;
      [dx, dy] = [directions[dir].x, directions[dir].y];
    } else {
      x = x1;
      y = y1;
    }

    shouldContinue = grid[y]?.[x] !== undefined;
  }

  return visited.size;
};

export const part1 = (data: string) => {
  const { grid, start, direction } = parseMap(data);
  const dirIndex = '^>v<'.indexOf(direction);
  return moveGuard1(grid, start, dirIndex);
};
