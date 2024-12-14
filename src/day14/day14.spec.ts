import { part1 } from './day14';
import fs from 'fs';
describe('day14', () => {
  let testData: string;
  let data: string;
  let WIDTH: number;
  let HEIGHT: number;
  let SIMULATION_TIME: number;
  beforeEach(() => {
    testData = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;
    WIDTH = 101;
    HEIGHT = 103;
    SIMULATION_TIME = 100;
    data = fs.readFileSync('./src/day14/day14.txt', 'utf8');
  });

  it('should solve part 1 with test data', () => {
    expect(part1(testData, 11, 7, SIMULATION_TIME)).toBe(12);
  });

  it('should solve part 1', () => {
    const result = part1(data, WIDTH, HEIGHT, SIMULATION_TIME);
    console.log(`Result part1: ${result}`);
  });
});
