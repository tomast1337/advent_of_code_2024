import { part1, part2 } from './day12';
import fs from 'fs';
describe('day12', () => {
  let data: string;
  beforeEach(() => {
    data = fs.readFileSync('./src/day12/day12.txt', 'utf8');
  });

  it('should solve part 1 first example', () => {
    expect(
      part1(`AAAA
BBCD
BBCC
EEEC`),
    ).toBe(140);
  });

  it('should solve part 1 second example', () => {
    expect(
      part1(`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`),
    ).toBe(772);
  });

  it('should solve part 1 third example', () => {
    expect(
      part1(`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`),
    ).toBe(1930);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Part 1: ${result}`);
  });

  it('should solve part 2 first example', () => {
    expect(
      part2(`AAAA
BBCD
BBCC
EEEC`),
    ).toBe(80);
  });

  it('should solve part 2 first example', () => {
    expect(
      part2(`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`),
    ).toBe(436);
  });

  it('should solve part 2 second example', () => {
    expect(
      part2(`EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`),
    ).toBe(236);
  });

  it('should solve part 2 third example', () => {
    expect(
      part2(`AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`),
    ).toBe(368);
  });

  it('should solve part 2 fourth example', () => {
    expect(
      part2(`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`),
    ).toBe(1206);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Part 1: ${result}`);
  });
});
