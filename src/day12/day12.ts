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
