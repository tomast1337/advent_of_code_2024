type Point = { row: number; col: number };

const directions = [
  { row: -1, col: 0 }, // up
  { row: 1, col: 0 }, // down
  { row: 0, col: -1 }, // left
  { row: 0, col: 1 }, // right
];

const exploreRegion = (start: Point, type: string, map: string[][], visited: boolean[][]) => {
  const [rows, cols] = [map.length, map[0].length];
  const isWithinBounds = (point: Point) => {
    return point.row >= 0 && point.row < rows && point.col >= 0 && point.col < cols;
  };

  let area = 0;
  let perimeter = 0;
  const stack = [start];
  visited[start.row][start.col] = true;

  while (stack.length > 0) {
    const current = stack.pop()!;
    area++;

    for (const direction of directions) {
      const neighbor = {
        row: current.row + direction.row,
        col: current.col + direction.col,
      };

      if (!isWithinBounds(neighbor) || map[neighbor.row][neighbor.col] !== type) {
        perimeter++;
      } else if (!visited[neighbor.row][neighbor.col]) {
        visited[neighbor.row][neighbor.col] = true;
        stack.push(neighbor);
      }
    }
  }

  return { area, perimeter };
};

const parseInput = (input: string) => input.split('\n').map((row) => row.split(''));

export const calculateTotalFencePrice = (input: string) => {
  const map = parseInput(input);
  const [rows, cols] = [map.length, map[0].length];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  let totalPrice = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!visited[row][col]) {
        const type = map[row][col];
        const regionInfo = exploreRegion({ row, col }, type, map, visited);
        totalPrice += regionInfo.area * regionInfo.perimeter;
      }
    }
  }

  return totalPrice;
};

export const calculateTotalPriceWithSides = (input: string): number => {
  const map = parseInput(input);
  const rows = map.length;
  const cols = map[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  const isInsideMap = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < rows && y < cols;

  const dfs = (x: number, y: number, type: string): { area: number; sides: number } => {
    const stack = [[x, y]];
    let area = 0;
    let sides = 0;

    while (stack.length > 0) {
      const [cx, cy] = stack.pop()!;

      if (!isInsideMap(cx, cy) || visited[cx][cy] || map[cx][cy] !== type) {
        continue;
      }

      visited[cx][cy] = true;
      area++;

      for (const [dx, dy] of directions) {
        const nx = cx + dx;
        const ny = cy + dy;

        if (!isInsideMap(nx, ny) || map[nx][ny] !== type) {
          // Increment sides for boundaries
          sides++;
        } else if (!visited[nx][ny]) {
          stack.push([nx, ny]);
        }
      }
    }

    return { area, sides };
  };

  let totalPrice = 0;

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (!visited[x][y]) {
        const type = map[x][y];
        const { area, sides } = dfs(x, y, type);
        totalPrice += area * sides;
      }
    }
  }

  return totalPrice;
};
