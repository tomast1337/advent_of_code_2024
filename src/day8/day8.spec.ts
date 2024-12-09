import { part1, part2 } from './day8';
import fs from 'fs';
describe('day8', () => {
  let testData: string;
  let data: string;
  beforeEach(() => {
    testData = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

    data = fs.readFileSync('./src/day8/day8.txt', 'utf8');
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testData)).toBe(14);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(part2(testData)).toBe(34);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
