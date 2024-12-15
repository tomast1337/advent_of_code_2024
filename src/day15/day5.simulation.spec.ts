import { describe } from 'node:test';
import { Warehouse, part1, moveRobot, warehouseToString, moveBox, Position, Direction } from './day15';
import fs from 'fs';

describe('day15', () => {
  describe('warehouseToString', () => {
    it('should convert warehouse to string with correct symbols', () => {
      const warehouse = [
        ['@', '#', 'O', '.'],
        ['.', 'O', '#', '@'],
        ['#', '.', '@', 'O'],
      ];
      const expectedOutput = '🤖🧱📦🟦\n' + '🟦📦🧱🤖\n' + '🧱🟦🤖📦';

      expect(warehouseToString(warehouse as Warehouse)).toBe(expectedOutput);
    });

    it('should handle empty warehouse', () => {
      const warehouse: string[][] = [];

      const expectedOutput = '';

      expect(warehouseToString(warehouse as Warehouse)).toBe(expectedOutput);
    });

    it('should handle warehouse with empty rows', () => {
      const warehouse = [[], ['@', '#'], []];

      const expectedOutput = '\n' + '🤖🧱\n' + '';

      expect(warehouseToString(warehouse as Warehouse)).toBe(expectedOutput);
    });

    it('should handle warehouse with empty columns', () => {
      const warehouse = [['@', '#', 'O', '.'], [], ['#', '.', '@', 'O']];

      const expectedOutput = '🤖🧱📦🟦\n' + '\n' + '🧱🟦🤖📦';

      expect(warehouseToString(warehouse as Warehouse)).toBe(expectedOutput);
    });
  });

  describe('moveBox', () => {
    describe('should move a box to an empty space', () => {
      it('move box right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', 'O', '.'],
          ['.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '.', 'O'],
          ['.', '.', '.'],
        ]);
      });
      it('move box left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', 'O', '.'],
          ['.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '<';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['O', '.', '.'],
          ['.', '.', '.'],
        ]);
      });
      it('move box up', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', 'O', '.'],
          ['.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '^';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', 'O', '.'],
          ['.', '.', '.'],
          ['.', '.', '.'],
        ]);
      });
      it('move box down', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', 'O', '.'],
          ['.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = 'v';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '.', '.'],
          ['.', 'O', '.'],
        ]);
      });
    });

    describe('should not move a box to a wall', () => {
      it('move box right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', 'O', '#'],
          ['.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', 'O', '#'],
          ['.', '.', '.'],
        ]);
      });
      it('move box left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['#', 'O', '.'],
          ['.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '<';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['#', 'O', '.'],
          ['.', '.', '.'],
        ]);
      });
      it('move box up', () => {
        const warehouse: Warehouse = [
          ['.', '#', '.'],
          ['.', 'O', '.'],
          ['.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '^';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '#', '.'],
          ['.', 'O', '.'],
          ['.', '.', '.'],
        ]);
      });
      it('move box down', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', 'O', '.'],
          ['.', '#', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = 'v';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', 'O', '.'],
          ['.', '#', '.'],
        ]);
      });
    });

    describe('should move two boxes in immediate succession', () => {
      it('move two boxes right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.'],
          ['.', 'O', 'O', '.'],
          ['.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.'],
          ['.', '.', 'O', 'O'],
          ['.', '.', '.', '.'],
        ]);
      });
      it('move two boxes left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.'],
          ['.', 'O', 'O', '.'],
          ['.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 2];
        const direction: Direction = '<';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.'],
          ['O', 'O', '.', '.'],
          ['.', '.', '.', '.'],
        ]);
      });
      it('move two boxes up', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.'],
          ['.', 'O', '.', '.'],
          ['.', 'O', '.', '.'],
        ];
        const boxPosition: Position = [2, 1];
        const direction: Direction = '^';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', 'O', '.', '.'],
          ['.', 'O', '.', '.'],
          ['.', '.', '.', '.'],
        ]);
      });

      it('move two boxes down', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.'],
          ['.', 'O', '.', '.'],
          ['.', 'O', '.', '.'],
          ['.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = 'v';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', 'O', '.', '.'],
          ['.', 'O', '.', '.'],
        ]);
      });

      it('should not move two boxes if the second box is blocked', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.'],
          ['.', 'O', 'O', '#'],
          ['.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.'],
          ['.', 'O', 'O', '#'],
          ['.', '.', '.', '.'],
        ]);
      });

      it('should not move two boxes if the second box is blocked by another box', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.'],
          ['.', 'O', 'O', 'O'],
          ['.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.'],
          ['.', 'O', 'O', 'O'],
          ['.', '.', '.', '.'],
        ]);
      });

      it('should not move more than two boxes', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', 'O', 'O', 'O', 'O', 'O', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
        ];

        const boxPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', 'O', 'O', 'O', 'O', 'O'],
          ['.', '.', '.', '.', '.', '.', '.'],
        ]);
      });
    });
  });

  describe('moveRobot', () => {
    describe('should move robot to an empty space', () => {
      it('move robot right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', '@', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveRobot(warehouse, robotPosition, direction);
        console.log(result);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '.', '@'],
          ['.', '.', '.'],
        ]);
      });
      it('move robot left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', '@', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = '<';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 0]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['@', '.', '.'],
          ['.', '.', '.'],
        ]);
      });

      it('move robot up', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', '@', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = '^';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([0, 1]);
        expect(warehouse).toEqual([
          ['.', '@', '.'],
          ['.', '.', '.'],
          ['.', '.', '.'],
        ]);
      });

      it('move robot down', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', '@', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = 'v';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([2, 1]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '.', '.'],
          ['.', '@', '.'],
        ]);
      });
    });

    describe('should not move robot to a wall', () => {
      it('move robot right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', '@', '#'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '@', '#'],
          ['.', '.', '.'],
        ]);
      });

      it('move robot left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['#', '@', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = '<';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['#', '@', '.'],
          ['.', '.', '.'],
        ]);
      });

      it('move robot up', () => {
        const warehouse: Warehouse = [
          ['.', '#', '.'],
          ['.', '@', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = '^';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', '#', '.'],
          ['.', '@', '.'],
          ['.', '.', '.'],
        ]);
      });

      it('move robot down', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', '@', '.'],
          ['.', '#', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = 'v';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '@', '.'],
          ['.', '#', '.'],
        ]);
      });
    });

    describe('should not move robot out of bounds', () => {
      it('not move robot right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', '.', '@'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 2];
        const direction: Direction = '>';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 2]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '.', '@'],
          ['.', '.', '.'],
        ]);
      });

      it('not move robot left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['@', '.', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 0];
        const direction: Direction = '<';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 0]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['@', '.', '.'],
          ['.', '.', '.'],
        ]);
      });

      it('not move robot up', () => {
        const warehouse: Warehouse = [
          ['@', '.'],
          ['.', '.'],
        ];
        const robotPosition: Position = [0, 0];
        const direction: Direction = '^';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([0, 0]);
        expect(warehouse).toEqual([
          ['@', '.'],
          ['.', '.'],
        ]);
      });

      it('not move robot down', () => {
        const warehouse: Warehouse = [
          ['.', '.'],
          ['.', '@'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = 'v';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', '.'],
          ['.', '@'],
        ]);
      });
    });

    describe('the robot should push a boxes', () => {
      it('move robot right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['@', 'O', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 0];

        const direction: Direction = '>';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '@', 'O'],
          ['.', '.', '.'],
        ]);
      });

      it('move robot left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', 'O', '@'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 2];
        const direction: Direction = '<';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['O', '@', '.'],
          ['.', '.', '.'],
        ]);
      });

      it('move robot up', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', 'O', '.'],
          ['.', '@', '.'],
        ];
        const robotPosition: Position = [2, 1];
        const direction: Direction = '^';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', 'O', '.'],
          ['.', '@', '.'],
          ['.', '.', '.'],
        ]);
      });

      it('move robot down', () => {
        const warehouse: Warehouse = [
          ['.', '@', '.'],
          ['.', 'O', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [0, 1];
        const direction: Direction = 'v';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 1]);
        expect(warehouse).toEqual([
          ['.', '.', '.'],
          ['.', '@', '.'],
          ['.', 'O', '.'],
        ]);
      });
    });
  });
});
