type Position = [number, number];
type Direction = 'N' | 'E' | 'S' | 'W';

interface State {
  position: Position;
  direction: Direction;
  score: number;
}

const directions: Direction[] = ['N', 'E', 'S', 'W'];
const movements: Record<Direction, Position> = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

const parseMaze = (input: string): { maze: string[][]; start: Position; end: Position } => {
  const maze = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));
  let start: Position = [0, 0];
  let end: Position = [0, 0];

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
      if (maze[y][x] === 'S') start = [y, x];
      if (maze[y][x] === 'E') end = [y, x];
    }
  }

  return { maze, start, end };
};

const isValidPosition = (maze: string[][], position: Position): boolean => {
  const [y, x] = position;
  return y >= 0 && y < maze.length && x >= 0 && x < maze[0].length && maze[y][x] !== '#';
};

const getNeighbors = (state: State, maze: string[][]): State[] => {
  const neighbors: State[] = [];
  const [y, x] = state.position;
  const dirIndex = directions.indexOf(state.direction);

  // Move forward
  const [dy, dx] = movements[state.direction];
  const newPosition: Position = [y + dy, x + dx];
  if (isValidPosition(maze, newPosition)) {
    neighbors.push({
      position: newPosition,
      direction: state.direction,
      score: state.score + 1,
    });
  }

  // Rotate clockwise
  const newDirClockwise = directions[(dirIndex + 1) % 4];
  neighbors.push({
    position: state.position,
    direction: newDirClockwise,
    score: state.score + 1000,
  });

  // Rotate counterclockwise
  const newDirCounterClockwise = directions[(dirIndex + 3) % 4];
  neighbors.push({
    position: state.position,
    direction: newDirCounterClockwise,
    score: state.score + 1000,
  });

  return neighbors;
};

const heuristic = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
};

const findLowestScore = (input: string): number => {
  const { maze, start, end } = parseMaze(input);
  const startState: State = { position: start, direction: 'E', score: 0 };
  const endPosition = end;

  const openSet = new Set<string>();
  const openHeap: State[] = [startState];
  const gScore: Map<string, number> = new Map();
  const fScore: Map<string, number> = new Map();

  const stateKey = (state: State) => `${state.position[0]},${state.position[1]},${state.direction}`;

  openSet.add(stateKey(startState));
  gScore.set(stateKey(startState), 0);
  fScore.set(stateKey(startState), heuristic(startState.position, endPosition));

  while (openHeap.length > 0) {
    openHeap.sort((a, b) => fScore.get(stateKey(a))! - fScore.get(stateKey(b))!);
    const current = openHeap.shift()!;
    openSet.delete(stateKey(current));

    if (current.position[0] === endPosition[0] && current.position[1] === endPosition[1]) {
      return current.score;
    }

    for (const neighbor of getNeighbors(current, maze)) {
      const tentativeGScore = gScore.get(stateKey(current))! + (neighbor.score - current.score);

      if (tentativeGScore < (gScore.get(stateKey(neighbor)) ?? Infinity)) {
        gScore.set(stateKey(neighbor), tentativeGScore);
        fScore.set(stateKey(neighbor), tentativeGScore + heuristic(neighbor.position, endPosition));

        if (!openSet.has(stateKey(neighbor))) {
          openSet.add(stateKey(neighbor));
          openHeap.push(neighbor);
        }
      }
    }
  }

  return -1; // If no path is found
};

const findShortestPathsTilesCount = (input: string): number => {
  const { maze, start, end } = parseMaze(input);

  const [endY, endX] = end;
  const rows = maze.length;
  const cols = maze[0].length;

  const isValid = (y: number, x: number): boolean => y >= 0 && y < rows && x >= 0 && x < cols && maze[y][x] !== '#';

  const directions = Object.values(movements);

  // Step 1: BFS to calculate shortest distances
  const distances = new Map<string, number>();
  const queue: [number, number, number][] = [[...start, 0]]; // [y, x, distance]

  const toKey = (y: number, x: number): string => `${y},${x}`;

  distances.set(toKey(start[0], start[1]), 0);

  while (queue.length > 0) {
    const [currentY, currentX, dist] = queue.shift()!;

    for (const [dy, dx] of directions) {
      const nextY = currentY + dy;
      const nextX = currentX + dx;

      if (isValid(nextY, nextX)) {
        const key = toKey(nextY, nextX);

        if (!distances.has(key) || dist + 1 < distances.get(key)!) {
          distances.set(key, dist + 1);
          queue.push([nextY, nextX, dist + 1]);
        }
      }
    }
  }

  const shortestDistance = distances.get(toKey(endY, endX));
  if (shortestDistance === undefined) return 0; // No path exists

  // Step 2: Backtrack to collect shortest path tiles
  const pathTiles = new Set<string>();
  const backtrackQueue: [number, number][] = [[endY, endX]];

  while (backtrackQueue.length > 0) {
    const [currentY, currentX] = backtrackQueue.pop()!;
    const currentKey = toKey(currentY, currentX);

    pathTiles.add(currentKey);

    for (const [dy, dx] of directions) {
      const prevY = currentY - dy;
      const prevX = currentX - dx;

      if (isValid(prevY, prevX)) {
        const prevKey = toKey(prevY, prevX);

        if (distances.has(prevKey) && distances.get(prevKey)! === distances.get(currentKey)! - 1) {
          backtrackQueue.push([prevY, prevX]);
        }
      }
    }
  }

  return pathTiles.size;
};
export const solve = (input: string) => {
  return {
    part1: findLowestScore(input),
    part2: findShortestPathsTilesCount(input),
  };
};
