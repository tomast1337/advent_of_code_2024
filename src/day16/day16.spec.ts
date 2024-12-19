import { solveReindeerMaze } from './day16';
import fs from 'fs';

describe('day16', () => {
  let data: string;

  beforeEach(() => {
    data = fs.readFileSync('./src/day16/day16.txt', 'utf8');
  });

  it('should solve part 1 and 2 with test data 1', () => {
    const result = solveReindeerMaze(`###############
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
###############`);
    expect(result.part1).toBe(7036);
    expect(result.part2).toBe(45);
  });

  it('should solve part 1 with test data 2', () => {
    const result = solveReindeerMaze(`#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`);
    expect(result.part1).toBe(11048);
    expect(result.part2).toBe(64);
  });

  it('should solve part 1 and 2', () => {
    const result = solveReindeerMaze(data);
    console.log(`Result part1: ${result.part1} Part2: ${result.part2}`);
  });
});
