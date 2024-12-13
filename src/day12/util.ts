export type Point = [number, number];
type Mat2d = number[][];

const kernels = [
  [[0, 0, 0],
    [0, 1, 1],
    [0, 1, 1]],
  [[0, 0, 0],
    [1, 1, 0],
    [1, 1, 0]],
  [[1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]],
  [[0, 1, 1],
    [0, 1, 1],
    [0, 0, 0]],
  [[1, 0, 0],
    [0, 1, 1],
    [0, 1, 1]],
  [[0, 0, 1],
    [1, 1, 0],
    [1, 1, 0]],
  [[1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]],
  [[0, 1, 1],
    [0, 1, 1],
    [1, 0, 0]],
  [[1, 1, 1],
    [1, 0, 0],
    [1, 0, 0]],
  [[1, 0, 0],
    [1, 0, 0],
    [1, 1, 1]],
  [[0, 0, 1],
    [0, 0, 1],
    [1, 1, 1]],
  [[1, 1, 1],
    [0, 0, 1],
    [0, 0, 1]]];

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

const RegionToMap = (region: Point[], mapSize: Point, key = 1) => {
  const map: Mat2d = new Array(mapSize[0]).fill(0).map(() => new Array(mapSize[1]).fill(0));
  for (let i = 0; i < region.length; i++) map[region[i][0]][region[i][1]] = key;
  return map;
};

const addborder = (map: Mat2d) => {
  const [rows, cols] = [map.length, map[0].length];
  const newMap: Mat2d = new Array(map.length + 2).fill(0).map(() => new Array(map[0].length + 2).fill(0));
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) newMap[i + 1][j + 1] = map[i][j];
  return newMap;
};

export const detectCorners = (region: Point[], mapSize: Point) => {
  const map = doubleRes(addborder(RegionToMap(region, mapSize)));
  let count = 0;
  for (const kernel of kernels) count += convolute(map, 1, kernel);
  return count;
};
