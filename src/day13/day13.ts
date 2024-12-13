type ClawMachine = {
  buttonA: { x: number; y: number };
  buttonB: { x: number; y: number };
  prize: { x: number; y: number };
};

const parseClawMachine = (input: string) => {
  const chunks = input.split('\n\n');
  const machines = chunks.map((chunk: string) => {
    const lines = chunk.split('\n');
    const buttonA = lines[0].match(/X\+(\d+), Y\+(\d+)/) as [string, string, string];
    const buttonB = lines[1].match(/X\+(\d+), Y\+(\d+)/) as [string, string, string];
    const prize = lines[2].match(/X=(\d+), Y=(\d+)/) as [string, string, string];
    return {
      buttonA: { x: parseInt(buttonA[1]), y: parseInt(buttonA[2]) },
      buttonB: { x: parseInt(buttonB[1]), y: parseInt(buttonB[2]) },
      prize: { x: parseInt(prize[1]), y: parseInt(prize[2]) },
    };
  });
  return machines;
};

const calculateMinimumTokens = (machine: ClawMachine) => {
  const { buttonA, buttonB, prize } = machine;

  const [Ax, Ay, Bx, By, Px, Py] = [buttonA.x, buttonA.y, buttonB.x, buttonB.y, prize.x, prize.y];
  const det = Ax * By - Ay * Bx;
  if (det === 0) return 0;

  const a = (By * Px - Bx * Py) / det;
  const b = (-Ay * Px + Ax * Py) / det;

  if (Number.isInteger(a) && Number.isInteger(b)) return a < 0 || b < 0 ? 0 : a * 3 + b;

  return 0;
};

export const calculateTotalTokens = (input: string) => {
  const machines = parseClawMachine(input);
  let totalTokens = 0;
  for (const machine of machines) totalTokens += calculateMinimumTokens(machine);
  return totalTokens;
};

export const calculateUniteConvertedTotalTokens = (input: string) => {
  const machines = parseClawMachine(input);
  let totalTokens = 0;

  for (const machine of machines) {
    machine.prize.x = machine.prize.x + 10000000000000;
    machine.prize.y = machine.prize.y + 10000000000000;
    const tokens = calculateMinimumTokens(machine);
    if (tokens !== null) {
      totalTokens += tokens;
    }
  }

  return totalTokens;
};
