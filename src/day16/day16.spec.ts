import { findLowestScore } from './day16';
import fs from 'fs';

describe('day16', () => {
  let data: string;
  let testdata: string;

  beforeEach(() => {
    data = fs.readFileSync('./src/day16/day16.txt', 'utf8');
    testdata = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;
  });

  it('should solve part 1 with test data', () => {
    expect(findLowestScore(testdata)).toBe(7036);
  });

  it('should solve part 1', () => {
    const result = findLowestScore(data);
    console.log(`Result part1: ${result}`);
  });
});
