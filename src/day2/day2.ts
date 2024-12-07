const parseInput = (input: string): number[][] => input.split('\n').map((line) => line.split(' ').map(Number));

const isSafeReport = (report: number[]): boolean => {
  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    const absDiff = Math.abs(diff);
    if (absDiff < 1 || absDiff > 3) {
      return false;
    }
    if (diff < 0) {
      increasing = false;
    }
    if (diff > 0) {
      decreasing = false;
    }
  }

  return increasing || decreasing;
};

const canBeSafeByRemovingOne = (report: number[]): boolean => {
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafeReport(modifiedReport)) {
      return true;
    }
  }
  return false;
};

export const part1 = (input: string): number => {
  const countSafeReports = (reports: number[][]): number => {
    let safeCount = 0;
    for (const report of reports) {
      if (isSafeReport(report)) {
        safeCount++;
      }
    }
    return safeCount;
  };

  const reports = parseInput(input);
  return countSafeReports(reports);
};

export const part2 = (input: string): number => {
  const countSafeReports = (reports: number[][]): number => {
    let safeCount = 0;
    for (const report of reports) {
      if (canBeSafeByRemovingOne(report)) {
        safeCount++;
      }
    }
    return safeCount;
  };

  const reports = parseInput(input);
  return countSafeReports(reports);
};
