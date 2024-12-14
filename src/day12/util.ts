export type Point = [number, number];
type Mat2d = number[][];

const generateKernels = () => {
  const rotate90 = (matrix: number[][]): number[][] => matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse());
  const invert = (matrix: number[][]): number[][] => matrix.map((row) => row.map((cell) => (cell === 0 ? 1 : 0)));
  const kernels: Mat2d[] = [];
  let cornerCase = [
    [1, 0, 0],
    [0, 1, 1],
    [0, 1, 1],
  ];
  let baseKernel = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 1],
  ];
  for (let i = 0; i < 4; i++) {
    kernels.push(baseKernel, invert(baseKernel), cornerCase);
    baseKernel = rotate90(baseKernel);
    cornerCase = rotate90(cornerCase);
  }
  return kernels;
};

const kernels = generateKernels();
const doubleRes = (map: Mat2d) => {
  const newMap: Mat2d = [];
  const [rows, cols] = [map.length, map[0].length];
  for (let i = 0; i < rows; i++) {
    const newRow: number[] = [];
    for (let j = 0; j < cols; j++) newRow.push(map[i][j], map[i][j]);
    newMap.push(newRow, newRow);
  }
  return newMap;
};

const convolute = (map: Mat2d, type: number, kernel: Mat2d) => {
  const calculateKernelSum = (i: number, j: number) => {
    let sum = 0;
    for (let k = 0; k < 3; k++) for (let l = 0; l < 3; l++) sum += map[i + k][j + l] === kernel[k][l] ? 1 : 0;
    return sum;
  };

  let count = 0;
  const [rows, cols] = [map.length, map[0].length];
  for (let i = 0; i < rows - 2; i++) for (let j = 0; j < cols - 2; j++) if (calculateKernelSum(i, j) === 9) count++;
  return count;
};

const regionToMap = (region: Point[]) => {
  // find bounding box
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [x, y] of region) [minX, minY, maxX, maxY] = [Math.min(minX, x), Math.min(minY, y), Math.max(maxX, x), Math.max(maxY, y)];
  const [sizeX, sizeY] = [maxX - minX + 1, maxY - minY + 1];

  // create new map
  const offset = [Math.min(...region.map((point) => point[0])), Math.min(...region.map((point) => point[1]))];
  const map: Mat2d = new Array(sizeX).fill(0).map(() => new Array(sizeY).fill(0));

  for (let i = 0; i < region.length; i++) {
    const [x, y] = region[i];
    map[x - offset[0]][y - offset[1]] = 1;
  }

  // add padding
  const [rows, cols] = [map.length, map[0].length];
  const newMap: Mat2d = new Array(map.length + 2).fill(0).map(() => new Array(map[0].length + 2).fill(0));
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) newMap[i + 1][j + 1] = map[i][j];
  return newMap;
};

export const detectCorners = (region: Point[]) => {
  const map = doubleRes(regionToMap(region));
  let count = 0;
  for (const kernel of kernels) count += convolute(map, 1, kernel);
  return count;
};
