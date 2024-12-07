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
  // if next position is out of bounds
  const nextX = pos.x + { '^': 0, '>': 1, v: 0, '<': -1 }[dir];
  const nextY = pos.y + { '^': -1, '>': 0, v: 1, '<': 0 }[dir];
  if (nextX < 0 || nextX >= grid[0].length || nextY < 0 || nextY >= grid.length) {
    // if next position is out of bounds end
    return false;
  }
  // if inside grid continue
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

  const visits = new Array<{
    dir: Direction;
    pos: Position;
  }>();
  let { x, y } = start;
  let dir = direction;

  do {
    visits.push({
      dir,
      pos: { x, y },
    });
    const nextX = x + directions[dir].x;
    const nextY = y + directions[dir].y;

    if (nextX >= 0 && nextX < grid[0].length && nextY >= 0 && nextY < grid.length && grid[nextY][nextX] !== '#') {
      x = nextX;
      y = nextY;
    } else {
      dir = turnRight[dir];
    }
  } while (shouldEnd(grid, { x, y }, dir));

  visits.push({
    dir,
    pos: { x, y },
  });

  const loops = new Set<string>();

  for (let i = 0; i < visits.length; i++) {
    const visit = visits[i];
    // if there is another visit with the same position but with a direction in 90 degrees difference then we have a possible loop
    const loop = visits.find((v) => v.pos.x === visit.pos.x && v.pos.y === visit.pos.y && Math.abs(v.dir.charCodeAt(0) - visit.dir.charCodeAt(0)) === 2);
    if (loop) {
      loops.add(`${visit.pos.x},${visit.pos.y},${visit.dir}`);
    }
  }

  return loops.size;
};

export const part2 = (data: string) => {
  const { grid, start, direction } = parseMap(data);
  return moveGuard(grid, start, direction);
};
