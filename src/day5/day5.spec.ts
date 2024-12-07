import { part1, part2 } from './day5';
import fs from 'fs';

describe('day5', () => {
  let data: string;
  let testdata: string;

  beforeEach(() => {
    data = fs.readFileSync('./src/day5/day5.txt', 'utf8');
    testdata = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testdata)).toBe(143);
  });

  it('should solve part 1', () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it('should solve part 2 with test data', () => {
    expect(part2(testdata)).toBe(123);
  });

  it('should solve part 2', () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
