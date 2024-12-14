export const mullItOver = (input: string): number => {
  const regex = /mul\((\d+),(\d+)\)/g;
  let match;
  let sum = 0;

  while ((match = regex.exec(input)) !== null) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    sum += x * y;
  }

  return sum;
};

export const mullItOverConditional = (input: string): number => {
  const mulRegex = /mul\((\d+),(\d+)\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;
  let match;
  let sum = 0;
  let enabled = true;

  let lastIndex = 0;
  while ((match = mulRegex.exec(input)) !== null) {
    const segment = input.slice(lastIndex, match.index);
    if (doRegex.test(segment)) {
      enabled = true;
    } else if (dontRegex.test(segment)) {
      enabled = false;
    }

    if (enabled) {
      const x = parseInt(match[1], 10);
      const y = parseInt(match[2], 10);
      sum += x * y;
    }

    lastIndex = match.index + match[0].length;
  }

  return sum;
};
