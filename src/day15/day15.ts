type MapItens = '.' | '#' | 'O' | '@';
const MapItens: Record<string, MapItens> = {
  EMPTY: '.',
  WALL: '#',
  BOX: 'O',
  ROBOT: '@',
};

export type Direction = '^' | 'v' | '<' | '>';

const Directions: Record<string, Direction> = {
  UP: '^',
  DOWN: 'v',
  LEFT: '<',
  RIGHT: '>',
};

export type Position = [number, number];

export type Warehouse = MapItens[][];

const movements = {
  [Directions.UP]: (position: Position) => [position[0] - 1, position[1]],
  [Directions.DOWN]: (position: Position) => [position[0] + 1, position[1]],
  [Directions.LEFT]: (position: Position) => [position[0], position[1] - 1],
  [Directions.RIGHT]: (position: Position) => [position[0], position[1] + 1],
};

const parseRobotMovementInstructions = (data: string) => {
  const [map, moves] = data.split('\n\n');
  const warehouse = map.split('\n').map((row) => row.split('') as MapItens[]);
  const robotInstructions = moves.split('').map((move) => move as Direction);
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
  const [newY, newX] = movements[direction](boxPosition); // Use correct row-column order

  // Check for out-of-bounds or wall
  if (newY < 0 || newY >= warehouse.length || newX < 0 || newX >= warehouse[0].length || warehouse[newY][newX] === MapItens.WALL) {
    return false;
  }

  // If there's another box, attempt to move it recursively
  if (warehouse[newY][newX] === MapItens.BOX) {
    const canMoveNextBox = moveBox(warehouse, [newY, newX], direction);
    if (!canMoveNextBox) {
      return false;
    }
  }

  // Move the box
  warehouse[newY][newX] = MapItens.BOX;
  warehouse[boxPosition[0]][boxPosition[1]] = MapItens.EMPTY;
  return true;
};

export const moveRobot = (warehouse: Warehouse, robotPosition: Position, direction: Direction): Position => {
  if (warehouse[robotPosition[1]][robotPosition[0]] !== MapItens.ROBOT) {
    throw new Error('Robot position is not correct');
  }
  const [newX, newY] = movements[direction](robotPosition);
  // Bounds checking
  if (newX < 0 || newX >= warehouse[0].length || newY < 0 || newY >= warehouse.length) {
    return robotPosition; // Out of bounds, robot stays in place
  }
  const target = warehouse[newX][newY];
  if (target === MapItens.WALL) {
    return robotPosition; // Wall, robot stays in place
  }
  if (target === MapItens.BOX) {
    // Attempt to move the box
    const boxMoved = moveBox(warehouse, [newX, newY], direction);
    if (!boxMoved) {
      return robotPosition; // Box couldn't be moved, robot stays in place
    }
  }
  // Move robot
  warehouse[newX][newY] = MapItens.ROBOT;
  warehouse[robotPosition[1]][robotPosition[0]] = MapItens.EMPTY;
  return [newX, newY];
};

export const warehouseToString = (warehouse: Warehouse) =>
  warehouse
    .map((row) => row.join(''))
    .join('\n')
    .replace(/@/g, '🤖')
    .replace(/#/g, '🧱')
    .replace(/O/g, '📦')
    .replace(/\./g, '🟦');

const printWarehouse = (warehouse: Warehouse) => process.stdout.write(warehouseToString(warehouse) + '\n\n');

const simulateRobot = (warehouse: Warehouse, robotInstructions: Direction[], robotPosition: Position) => {
  robotInstructions.forEach((direction) => {
    moveRobot(warehouse, robotPosition, direction);
    printWarehouse(warehouse);
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
