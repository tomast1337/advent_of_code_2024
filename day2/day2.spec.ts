import { part1, part2 } from "./day2";
import fs from "fs";
describe("day2", () => {
  let testData: string;
  let data: string;
  beforeEach(() => {
    testData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

    data = fs.readFileSync("day2/day2.txt", "utf8");
  });

  it("should solve part 1 with test data", () => {
    expect(part1(testData)).toBe(2);
  });

  it("should solve part 1", () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it("should solve part 2 with test data", () => {
    expect(part2(testData)).toBe(4);
  });

  it("should solve part 2", () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
