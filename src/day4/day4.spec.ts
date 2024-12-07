import { part1 } from './day4-part1';
import { part2 } from './day4-part2';
import fs from 'fs';

describe('day4', () => {
  let data: string;
  let testdata: string;
  beforeEach(() => {
    data = fs.readFileSync('./src/day4/day4.txt', 'utf8');
    testdata = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testdata)).toBe(18);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(part2(testdata)).toBe(9);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
