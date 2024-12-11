const parseMontainMap = (diskMap: string) => diskMap.split('\n').map((row) => row.split('').map(Number));

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const exploreMapDepthFirst = (x: number, y: number, visited: Set<string>, map: number[][]) => {
  const [rows, cols] = [map.length, map[0].length];
  const stack = [[x, y]];
  let reachableNines = 0;

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    const key = `${cx},${cy}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (map[cx][cy] === 9) {
      reachableNines++;
      continue;
    }

    for (const [dx, dy] of directions) {
      const [nx, ny] = [cx + dx, cy + dy];
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited.has(`${nx},${ny}`) && map[nx][ny] === map[cx][cy] + 1) {
        stack.push([nx, ny]);
      }
    }
  }

  return reachableNines;
};

const calculateTrailheadScores = (map: number[][]) => {
  const [rows, cols] = [map.length, map[0].length];

  let totalScore = 0;

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (map[x][y] === 0) {
        const visited = new Set<string>();
        totalScore += exploreMapDepthFirst(x, y, visited, map);
      }
    }
  }
  console.log(totalScore);

  return totalScore;
};

const exploreMapDepthFirstDistinct = (x: number, y: number, visited: Set<string>, map: number[][]) => {
  const [rows, cols] = [map.length, map[0].length];
  const key = `${x},${y}`;
  if (visited.has(key)) return 0;
  visited.add(key);
  if (map[x][y] === 9) {
    visited.delete(key);
    return 1;
  }

  let trailCount = 0;
  for (const [dx, dy] of directions) {
    const [nx, ny] = [x + dx, y + dy];
    if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited.has(`${nx},${ny}`) && map[nx][ny] === map[x][y] + 1) {
      trailCount += exploreMapDepthFirstDistinct(nx, ny, visited, map);
    }
  }
  visited.delete(key);
  return trailCount;
};

const calculateTrailheadRatings = (map: number[][]) => {
  const [rows, cols] = [map.length, map[0].length];
  let totalRating = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (map[x][y] === 0) {
        const visited = new Set<string>();
        totalRating += exploreMapDepthFirstDistinct(x, y, visited, map);
      }
    }
  }

  return totalRating;
};
export const part1 = (diskMap: string) => {
  const blocks = parseMontainMap(diskMap);
  return calculateTrailheadScores(blocks);
};
export const part2 = (diskMap: string) => {
  const blocks = parseMontainMap(diskMap);
  return calculateTrailheadRatings(blocks);
};
