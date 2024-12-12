type Point = [number, number];

const parseMap = (input: string) => input.split('\n').map((row) => row.split(''));

const directions: Point[] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const exploreRegion = (start: Point, type: string, map: string[][], visited: boolean[][]) => {
  const [rows, cols] = [map.length, map[0].length];
  const isWithinBounds = (point: Point) => {
    return point[0] >= 0 && point[0] < rows && point[1] >= 0 && point[1] < cols;
  };

  let area = 0;
  let perimeter = 0;
  const stack = [start];
  visited[start[0]][start[1]] = true;

  while (stack.length > 0) {
    const current = stack.pop()!;
    area++;

    for (const direction of directions) {
      const neighbor: Point = [current[0] + direction[0], current[1] + direction[1]];

      if (!isWithinBounds(neighbor) || map[neighbor[0]][neighbor[1]] !== type) {
        perimeter++;
      } else if (!visited[neighbor[0]][neighbor[1]]) {
        visited[neighbor[0]][neighbor[1]] = true;
        stack.push(neighbor);
      }
    }
  }

  return { area, perimeter };
};

export const part1 = (input: string) => {
  const map = parseMap(input);
  const [rows, cols] = [map.length, map[0].length];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  let totalPrice = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!visited[row][col]) {
        const type = map[row][col];
        const regionInfo = exploreRegion([row, col], type, map, visited);
        totalPrice += regionInfo.area * regionInfo.perimeter;
      }
    }
  }

  return totalPrice;
};

const part2 = (input: string) => {
  // HELP
  return 0;
};
