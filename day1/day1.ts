const calculateSimilarityScore = (
  leftList: number[],
  rightList: number[]
): number => {
  // Step 2: Create a frequency map for the right list
  const frequencyMap: { [key: number]: number } = {};
  for (const num of rightList) {
    if (frequencyMap[num] === undefined) {
      frequencyMap[num] = 0;
    }
    frequencyMap[num]++;
  }

  // Step 3: Calculate the similarity score
  let similarityScore = 0;
  for (const num of leftList) {
    if (frequencyMap[num] !== undefined) {
      similarityScore += num * frequencyMap[num];
    }
  }

  return similarityScore;
};

const calculateTotalDistance = (
  leftList: number[],
  rightList: number[]
): number => {
  // Step 2: Sort both lists
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  // Step 4: Calculate the distance for each pair and sum them up
  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }

  return totalDistance;
};

const parseInput = (input: string): [number[], number[]] => {
  // Step 1: Split the input into lines
  const lines = input.split("\n");

  // Step 3: Parse each line into a pair of numbers
  const leftList = [];
  const rightList = [];
  for (const line of lines) {
    const [left, right] = line.split("   ").map(Number);
    leftList.push(left);
    rightList.push(right);
  }

  return [leftList, rightList];
};

export const part1 = (input: string): number => {
  const [leftList, rightList] = parseInput(input);
  return calculateTotalDistance(leftList, rightList);
};

export const part2 = (input: string): number => {
  const [leftList, rightList] = parseInput(input);
  return calculateSimilarityScore(leftList, rightList);
};
