type Pos = { x: number; y: number };
const parseInput = (mapInput: string) => mapInput.split('\n').map((line) => line.trim().split(''));
const getAntennas = (map: readonly string[][]) => {
  const [rows, cols] = [map.length, map[0].length];
  const antennas: Map<string, Pos[]> = new Map();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const char = map[y][x];
      if (/[a-zA-Z0-9]/.test(char)) {
        if (!antennas.has(char)) {
          antennas.set(char, []);
        }
        antennas.get(char)!.push({ x, y });
      }
    }
  }
  return antennas;
};

const calculateAntinodePositions = ([rows, cols]: number[], antennas: Map<string, Pos[]>) => {
  const antinodes = new Set<string>();
  for (const [, positions] of antennas) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [a, b] = [positions[i], positions[j]];
        const [dx, dy] = [b.x - a.x, b.y - a.y];
        const midpos = { x: a.x - dx, y: a.y - dy };
        const midpos2 = { x: b.x + dx, y: b.y + dy };

        if (midpos.x >= 0 && midpos.x < cols && midpos.y >= 0 && midpos.y < rows) antinodes.add(`${midpos.x},${midpos.y}`);
        if (midpos2.x >= 0 && midpos2.x < cols && midpos2.y >= 0 && midpos2.y < rows) antinodes.add(`${midpos2.x},${midpos2.y}`);
      }
    }
  }
  return antinodes.size;
};

export const part1 = (mapInput: string) => {
  const map: string[][] = parseInput(mapInput);
  const antennas = getAntennas(map);
  return calculateAntinodePositions([map.length, map[0].length], antennas);
};

const calculateResonantAntinodes = ([rows, cols]: number[], antennas: Map<string, Pos[]>) => {
  const antinodes = new Set<string>();
  for (const [, positions] of antennas) {
    const n = positions.length;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const [a, b] = [positions[i], positions[j]];
        const [dx, dy] = [b.x - a.x, b.y - a.y];

        for (let k = -1; k <= 1; k += 2) {
          let [x, y] = [a.x + k * dx, a.y + k * dy];
          while (x >= 0 && x < cols && y >= 0 && y < rows) {
            antinodes.add(`${x},${y}`);
            [x, y] = [x + k * dx, y + k * dy];
          }
        }
        antinodes.add(`${a.x},${a.y}`).add(`${b.x},${b.y}`);
      }
    }
  }

  return antinodes.size;
};

export const part2 = (mapInput: string) => {
  const map: string[][] = parseInput(mapInput);
  const antennas = getAntennas(map);
  return calculateResonantAntinodes([map.length, map[0].length], antennas);
};
