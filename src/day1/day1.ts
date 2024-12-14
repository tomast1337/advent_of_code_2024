const parseFrequencyMap = (input: string): [number[], number[]] => {
  const lines = input.split('\n');
  const leftList = [];
  const rightList = [];
  for (const line of lines) {
    const [left, right] = line.match(/\d+/g)!.map(Number);
    leftList.push(left);
    rightList.push(right);
  }

  return [leftList, rightList];
};

export const calculateTotalDistance = (input: string): number => {
  const [leftList, rightList] = parseFrequencyMap(input);
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let totalDistance = 0;

  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }

  return totalDistance;
};

export const calculateSimilarityScore = (input: string): number => {
  const [leftList, rightList] = parseFrequencyMap(input);

  const frequencyMap: { [key: number]: number } = {};

  for (const num of rightList) {
    if (frequencyMap[num] === undefined) {
      frequencyMap[num] = 0;
    }
    frequencyMap[num]++;
  }

  let similarityScore = 0;

  for (const num of leftList) {
    if (frequencyMap[num] !== undefined) {
      similarityScore += num * frequencyMap[num];
    }
  }

  return similarityScore;
};
