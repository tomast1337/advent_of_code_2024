import { directions, Position, parseMap } from './util';

const moveGuard2 = (grid: string[][], start: Position, dir: number, placeObstruction: boolean): number => {
  const visited: Map<string, Set<number>> = new Map();
  let { x, y } = start;
  let { x: dx, y: dy } = directions[dir];
  let loopCount = 0;

  while (grid[y]?.[x] && !visited.get(`${x},${y}`)?.has(dir)) {
    (visited.get(`${x},${y}`) ?? new Set()).add(dir);
    visited.set(`${x},${y}`, visited.get(`${x},${y}`) ?? new Set([dir]));

    const [x1, y1] = [x + dx, y + dy];
    if (placeObstruction && grid[y1]?.[x1] === '.' && !visited.has(`${x1},${y1}`)) {
      grid[y1][x1] = '#';
      loopCount += moveGuard2(grid, { x, y }, dir, false);
      grid[y1][x1] = '.';
    }
    if (grid[y1]?.[x1] === '#') {
      dir = (dir + 1) % 4;
      [dx, dy] = [directions[dir].x, directions[dir].y];
    } else {
      [x, y] = [x1, y1];
    }
  }

  if (!placeObstruction && grid[y]?.[x]) {
    loopCount = 1;
  }
  return loopCount;
};

export const part2 = (data: string) => {
  const { grid, start, direction } = parseMap(data);
  const dirIndex = '^>v<'.indexOf(direction);
  return moveGuard2(grid, start, dirIndex, true);
};
