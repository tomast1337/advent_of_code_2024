const parseStones = (input: string) => input.split(' ').map(Number);
class StoneTree {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
  expand(): StoneTree[] {
    if (this.value === 0) {
      return [new StoneTree(1)];
    } else if (this.value.toString().length % 2 === 0) {
      const digits = this.value.toString();
      const mid = Math.floor(digits.length / 2);
      const left = parseInt(digits.slice(0, mid), 10);
      const right = parseInt(digits.slice(mid), 10);
      return [new StoneTree(left), new StoneTree(right)];
    } else {
      return [new StoneTree(this.value * 2024)];
    }
  }
}

const countStonesDFS = (value: number, blinks: number, cache: Map<string, bigint> = new Map()) => {
  const cacheKey = `${value}-${blinks}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }
  if (blinks === 0) return 1n;
  const stone = new StoneTree(value);
  const children = stone.expand();
  let count = 0n;
  for (const child of children) {
    count += countStonesDFS(child.value, blinks - 1, cache);
  }
  cache.set(cacheKey, count);
  return count;
};

export const simulateStones = (input: string, blinks: number) => {
  const initialStones = parseStones(input);
  let totalStones = 0n;
  const cache = new Map<string, bigint>();
  for (const stone of initialStones) {
    totalStones += countStonesDFS(stone, blinks, cache);
  }
  return totalStones;
};
