export type Robot = {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
};
export type Grid = number[][];

export const parseRobotsMovement = (input: string) => {
  return input.split('\n').map((line) => {
    const [p, v] = line.split(' v=');
    const [px, py] = p.replace('p=', '').split(',').map(Number);
    const [vx, vy] = v.split(',').map(Number);
    return {
      position: { x: px, y: py },
      velocity: { x: vx, y: vy },
    };
  });
};

export const genGrid = (WIDTH: number, HEIGHT: number): number[][] => Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(0));

const simulateRobotsInTime = (robots: Robot[], time: number, WIDTH: number, HEIGHT: number) => {
  const grid = genGrid(WIDTH, HEIGHT);

  robots.forEach((robot) => {
    const x = (robot.position.x + robot.velocity.x * time) % WIDTH;
    const y = (robot.position.y + robot.velocity.y * time) % HEIGHT;
    const wrappedX = (x + WIDTH) % WIDTH;
    const wrappedY = (y + HEIGHT) % HEIGHT;

    grid[wrappedY][wrappedX]++;
  });

  return grid;
};

const calculateSafetyFactor = (grid: Grid, WIDTH: number, HEIGHT: number) => {
  const [halfWidth, halfHeight] = [Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2)];
  const quadrants = [0, 0, 0, 0];
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const count = grid[y][x];
      if (count === 0) continue;

      if (y === halfHeight || x === halfWidth) continue;
      const quadrantIndex = y < halfHeight ? (x < halfWidth ? 0 : 1) : x < halfWidth ? 2 : 3;

      quadrants[quadrantIndex] += count;
    }
  }

  return quadrants.reduce((acc, val) => acc * val, 1);
};

export const part1 = (input: string, WIDTH: number, HEIGHT: number, SIMULATION_TIME: number) => {
  const robots = parseRobotsMovement(input);
  const grid = simulateRobotsInTime(robots, SIMULATION_TIME, WIDTH, HEIGHT);
  const safetyFactor = calculateSafetyFactor(grid, WIDTH, HEIGHT);
  return safetyFactor;
};
