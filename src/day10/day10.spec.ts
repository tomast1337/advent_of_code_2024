import { part1, part2 } from './day10';
import fs from 'fs';
describe('day9', () => {
  let testData: string;
  let data: string;
  beforeEach(() => {
    testData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
    data = fs.readFileSync('./src/day10/day10.txt', 'utf8');
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testData)).toBe(36);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(part2(testData)).toBe(81);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
