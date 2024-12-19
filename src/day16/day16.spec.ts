import { solve } from './day16';
import fs from 'fs';

describe('day16', () => {
  let data: string;

  beforeEach(() => {
    data = fs.readFileSync('./src/day16/day16.txt', 'utf8');
  });

  it('part 2 debug 1', () => {
    const input = `#####
#   #
#S#E#
#   #
#####
`;
    const result = solve(input);
    expect(result.part2).toBe(8);
  });

  it('part 2 debug 2', () => {
    const input = `###########
#         #
#S#     #E#
#         #
###########
`;
    const result = solve(input);
    expect(result.part2).toBe(20);
  });

  it('part 2 debug 2', () => {
    const input = `###########
#    #    #
#S##   ##E#
#    #    #
###########
`;
    const result = solve(input);
    expect(result.part2).toBe(21);
  });

  it('part 2 debug 2', () => {
    const input = `###########
#         #
#         #
#         #
##### #####
#        E#
# ####### #
#S        #
##### #####
#         #
#         #
#         #
###########
`;
    const result = solve(input);
    expect(result.part2).toBe(20);
  });

  it('should solve part 1 and 2 with test data 1', () => {
    expect(
      solve(`###############
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
###############`),
    ).toBe({
      part1: 7036,
      part2: 45,
    });
  });

  it('should solve part 1 with test data 2', () => {
    expect(
      solve(`#################
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
#################`),
    ).toBe({
      part1: 11048,
      part2: 64,
    });
  });

  it('should solve part 1 and 2', () => {
    const result = solve(data);
    console.log(`Result part1: ${result.part1} Part2: ${result.part2}`);
  });
});
