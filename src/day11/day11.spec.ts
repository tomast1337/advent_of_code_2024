import { simulateStones } from './day11';
import fs from 'fs';
describe('day11', () => {
  let testData: string;
  let data: string;
  beforeEach(() => {
    testData = `125 17`;
    data = fs.readFileSync('./src/day11/day11.txt', 'utf8');
  });

  it('should solve part 1 with test data and 6 blinks', () => {
    expect(simulateStones(testData, 6)).toBe(22n);
  });

  it('should solve part 1 with test data and 25 blinks', () => {
    expect(simulateStones(testData, 25)).toBe(55312n);
  });

  it('should solve part 1', () => {
    const result = simulateStones(data, 25);
    console.log(`Result simulateStones: ${result}`);
  });

  it('should solve part 2', function () {
    const result = simulateStones(data, 75);
    console.log(`Result simulateStones: ${result}`);
  });
});
