import { part1, part2 } from './day9';
import fs from 'fs';
describe('day9', () => {
  let testData: string;
  let data: string;
  beforeEach(() => {
    testData = `2333133121414131402`;
    data = fs.readFileSync('./src/day9/day9.txt', 'utf8');
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testData)).toBe(1928);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(part2(testData)).toBe(2858);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
