type MapItens = '.' | '[' | ']' | '#' | '@';
export type Position = [number, number];
export type Warehouse = MapItens[][];
export type Direction = '^' | 'v' | '<' | '>';
const MapItens: Record<string, MapItens> = {
  EMPTY: '.',
  WALL: '#',
  BOX_LEFT: '[',
  BOX_RIGHT: ']',
  ROBOT: '@',
};

const Directions: Record<string, Direction> = {
  UP: '^',
  DOWN: 'v',
  LEFT: '<',
  RIGHT: '>',
} as const;

const movements = {
  [Directions.UP]: (position: Position): Position => [position[0] - 1, position[1]],
  [Directions.DOWN]: (position: Position): Position => [position[0] + 1, position[1]],
  [Directions.LEFT]: (position: Position): Position => [position[0], position[1] - 1],
  [Directions.RIGHT]: (position: Position): Position => [position[0], position[1] + 1],
} as const;

export const parseRobotMovementInstructions = (data: string) => {
  const [map, moves] = data.split('\n\n');
  const warehouse = map
    .replace(/O/g, '[]')
    .replace(/\./g, '..')
    .replace(/@/g, '@.')
    .replace(/#/g, '##')
    .split('\n')
    .map((row) => row.split('') as MapItens[]);
  const robotInstructions = moves
    .replaceAll('\n', '')
    .split('')
    .map((move) => move as Direction);
  for (let i = 0; i < warehouse.length; i++) {
    for (let j = 0; j < warehouse[i].length; j++) {
      if (warehouse[i][j] === '@') {
        return { warehouse, robotInstructions, robotPosition: [i, j] as Position };
      }
    }
  }
  throw Error('No robot found');
};

export const findConnectedBoxes = (warehouse: Warehouse, start: Position, direction: Direction) => {
  let startLeft: Position;
  let startRight: Position;
  if (warehouse[start[0]][start[1]] === MapItens.BOX_LEFT) {
    startLeft = start;
    startRight = [start[0], start[1] + 1];
  } else {
    startLeft = [start[0], start[1] - 1];
    startRight = start;
  }

  const stack: Position[] = [startLeft, startRight];
  const visited: Set<string> = new Set();
  const connectedBoxes: {
    position: Position;
    type: MapItens;
  }[] = [];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const key = `${current[0]},${current[1]}`;
    if (visited.has(key)) continue;
    visited.add(key);
    connectedBoxes.push({
      position: current,
      type: warehouse[current[0]][current[1]],
    });

    const [newY, newX] = movements[direction](current);
    if (
      newY >= 0 &&
      newY < warehouse.length &&
      newX >= 0 &&
      newX < warehouse[0].length &&
      (warehouse[newY][newX] === MapItens.BOX_LEFT || warehouse[newY][newX] === MapItens.BOX_RIGHT)
    ) {
      let nextBoxL: Position;
      let nextBoxR: Position;
      if (warehouse[newY][newX] === MapItens.BOX_LEFT) {
        nextBoxL = [newY, newX];
        nextBoxR = [newY, newX + 1];
      } else {
        nextBoxL = [newY, newX - 1];
        nextBoxR = [newY, newX];
      }
      stack.push(nextBoxL);
      stack.push(nextBoxR);
    }
  }

  return connectedBoxes;
};

export const moveBox = (warehouse: Warehouse, boxPosition: Position, direction: Direction): boolean => {
  const connectedBoxes = findConnectedBoxes(warehouse, boxPosition, direction);
  for (const box of connectedBoxes) {
    const [newY, newX] = movements[direction](box.position);
    // Bounds checking
    if (newY < 0 || newY >= warehouse.length || newX < 0 || newX >= warehouse[0].length) {
      return false; // Out of bounds, box cannot be moved
    }
    if (warehouse[newY][newX] === MapItens.WALL) {
      return false; // Wall, box cannot be moved
    }
  }

  // Move all connected boxes
  // replace all boxes with empty spaces
  for (const { position } of connectedBoxes) {
    warehouse[position[0]][position[1]] = MapItens.EMPTY;
  }
  // place all boxes in the new position
  for (const { position, type } of connectedBoxes) {
    const [newY, newX] = movements[direction](position);
    warehouse[newY][newX] = type;
  }

  return true;
};

export const moveRobot = (warehouse: Warehouse, robotPosition: Position, direction: Direction) => {
  if (warehouse[robotPosition[0]][robotPosition[1]] !== MapItens.ROBOT) {
    throw new Error(`Robot is not in the correct position: ${robotPosition}, found a "${warehouse[robotPosition[0]][robotPosition[1]]}"`);
  }
  const [newY, newX] = movements[direction](robotPosition);
  // Bounds checking
  if (newY < 0 || newY >= warehouse.length || newX < 0 || newX >= warehouse[0].length) {
    return robotPosition; // Out of bounds, robot stays in place
  }
  const target = warehouse[newY][newX];
  if (target === MapItens.WALL) {
    return robotPosition; // Wall, robot stays in place
  }
  if (target === MapItens.BOX_LEFT || target === MapItens.BOX_RIGHT) {
    if (!moveBox(warehouse, [newY, newX], direction)) {
      return robotPosition; // Box cannot be moved, robot stays in place
    }
  }
  // Move the robot
  warehouse[robotPosition[0]][robotPosition[1]] = MapItens.EMPTY;
  warehouse[newY][newX] = MapItens.ROBOT;
  return [newY, newX] as Position;
};

export const warehouseToString = (warehouse: Warehouse) =>
  warehouse
    .map((row) => row.join(''))
    .join('\n')
    .replace(/#/g, '🧱')
    .replace(/@/g, '🤖')
    .replace(/\[/g, '🤜')
    .replace(/\]/g, '🤛')
    .replace(/O/g, '📦')
    .replace(/\./g, '🟦');

const simulateRobot = (warehouse: Warehouse, robotInstructions: Direction[], robotPosition: Position) => {
  robotInstructions.forEach((direction) => (robotPosition = moveRobot(warehouse, robotPosition, direction)));
};

export const calculateGPS = (warehouse: Warehouse) => {
  let gpsSum = 0;
  for (let y = 0; y < warehouse.length; y++) for (let x = 0; x < warehouse[0].length; x++) if (warehouse[y][x] === MapItens.BOX_LEFT) gpsSum += 100 * y + x;
  return gpsSum;
};

export const part1 = (data: string) => {
  const { warehouse, robotInstructions, robotPosition } = parseRobotMovementInstructions(data);
  simulateRobot(warehouse, robotInstructions, robotPosition);
  return calculateGPS(warehouse);
};
