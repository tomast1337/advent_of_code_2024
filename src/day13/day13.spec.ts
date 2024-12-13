import { calculateTotalTokens, calculateUniteConvertedTotalTokens } from './day13';
import fs from 'fs';
describe('day13', () => {
  let testData: string;
  let data: string;
  beforeEach(() => {
    testData = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;
    data = fs.readFileSync('./src/day13/day13.txt', 'utf8');
  });

  it('should solve part 1 with test data', () => {
    expect(calculateTotalTokens(testData)).toBe(480);
  });

  it('should solve part 1', () => {
    const result = calculateTotalTokens(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(calculateUniteConvertedTotalTokens(testData)).toBe(875318608908);
  });

  it('should solve part 2', () => {
    const result = calculateUniteConvertedTotalTokens(data);
    console.log(`Result part2: ${result}`);
  });
});
