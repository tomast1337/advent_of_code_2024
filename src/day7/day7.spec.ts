import { part1, part2 } from './day7';
import fs from 'fs';
describe('day1', () => {
  let testData: string;
  let data: string;
  beforeEach(() => {
    testData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

    data = fs.readFileSync('./src/day7/day7.txt', 'utf8');
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testData)).toBe(3749);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(part2(testData)).toBe(11387);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
