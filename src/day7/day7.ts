const parseInput = (input: string) => {
  const lines = input.trim().split('\n');
  return lines.map((line) => {
    const [testValueStr, numbersStr] = line.split(': ');
    const testValue = parseInt(testValueStr, 10);
    const numbers = numbersStr.split(' ').map(Number);
    return { testValue, numbers };
  });
};

export const part1 = (input: string) => {
  const lines = parseInput(input);
  let total = 0;

  const canReachTestValue = (target: number, numbers: number[]) => {
    const evaluate = (index: number, currentTotal: number) => {
      if (index === numbers.length) return currentTotal === target;
      if (evaluate(index + 1, currentTotal + numbers[index])) return true;
      if (evaluate(index + 1, currentTotal * numbers[index])) return true;
      return false;
    };
    return evaluate(1, numbers[0]);
  };

  for (const { testValue, numbers } of lines) {
    if (canReachTestValue(testValue, numbers)) total += testValue;
  }

  return total;
};

export const part2 = (input: string) => {
  const lines = parseInput(input);
  let total = 0;

  const canReachTestValue = (target: number, numbers: number[]) => {
    const evaluate = (index: number, currentTotal: number) => {
      if (index === numbers.length) return currentTotal === target;
      if (evaluate(index + 1, currentTotal + numbers[index])) return true;
      if (evaluate(index + 1, currentTotal * numbers[index])) return true;
      if (evaluate(index + 1, +`${currentTotal}${numbers[index]}`)) return true;
      return false;
    };
    return evaluate(1, numbers[0]);
  };

  for (const { testValue, numbers } of lines) {
    if (canReachTestValue(testValue, numbers)) total += testValue;
  }

  return total;
};
