const parseDiskMap = (diskMap: string) => {
  const blocks: string[] = [];
  let currentID = 0;
  for (let i = 0; i < diskMap.length; i++)
    if (i % 2 === 0) blocks.push(...Array(+diskMap[i]).fill((currentID++).toString()));
    else blocks.push(...Array(+diskMap[i]).fill('.'));
  return blocks;
};

const calculateChecksum = (blocks: string[]) =>
  blocks.reduce((checksum, block, index) => {
    return block !== '.' ? checksum + index * +block : checksum;
  }, 0);

const rightmostDigit = (blocks: string[]) => {
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] !== '.') return i;
  }
  return -1;
};

const compactBlocks = (blocks: string[]) => {
  while (true) {
    let moved = false;
    const rightmostBlockIndex = rightmostDigit(blocks);
    const leftmostDotIndex = blocks.indexOf('.');

    if (rightmostBlockIndex > leftmostDotIndex && rightmostBlockIndex !== -1 && leftmostDotIndex !== -1) {
      [blocks[rightmostBlockIndex], blocks[leftmostDotIndex]] = [blocks[leftmostDotIndex], blocks[rightmostBlockIndex]];
      moved = true;
    }

    if (!moved) break;
  }

  return blocks;
};

const compactFiles = (blocks: string[]) => {
  // Identify file blocks and their sizes
  const fileBlocks: { id: string; start: number; length: number }[] = [];
  let i = 0;

  while (i < blocks.length) {
    if (blocks[i] !== '.') {
      const id = blocks[i];
      let length = 0;

      // Count the length of contiguous blocks of the same file
      while (i + length < blocks.length && blocks[i + length] === id) {
        length++;
      }

      fileBlocks.push({ id, start: i, length });
      i += length; // Skip to the next section
    } else {
      i++;
    }
  }

  // Sort files by decreasing ID
  fileBlocks.sort((a, b) => +b.id - +a.id);

  // Compact each file to the leftmost available span
  for (const file of fileBlocks) {
    const { id, start, length } = file;

    // Find the leftmost span of free space that can fit the file
    let freeSpaceStart = -1;
    let freeSpaceLength = 0;

    for (let j = 0; j < start; j++) {
      if (blocks[j] === '.') {
        if (freeSpaceStart === -1) freeSpaceStart = j;
        freeSpaceLength++;
      } else {
        freeSpaceStart = -1;
        freeSpaceLength = 0;
      }

      // Check if the span is large enough
      if (freeSpaceLength === length) {
        break;
      }
    }

    if (freeSpaceLength === length && freeSpaceStart !== -1) {
      // Move the file to the free space
      for (let k = 0; k < length; k++) {
        blocks[freeSpaceStart + k] = id;
        blocks[start + k] = '.';
      }
    }
  }

  return blocks;
};

export const part1 = (diskMap: string) => {
  const blocks: string[] = parseDiskMap(diskMap);
  const compactedBlocks = compactBlocks(blocks);
  return calculateChecksum(compactedBlocks);
};

export const part2 = (diskMap: string) => {
  const blocks: string[] = parseDiskMap(diskMap);
  const compactedBlocks = compactFiles(blocks);
  return calculateChecksum(compactedBlocks);
};
