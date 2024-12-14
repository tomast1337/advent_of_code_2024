import fs from 'fs';
import { Grid, Robot, genGrid, parseRobotsMovement } from './day14';

const data = fs.readFileSync('./src/day14/day14.txt', 'utf8');
const WIDTH = 101;
const HEIGHT = 103;

const calculateXYVariance = (grid: number[][]) => {
  let [xSum, ySum, count] = [0, 0, 0];

  // Collect sums and counts
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      if (grid[y][x] > 0) {
        xSum += x;
        ySum += y;
        count++;
      }

  if (count === 0) return { xVariance: 0, yVariance: 0 };

  const [xMean, yMean] = [xSum / count, ySum / count];

  let [xVariance, yVariance] = [0, 0];

  // Calculate variance
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      if (grid[y][x] > 0) {
        xVariance += Math.pow(x - xMean, 2);
        yVariance += Math.pow(y - yMean, 2);
      }

  xVariance /= count;
  yVariance /= count;

  return { xVariance, yVariance };
};

const printGrid = (grid: Grid) => {
  grid.forEach((row) => {
    process.stdout.write(row.map((cell) => (cell > 0 ? '🤖' : '🟩')).join('') + '\n');
  });
};

const simulateRobotsOnce = (robots: Robot[], WIDTH: number, HEIGHT: number) => {
  const grid = genGrid(WIDTH, HEIGHT);
  robots.forEach((robot) => {
    robot.position.x = (robot.position.x + robot.velocity.x + WIDTH) % WIDTH;
    robot.position.y = (robot.position.y + robot.velocity.y + HEIGHT) % HEIGHT;
    grid[robot.position.y][robot.position.x]++;
  });

  return grid;
};

const part2 = () => {
  const robots = parseRobotsMovement(data);
  let grid = genGrid(WIDTH, HEIGHT);
  let seconds = 0;

  const waitForKeyPress = (): Promise<void> => {
    return new Promise((resolve) => {
      const keypressHandler = (data: Buffer) => {
        if (data.toString() === '\u0003') {
          // Ctrl+C
          process.exit();
        }
        process.stdin.setRawMode(false);
        process.stdin.off('data', keypressHandler);
        resolve();
      };
      process.stdin.setRawMode(true);
      process.stdin.once('data', keypressHandler);
    });
  };

  const loop = async () => {
    while (true) {
      const newGrid = simulateRobotsOnce(robots, WIDTH, HEIGHT);
      grid = newGrid;
      seconds++;
      const { xVariance, yVariance } = calculateXYVariance(grid);
      printGrid(grid);
      process.stdout.write(`Seconds: ${seconds} xVariance: ${xVariance.toFixed(2)} yVariance: ${yVariance.toFixed(2)}\n`);
      if (xVariance < 400 && yVariance < 400) {
        await waitForKeyPress();
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
      process.stdout.write('\x1Bc');
    }
  };

  loop().catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

part2();
