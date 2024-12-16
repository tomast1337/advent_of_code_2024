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

export const moveBox = (warehouse: Warehouse, boxPosition: Position, direction: Direction): boolean => {
  const boxSide = warehouse[boxPosition[0]][boxPosition[1]];
  let boxLeft: Position;
  let boxRight: Position;
  if (warehouse[boxPosition[0]][boxPosition[1]] === MapItens.BOX_LEFT) {
    boxLeft = boxPosition;
    boxRight = [boxPosition[0], boxPosition[1] + 1];
  } else {
    boxRight = boxPosition;
    boxLeft = [boxPosition[0], boxPosition[1] - 1];
  }
  const newBoxLeft = movements[direction](boxLeft);
  const newBoxRight = movements[direction](boxRight);
  // Check for out-of-bounds or wall
  if (
    newBoxLeft[0] < 0 ||
    newBoxLeft[0] >= warehouse.length ||
    newBoxLeft[1] < 0 ||
    newBoxLeft[1] >= warehouse[0].length ||
    warehouse[newBoxLeft[0]][newBoxLeft[1]] === MapItens.WALL
  ) {
    return false;
  }
  if (
    newBoxRight[0] < 0 ||
    newBoxRight[0] >= warehouse.length ||
    newBoxRight[1] < 0 ||
    newBoxRight[1] >= warehouse[0].length ||
    warehouse[newBoxRight[0]][newBoxRight[1]] === MapItens.WALL
  ) {
    return false;
  }
  // Check for walls directly in the direction of movement
  if (direction === Directions.UP) {
    if (warehouse[newBoxLeft[0]][newBoxLeft[1]] === MapItens.WALL || warehouse[newBoxRight[0]][newBoxRight[1]] === MapItens.WALL) {
      return false;
    }
  } else if (direction === Directions.DOWN) {
    if (warehouse[newBoxLeft[0]][newBoxLeft[1]] === MapItens.WALL || warehouse[newBoxRight[0]][newBoxRight[1]] === MapItens.WALL) {
      return false;
    }
  } else {
    if (warehouse[newBoxLeft[0]][newBoxLeft[1]] === MapItens.WALL || warehouse[newBoxRight[0]][newBoxRight[1]] === MapItens.WALL) {
      return false;
    }
  }

  // Check for other boxes on left or right
  // If there's another box, attempt to move it recursively
  if (direction === Directions.UP || direction === Directions.DOWN) {
    if (warehouse[newBoxLeft[0]][newBoxLeft[1]] === MapItens.BOX_LEFT || warehouse[newBoxLeft[0]][newBoxLeft[1]] === MapItens.BOX_RIGHT) {
      if (!moveBox(warehouse, newBoxLeft, direction)) {
        return false;
      }
    }
    if (warehouse[newBoxRight[0]][newBoxRight[1]] === MapItens.BOX_LEFT || warehouse[newBoxRight[0]][newBoxRight[1]] === MapItens.BOX_RIGHT) {
      if (!moveBox(warehouse, newBoxRight, direction)) {
        return false;
      }
    }
  } else {
    // left and right
    if (boxSide === MapItens.BOX_LEFT) {
      if (warehouse[newBoxLeft[0]][newBoxLeft[1]] === MapItens.BOX_LEFT || warehouse[newBoxLeft[0]][newBoxLeft[1]] === MapItens.BOX_RIGHT) {
        if (!moveBox(warehouse, newBoxLeft, direction)) {
          return false;
        }
      }
    } else {
      if (warehouse[newBoxRight[0]][newBoxRight[1]] === MapItens.BOX_LEFT || warehouse[newBoxRight[0]][newBoxRight[1]] === MapItens.BOX_RIGHT) {
        if (!moveBox(warehouse, newBoxRight, direction)) {
          return false;
        }
      }
    }
  }

  // Move the box left and right simultaneously
  warehouse[boxLeft[0]][boxLeft[1]] = MapItens.EMPTY;
  warehouse[boxRight[0]][boxRight[1]] = MapItens.EMPTY;
  warehouse[newBoxLeft[0]][newBoxLeft[1]] = MapItens.BOX_LEFT;
  warehouse[newBoxRight[0]][newBoxRight[1]] = MapItens.BOX_RIGHT;
  return true;
};

export const moveRobot = (warehouse: Warehouse, robotPosition: Position, direction: Direction): Position => {
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
    // Attempt to move the box
    const boxMoved = moveBox(warehouse, [newY, newX], direction);
    if (!boxMoved) {
      return robotPosition; // Box couldn't be moved, robot stays in place
    }
  }
  // Move robot
  warehouse[newY][newX] = MapItens.ROBOT;
  warehouse[robotPosition[0]][robotPosition[1]] = MapItens.EMPTY;
  return [newY, newX];
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
  robotInstructions.forEach((direction) => {
    robotPosition = moveRobot(warehouse, robotPosition, direction);
    process.stdout.write(warehouseToString(warehouse) + '\n\n');
  });
};

export const calculateGPS = (warehouse: Warehouse): number => {
  let gpsSum = 0;
  for (let y = 0; y < warehouse.length; y++) {
    for (let x = 0; x < warehouse[0].length; x++) {
      if (warehouse[y][x] === MapItens.BOX) {
        gpsSum += 100 * y + x;
      }
    }
  }
  return gpsSum;
};

export const part1 = (data: string) => {
  const { warehouse, robotInstructions, robotPosition } = parseRobotMovementInstructions(data);
  simulateRobot(warehouse, robotInstructions, robotPosition);
  return calculateGPS(warehouse);
};
