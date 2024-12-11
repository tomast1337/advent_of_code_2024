const parseDiskMap = (diskMap: string) => {
  const blocks: string[] = [];
  let currentID = 0;
  for (let i = 0; i < diskMap.length; i++)
    if (i % 2 === 0) blocks.push(...Array(+diskMap[i]).fill(`${currentID++}`));
    else blocks.push(...Array(+diskMap[i]).fill('.'));
  return blocks;
};

const calculateChecksum = (blocks: string[]) =>
  blocks.reduce((checksum, block, index) => {
    return block !== '.' ? checksum + index * +block : checksum;
  }, 0);

const rightmostDigit = (blocks: string[]) => {
  for (let i = blocks.length - 1; i >= 0; i--) if (blocks[i] !== '.') return i;
  return -1;
};

const compactBlocks = (blocks: string[]) => {
  while (true) {
    let moved = false;
    const [lastBlockIndex, firstDotIndex] = [rightmostDigit(blocks), blocks.indexOf('.')];
    if (lastBlockIndex > firstDotIndex && lastBlockIndex !== -1 && firstDotIndex !== -1) {
      [blocks[lastBlockIndex], blocks[firstDotIndex]] = [blocks[firstDotIndex], blocks[lastBlockIndex]];
      moved = true;
    }
    if (!moved) break;
  }
  return blocks;
};

const compactFiles = (blocks: string[]) => {
  const fileChunks: { id: string; start: number; length: number }[] = [];

  let i = 0;
  while (i < blocks.length) {
    if (blocks[i] !== '.') {
      const id = blocks[i];
      let len = 0;
      while (i + len < blocks.length && blocks[i + len] === id) len++;
      fileChunks.push({ id, start: i, length: len });
      i += len;
    } else i++;
  }

  fileChunks.sort((a, b) => +b.id - +a.id);

  for (const file of fileChunks) {
    const { start, length } = file;
    let [freeSpaceOff, freeSpaceLen] = [-1, 0];
    for (let j = 0; j < start; j++) {
      if (blocks[j] === '.') {
        if (freeSpaceOff === -1) freeSpaceOff = j;
        freeSpaceLen++;
      } else {
        [freeSpaceOff, freeSpaceLen] = [-1, 0];
      }

      if (freeSpaceLen === length) break;
    }

    if (freeSpaceLen === length && freeSpaceOff !== -1)
      for (let k = 0; k < length; k++) [blocks[freeSpaceOff + k], blocks[start + k]] = [blocks[start + k], blocks[freeSpaceOff + k]];
  }

  return blocks;
};

export const part1 = (diskMap: string) => {
  const blocks = parseDiskMap(diskMap);
  return calculateChecksum(compactBlocks(blocks));
};

export const part2 = (diskMap: string) => {
  const blocks = parseDiskMap(diskMap);
  return calculateChecksum(compactFiles(blocks));
};
