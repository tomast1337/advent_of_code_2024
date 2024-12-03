import { part1, part2 } from "./day3";
import fs from "fs";

describe("day3", () => {
  let data: string;
  beforeEach(() => {
    data = fs.readFileSync("day3/day3.txt", "utf8");
  });

  it("should solve part 1 with test data", () => {
    expect(
      part1(
        `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
      )
    ).toBe(161);
  });

  it("should solve part 1", () => {
    const result = part1(data);
    console.log(`Result part1: ${result}`);
  });

  it("should solve part 2 with test data", () => {
    expect(
      part2(
        `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
      )
    ).toBe(48);
  });

  it("should solve part 2", () => {
    const result = part2(data);
    console.log(`Result part2: ${result}`);
  });
});
