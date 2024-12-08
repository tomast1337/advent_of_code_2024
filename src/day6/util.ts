export type Position = { x: number; y: number };
export const directions: Position[] = [
  { x: 0, y: -1 }, // up
  { x: 1, y: 0 }, // right
  { x: 0, y: 1 }, // down
  { x: -1, y: 0 }, // left
];
export const parseMap = (data: string) => {
  const map = data.split('\n');
  let start: Position = { x: 0, y: 0 };
  let direction = '^';
  const grid = map.map((line, y) => {
    return line.split('').map((char, x) => {
      if ('^>v<'.includes(char)) {
        start = { x, y };
        direction = char;
        return '.';
      }
      return char;
    });
  });
  return { grid, start, direction };
};
