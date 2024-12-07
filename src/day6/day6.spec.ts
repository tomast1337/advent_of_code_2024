import { part1 } from './day6-part1';
import { part2 } from './day6-part2';
import fs from 'fs';
describe('day6', () => {
  let data: string;
  let testdata: string;

  beforeEach(() => {
    data = fs.readFileSync('./src/day6/day6.txt', 'utf8');
    testdata = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testdata)).toBe(41);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(part2(testdata)).toBe(6);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
