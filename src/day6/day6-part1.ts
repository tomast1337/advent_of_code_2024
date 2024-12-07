type Direction = '^' | '>' | 'v' | '<';
type Position = { x: number; y: number };
const parseMap = (data: string): { grid: string[][]; start: Position; direction: Direction } => {
  const map = data.split('\n');
  let start: Position = { x: 0, y: 0 };
  let direction: Direction = '^';
  const grid = map.map((line, y) => {
    return line.split('').map((char, x) => {
      if ('^>v<'.includes(char)) {
        start = { x, y };
        direction = char as Direction;
        return '.';
      }
      return char;
    });
  });
  return { grid, start, direction };
};

const shouldEnd = (grid: string[][], pos: Position, dir: Direction) => {
  const nextX = pos.x + { '^': 0, '>': 1, v: 0, '<': -1 }[dir];
  const nextY = pos.y + { '^': -1, '>': 0, v: 1, '<': 0 }[dir];
  if (nextX < 0 || nextX >= grid[0].length || nextY < 0 || nextY >= grid.length) {
    return false;
  }
  return true;
};

const moveGuard = (grid: string[][], start: Position, direction: Direction) => {
  const directions: Record<Direction, Position> = {
    '^': { x: 0, y: -1 },
    '>': { x: 1, y: 0 },
    v: { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
  };
  const turnRight: Record<Direction, Direction> = {
    '^': '>',
    '>': 'v',
    v: '<',
    '<': '^',
  };

  const visited = new Set<string>();
  let { x, y } = start;
  let dir = direction;

  do {
    visited.add(`${x},${y}`);
    const nextX = x + directions[dir].x;
    const nextY = y + directions[dir].y;

    if (nextX >= 0 && nextX < grid[0].length && nextY >= 0 && nextY < grid.length && grid[nextY][nextX] !== '#') {
      x = nextX;
      y = nextY;
    } else {
      dir = turnRight[dir];
    }
  } while (shouldEnd(grid, { x, y }, dir));

  // add last position
  visited.add(`${x},${y}`);

  return visited.size;
};

export const part1 = (data: string) => {
  const { grid, start, direction } = parseMap(data);
  return moveGuard(grid, start, direction);
};
