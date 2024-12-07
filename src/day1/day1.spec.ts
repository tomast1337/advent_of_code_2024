import { part1, part2 } from './day1';
import fs from 'fs';
describe('day1', () => {
  let testData: string;
  let data: string;
  beforeEach(() => {
    testData = `3   4
4   3
2   5
1   3
3   9
3   3`;

    data = fs.readFileSync('./src/day1/day1.txt', 'utf8');
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testData)).toBe(11);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(part2(testData)).toBe(31);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
