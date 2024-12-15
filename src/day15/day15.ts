enum MapItens {
  EMPTY = '.',
  WALL = '#',
  BOX = 'O',
  ROBOT = '@',
}

enum Direction {
  UP = '^',
  DOWN = 'v',
  LEFT = '<',
  RIGHT = '>',
}

type Position = [number, number];

type Warehouse = MapItens[][];

const movements = {
  [Direction.UP]: (position: Position) => [position[0], position[1] - 1],
  [Direction.DOWN]: (position: Position) => [position[0], position[1] + 1],
  [Direction.LEFT]: (position: Position) => [position[0] - 1, position[1]],
  [Direction.RIGHT]: (position: Position) => [position[0] + 1, position[1]],
};

const parseWarehouseRobotInstructions = (data: string) => {
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

const moveBox = (warehouse: Warehouse, boxPosition: Position, direction: Direction) => {
  const [newX, newY] = movements[direction](boxPosition);
  if (warehouse[newX][newY] === MapItens.WALL) {
    return false;
  }
  if (warehouse[newX][newY] === MapItens.BOX) {
    // try to move next box
    const wasmoved = moveBox(warehouse, [newX, newY], direction);
    if (!wasmoved) {
      return false;
    }
  }
  // move box
  warehouse[newX][newY] = MapItens.BOX;
  warehouse[boxPosition[0]][boxPosition[1]] = MapItens.EMPTY;
  return true;
};

const moveRobot = (warehouse: Warehouse, robotPosition: Position, direction: Direction) => {
  const [newX, newY] = movements[direction](robotPosition);
  if (warehouse[newX][newY] === MapItens.WALL) {
    return false;
  }
  if (warehouse[newX][newY] === MapItens.BOX) {
    const wasmoved = moveBox(warehouse, [newX, newY], direction);
    if (!wasmoved) {
      return false;
    }
  }
  // move robot
  warehouse[newX][newY] = MapItens.ROBOT;
  warehouse[robotPosition[0]][robotPosition[1]] = MapItens.EMPTY;
  return true;
};

const printWarehouse = (warehouse: Warehouse) => {
  const data = warehouse
    .map((row) => row.join(''))
    .join('\n')
    .replace(/@/g, '🤖')
    .replace(/#/g, '🧱')
    .replace(/O/g, '📦')
    .replace(/\./g, '🟦');
  process.stdout.write('\x1Bc');
  process.stdout.write(data);
};

const simulateRobot = (warehouse: Warehouse, robotInstructions: Direction[], robotPosition: Position) => {
  robotInstructions.forEach((direction) => {
    moveRobot(warehouse, robotPosition, direction);
    printWarehouse(warehouse);
  });
};

const calculateGPS = (warehouse: Warehouse) => {
  let sum = 0;
  warehouse.forEach((row, y) => {
    row.forEach((item, x) => {
      if (item === MapItens.BOX) {
        sum += 100 * y + x;
      }
    });
  });
  return sum;
};

export const part1 = (data: string) => {
  const { warehouse, robotInstructions, robotPosition } = parseWarehouseRobotInstructions(data);
  simulateRobot(warehouse, robotInstructions, robotPosition);
  return calculateGPS(warehouse);
};
