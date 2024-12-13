import { GetPrices } from './day12';
import fs from 'fs';
describe('day12', () => {
  let data: string;
  beforeEach(() => {
    data = fs.readFileSync('./src/day12/day12.txt', 'utf8');
  });

  it('should solve part 1 first example', () => {
    const { totalPricePerimeter, totalPriceSide } = GetPrices(`AAAA
BBCD
BBCC
EEEC`);
    expect(totalPricePerimeter).toBe(140);
    expect(totalPriceSide).toBe(80);
  });

  it('should solve part 1 second example', () => {
    const { totalPricePerimeter, totalPriceSide } = GetPrices(`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`);
    expect(totalPricePerimeter).toBe(772);
    expect(totalPriceSide).toBe(436);
  });

  it('should solve part 1 third example', () => {
    const { totalPricePerimeter, totalPriceSide } = GetPrices(`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`);
    expect(totalPricePerimeter).toBe(1930);
    expect(totalPriceSide).toBe(1206);
  });

  it('should solve part 2 second example', () => {
    expect(
      GetPrices(`EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`).totalPriceSide,
    ).toBe(236);
  });

  it('should solve part 2 third example', () => {
    expect(
      GetPrices(`AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`).totalPriceSide,
    ).toBe(368);
  });

  it('should solve part 1 and 2', () => {
    const { totalPricePerimeter, totalPriceSide } = GetPrices(data);

    console.log(`Part 1: ${totalPricePerimeter}`);
    console.log(`Part 2: ${totalPriceSide}`);
  });
});
