const getMiddlePage = (update: number[]) => update[Math.floor(update.length / 2)];

const parseInput = (data: string) => {
  const [rulesSection, updatesSection] = data.split('\n\n');
  return {
    rules: rulesSection.split('\n').map((rule) => rule.split('|').map(Number)),
    updates: updatesSection.split('\n').map((update) => update.split(',').map(Number)),
  };
};

const isCorrectOrder = (update: number[], rules: number[][]) => {
  const indexMap = new Map<number, number>();
  update.forEach((page, index) => indexMap.set(page, index));

  return !rules.some(([x, y]) => indexMap.has(x) && indexMap.has(y) && indexMap.get(x)! > indexMap.get(y)!);
};

export const part1 = (data: string) => {
  const { rules, updates } = parseInput(data);

  return updates.reduce((sum, update) => {
    if (isCorrectOrder(update, rules)) {
      return sum + getMiddlePage(update);
    }
    return sum;
  }, 0);
};

export const part2 = (data: string) => {
  const { rules, updates } = parseInput(data);

  const correctOrder = (update: number[]) => {
    const graph = new Map<number, number[]>();
    const inDegree = new Map<number, number>();

    update.forEach((page) => {
      graph.set(page, []);
      inDegree.set(page, 0);
    });

    for (const [x, y] of rules) {
      if (graph.has(x) && graph.has(y)) {
        graph.get(x)!.push(y);
        inDegree.set(y, (inDegree.get(y) || 0) + 1);
      }
    }

    const queue: number[] = [];
    inDegree.forEach((degree, page) => {
      if (degree === 0) queue.push(page);
    });

    const sorted: number[] = [];
    while (queue.length > 0) {
      const page = queue.shift()!;
      sorted.push(page);
      for (const neighbor of graph.get(page)!) {
        inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
        if (inDegree.get(neighbor) === 0) queue.push(neighbor);
      }
    }

    return sorted;
  };

  return updates.reduce((sum, update) => {
    if (!isCorrectOrder(update, rules)) {
      const correctedUpdate = correctOrder(update);
      return sum + getMiddlePage(correctedUpdate);
    }
    return sum;
  }, 0);
};
