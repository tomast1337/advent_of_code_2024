type MapItens = '.' | '#' | 'O' | '@';
const MapItens: Record<string, MapItens> = {
  EMPTY: '.',
  WALL: '#',
  BOX: 'O',
  ROBOT: '@',
};
export type Position = [number, number];
export type Warehouse = MapItens[][];
export type Direction = '^' | 'v' | '<' | '>';
const Directions: Record<string, Direction> = {
  UP: '^',
  DOWN: 'v',
  LEFT: '<',
  RIGHT: '>',
} as const;

const movements = {
  [Directions.UP]: (position: Position) => [position[0] - 1, position[1]],
  [Directions.DOWN]: (position: Position) => [position[0] + 1, position[1]],
  [Directions.LEFT]: (position: Position) => [position[0], position[1] - 1],
  [Directions.RIGHT]: (position: Position) => [position[0], position[1] + 1],
} as const;

const parseRobotMovementInstructions = (data: string) => {
  const [map, moves] = data.split('\n\n');
  const warehouse = map.split('\n').map((row) => row.split('') as MapItens[]);
  const robotInstructions = moves
    .replaceAll('\n', '')
    .split('')
    .map((move) => move as Direction);
  const robotPosition: Position = warehouse.reduce(
    (acc, row, y) => {
      const x = row.findIndex((item) => item === MapItens.ROBOT);
      return x === -1 ? acc : [x, y];
    },
    [-1, -1],
  );
  return { warehouse, robotInstructions, robotPosition };
};

export const moveBox = (warehouse: Warehouse, boxPosition: Position, direction: Direction): boolean => {
  const [newX, newY] = movements[direction](boxPosition); // Use correct row-column order

  // Check for out-of-bounds or wall
  if (newX < 0 || newX >= warehouse.length || newY < 0 || newY >= warehouse[0].length || warehouse[newX][newY] === MapItens.WALL) {
    return false;
  }

  // If there's another box, attempt to move it recursively
  if (warehouse[newX][newY] === MapItens.BOX) {
    const canMoveNextBox = moveBox(warehouse, [newX, newY], direction);
    if (!canMoveNextBox) {
      return false;
    }
  }

  // Move the box
  warehouse[newX][newY] = MapItens.BOX;
  warehouse[boxPosition[0]][boxPosition[1]] = MapItens.EMPTY;
  return true;
};

export const moveRobot = (warehouse: Warehouse, robotPosition: Position, direction: Direction): Position => {
  if (warehouse[robotPosition[0]][robotPosition[1]] !== MapItens.ROBOT) {
    throw new Error(`Robot is not in the correct position: ${robotPosition}`);
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
  if (target === MapItens.BOX) {
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
    .replace(/@/g, '🤖')
    .replace(/#/g, '🧱')
    .replace(/O/g, '📦')
    .replace(/\./g, '🟦');

const simulateRobot = (warehouse: Warehouse, robotInstructions: Direction[], robotPosition: Position) => {
  robotInstructions.forEach((direction) => {
    robotPosition = moveRobot(warehouse, robotPosition, direction);
    //process.stdout.write(warehouseToString(warehouse) + `\n\nStep: ${step + 1} - Last Direction: ${direction}\n`);
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
