export type Point = [number, number];

const k1 = [
  [0, 0, 0],
  [0, 1, 1],
  [0, 1, 1],
];
const k2 = [
  [0, 0, 0],
  [1, 1, 0],
  [1, 1, 0],
];
const k3 = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 0],
];
const k4 = [
  [0, 1, 1],
  [0, 1, 1],
  [0, 0, 0],
];

const k5 = [
  [1, 0, 0],
  [0, 1, 1],
  [0, 1, 1],
];
const k6 = [
  [0, 0, 1],
  [1, 1, 0],
  [1, 1, 0],
];
const k7 = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];
const k8 = [
  [0, 1, 1],
  [0, 1, 1],
  [1, 0, 0],
];

const k9 = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 0, 0],
];

const k10 = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 1],
];

const k11 = [
  [0, 0, 1],
  [0, 0, 1],
  [1, 1, 1],
];

const k12 = [
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 1],
];

const kernels = [k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12];

const doubleRes = (map: number[][]) => {
  const newMap: number[][] = [];
  for (let i = 0; i < map.length; i++) {
    const newRow: number[] = [];
    for (let j = 0; j < map[0].length; j++) {
      newRow.push(map[i][j]);
      newRow.push(map[i][j]);
    }
    newMap.push(newRow);
    newMap.push(newRow);
  }
  return newMap;
};

const convolute = (map: number[][], type: number, kernel: number[][]) => {
  const calculateKernelSum = (i: number, j: number) => {
    let sum = 0;
    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        sum += map[i + k][j + l] === kernel[k][l] ? 1 : 0;
      }
    }
    return sum;
  };

  let count = 0;
  for (let i = 0; i < map.length - 2; i++) {
    for (let j = 0; j < map[0].length - 2; j++) {
      if (calculateKernelSum(i, j) === 9) {
        count++;
      }
    }
  }
  return count;
};

const RegionToMap = (region: Point[], mapSize: Point, key = 1) => {
  const map: number[][] = new Array(mapSize[0]).fill(0).map(() => new Array(mapSize[1]).fill(0));
  for (let i = 0; i < region.length; i++) {
    map[region[i][0]][region[i][1]] = key;
  }
  return map;
};

const addborder = (map: number[][]) => {
  const newMap: number[][] = new Array(map.length + 2).fill(0).map(() => new Array(map[0].length + 2).fill(0));
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      newMap[i + 1][j + 1] = map[i][j];
    }
  }
  return newMap;
};

export const detectCorners = (region: Point[], mapSize: Point) => {
  const map = doubleRes(addborder(RegionToMap(region, mapSize)));
  let count = 0;
  for (const kernel of kernels) {
    count += convolute(map, 1, kernel);
  }
  return count;
};
