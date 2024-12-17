import { Direction, Position, Warehouse, moveBox, moveRobot, findConnectedBoxes, parseRobotMovementInstructions } from './day15-part2';

describe('day15 simulation specs', () => {
  describe('parseRobotMovementInstructions', () => {
    it('should parse robot movement instructions case 1', () => {
      const data = `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^
<vv<<^^<<^^`;
      const resultMap = `##############
##......##..##
##..........##
##....[][]@.##
##....[]....##
##..........##
##############`
        .split('\n')
        .map((row) => row.split(''));
      const resultInstructions = '<vv<<^^<<^^<vv<<^^<<^^'.split('') as Direction[];
      const { warehouse, robotInstructions, robotPosition } = parseRobotMovementInstructions(data);
      expect(warehouse).toEqual(resultMap);
      expect(robotInstructions).toEqual(resultInstructions);
      expect(robotPosition).toEqual([3, 10]);
    });
    it('should parse robot movement instructions case 2', () => {
      const data = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<vv<<^^<<^^
<vv<<^^<<^^`;
      const resultMap = [
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '#', '.', '.', '.', '.', '[', ']', '.', '.', '[', ']', '.', '.', '#', '#'],
        ['#', '#', '#', '#', '@', '.', '.', '.', '[', ']', '.', '.', '.', '.', '#', '#'],
        ['#', '#', '.', '.', '.', '.', '.', '.', '[', ']', '.', '.', '.', '.', '#', '#'],
        ['#', '#', '.', '.', '#', '#', '.', '.', '[', ']', '.', '.', '.', '.', '#', '#'],
        ['#', '#', '.', '.', '.', '.', '.', '.', '[', ']', '.', '.', '.', '.', '#', '#'],
        ['#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ];
      const resultInstructions = ['<', 'v', 'v', '<', '<', '^', '^', '<', '<', '^', '^', '<', 'v', 'v', '<', '<', '^', '^', '<', '<', '^', '^'];
      const { warehouse, robotInstructions, robotPosition } = parseRobotMovementInstructions(data);
      expect(warehouse).toEqual(resultMap);
      expect(robotInstructions).toEqual(resultInstructions);
      expect(robotPosition).toEqual([2, 4]);
    });
  });

  describe('findConnectedBoxes', () => {
    it('should find connected boxes case 1', () => {
      const warehouse: Warehouse = [
        ['[', ']', '.', '.', '.', '.'],
        ['[', ']', '[', ']', '.', '.'],
        ['[', ']', '.', '.', '.', '.'],
      ];
      const boxPosition: Position = [1, 2];
      const result = findConnectedBoxes(warehouse, boxPosition, '^');
      expect(result).toEqual([
        { position: [1, 3], type: ']' },
        { position: [1, 2], type: '[' },
      ]);
    });
    it('should find connected boxes case 2', () => {
      const warehouse: Warehouse = [
        ['.', '.', '[', ']', '.', '.'],
        ['.', '.', '[', ']', '.', '.'],
        ['.', '.', '[', ']', '.', '.'],
      ];
      const boxPosition: Position = [1, 2];
      const result = findConnectedBoxes(warehouse, boxPosition, 'v');
      expect(result).toEqual([
        {
          position: [1, 3],
          type: ']',
        },
        {
          position: [2, 3],
          type: ']',
        },
        {
          position: [2, 2],
          type: '[',
        },
        {
          position: [1, 2],
          type: '[',
        },
      ]);
    });
    it('should find connected boxes case 2', () => {
      const warehouse: Warehouse = [
        ['[', ']', '[', ']', '[', ']'],
        ['.', '.', '[', ']', '.', '.'],
        ['.', '[', ']', '[', ']', '.'],
      ];
      const boxPosition: Position = [1, 2];
      const result = findConnectedBoxes(warehouse, boxPosition, 'v');
      expect(result.length).toBe(6);
      expect(result).toEqual([
        {
          position: [1, 3],
          type: ']',
        },
        {
          position: [2, 4],
          type: ']',
        },
        {
          position: [2, 3],
          type: '[',
        },
        {
          position: [1, 2],
          type: '[',
        },
        {
          position: [2, 2],
          type: ']',
        },
        {
          position: [2, 1],
          type: '[',
        },
      ]);
    });
  });

  describe('moveBox', () => {
    describe('should move a box to an empty space', () => {
      it('move box right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 3];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '[', ']', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move box left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 2];
        const direction: Direction = '<';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['.', '[', ']', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move box up', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 3];
        const direction: Direction = '^';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move box down', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 2];
        const direction: Direction = 'v';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
        ]);
      });
    });

    describe('should not move a box to an wall', () => {
      it('move box right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '#', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 2];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '#', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move box left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '#', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 3];
        const direction: Direction = '<';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['.', '#', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move box up', () => {
        const warehouse: Warehouse = [
          ['.', '.', '#', '#', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 2];
        const direction: Direction = '^';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '#', '#', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move box up left wall', () => {
        const warehouse: Warehouse = [
          ['.', '.', '#', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 3];
        const direction: Direction = '^';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '#', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move box up right wall', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '#', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 2];
        const direction: Direction = '^';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.', '#', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move box down', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '#', '#', '.', '.'],
        ];
        const boxPosition: Position = [1, 3];
        const direction: Direction = 'v';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '#', '#', '.', '.'],
        ]);
      });
      it('move box down left wall', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '#', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 2];
        const direction: Direction = 'v';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '#', '.', '.', '.'],
        ]);
      });
      it('move box down right wall', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '#', '.', '.'],
        ];
        const boxPosition: Position = [1, 3];
        const direction: Direction = 'v';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(false);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '.', '.'],
          ['.', '.', '.', '#', '.', '.'],
        ]);
      });
    });

    describe('should move boxes in a row', () => {
      it('move boxes right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '[', ']', '[', ']', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 2];
        const direction: Direction = '>';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '[', ']', '[', ']'],
          ['.', '.', '.', '.', '.', '.', '.'],
        ]);
      });
      it('move boxes left', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '[', ']', '[', ']', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ];
        const boxPosition: Position = [1, 3];
        const direction: Direction = '<';

        const result = moveBox(warehouse, boxPosition, direction);
        expect(result).toBe(true);
        expect(warehouse).toEqual([
          ['.', '.', '.', '.', '.', '.'],
          ['[', ']', '[', ']', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
        ]);
      });
      describe('should move boxes up', () => {
        //
        it('move boxes up case 0', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
          ];
          const boxPosition: Position = [2, 2];
          const direction: Direction = '^';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ]);
        });
        //
        it('move boxes up case 1', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '[', ']', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [2, 2];
          const direction: Direction = '^';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '[', ']', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ]);
        });
        //
        it('move boxes up case wall bug 1', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '[', ']', '#', '#', '#'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [2, 2];
          const direction: Direction = '^';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(false);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['.', '[', ']', '#', '#', '#'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ]);
        });
        //
        it('move boxes up case wall bug 2', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '#', '#', '#'],
            ['.', '[', ']', '[', ']', '#'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [4, 2];
          const direction: Direction = '^';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(false);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '#', '#', '#'],
            ['.', '[', ']', '[', ']', '#'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ]);
        });
        //
        it('move boxes up case wall bug 2', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['#', '#', '#', '.', '.', '.'],
            ['#', '[', ']', '[', ']', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [3, 2];
          const direction: Direction = '^';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(false);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['#', '#', '#', '.', '.', '.'],
            ['#', '[', ']', '[', ']', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ]);
        });
        //
        it('move boxes up case 2', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '[', ']', '[', ']', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [2, 2];
          const direction: Direction = '^';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '[', ']', '[', ']', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ]);
        });
      });
      describe('should move boxes down', () => {
        //
        it('move boxes down case 0', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [1, 2];
          const direction: Direction = 'v';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
          ]);
        });
        //
        it('move boxes down case 1', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '[', ']', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [1, 2];
          const direction: Direction = 'v';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
            ['.', '[', ']', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
          ]);
        });
        //
        it('move boxes down case 2', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '[', ']', '[', ']', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [1, 2];
          const direction: Direction = 'v';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '[', ']', '.'],
            ['.', '[', ']', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
          ]);
        });
        //
        it('move boxes down case 3', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '[', ']', '[', ']', '.'],
            ['[', ']', '[', ']', '[', ']'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [1, 2];
          const direction: Direction = 'v';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '[', ']', '[', ']', '.'],
            ['[', ']', '[', ']', '[', ']'],
          ]);
        });
        //
        it('move boxes down case 4', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '[', ']', '[', ']', '.'],
            ['[', ']', '[', ']', '[', ']'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [1, 3];
          const direction: Direction = 'v';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '[', ']', '[', ']', '.'],
            ['[', ']', '[', ']', '[', ']'],
          ]);
        });
        //
        it('move boxes down case 4', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '[', ']', '[', ']', '.'],
            ['[', ']', '.', '.', '[', ']'],
            ['.', '.', '.', '.', '.', '.'],
          ];
          const boxPosition: Position = [1, 3];
          const direction: Direction = 'v';

          const result = moveBox(warehouse, boxPosition, direction);
          expect(result).toBe(true);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
            ['.', '.', '[', ']', '.', '.'],
            ['.', '[', ']', '[', ']', '.'],
            ['[', ']', '.', '.', '[', ']'],
          ]);
        });
      });
    });
  });
  describe('moveRobot', () => {
    describe('should move the robot to an empty space', () => {
      it('move robot right', () => {
        const warehouse: Warehouse = [
          ['.', '.', '.'],
          ['.', '@', '.'],
          ['.', '.', '.'],
        ];
        const robotPosition: Position = [1, 1];
        const direction: Direction = '>';

        const result = moveRobot(warehouse, robotPosition, direction);
        expect(result).toEqual([1, 2]);
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

    describe('the should move boxes', () => {
      describe('push one box', () => {
        //
        it('move robot right', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.'],
            ['@', '[', ']', '.'],
            ['.', '.', '.', '.'],
          ];
          const robotPosition: Position = [1, 0];
          const direction: Direction = '>';

          const result = moveRobot(warehouse, robotPosition, direction);
          expect(result).toEqual([1, 1]);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.'],
            ['.', '@', '[', ']'],
            ['.', '.', '.', '.'],
          ]);
        });

        //
        it('move robot left', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.'],
            ['.', '[', ']', '@'],
            ['.', '.', '.', '.'],
          ];
          const robotPosition: Position = [1, 3];
          const direction: Direction = '<';

          const result = moveRobot(warehouse, robotPosition, direction);
          expect(result).toEqual([1, 2]);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.'],
            ['[', ']', '@', '.'],
            ['.', '.', '.', '.'],
          ]);
        });

        //
        it('move robot up', () => {});
        //
        it('move robot down', () => {});
      });
      describe('push one boxes in a row', () => {
        //
        it('move robot right', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['@', '[', ']', '[', ']', '[', ']', '[', ']', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ];
          const robotPosition: Position = [1, 0];
          const direction: Direction = '>';

          const result = moveRobot(warehouse, robotPosition, direction);
          expect(result).toEqual([1, 1]);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '@', '[', ']', '[', ']', '[', ']', '[', ']'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ]);
        });

        //
        it('move robot left', () => {
          const warehouse: Warehouse = [
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '[', ']', '[', ']', '[', ']', '[', ']', '@'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ];
          const robotPosition: Position = [1, 9];
          const direction: Direction = '<';

          const result = moveRobot(warehouse, robotPosition, direction);
          expect(result).toEqual([1, 8]);
          expect(warehouse).toEqual([
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['[', ']', '[', ']', '[', ']', '[', ']', '@', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ]);
        });
        describe('should move boxes up', () => {
          //
          it('move boxes up case 0', () => {
            const warehouse: Warehouse = [
              ['.', '.', '.', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '.', '@', '.', '.'],
            ];
            const robotPosition: Position = [3, 3];
            const direction: Direction = '^';

            const result = moveRobot(warehouse, robotPosition, direction);
            expect(result).toEqual([2, 3]);
            expect(warehouse).toEqual([
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '.', '@', '.', '.'],
              ['.', '.', '.', '.', '.', '.'],
            ]);
          });
          //
          it('move boxes up case 1', () => {
            const warehouse: Warehouse = [
              ['.', '.', '.', '.', '.', '.'],
              ['.', '[', ']', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '@', '.', '.', '.'],
            ];
            const robotPosition: Position = [3, 2];
            const direction: Direction = '^';

            const result = moveRobot(warehouse, robotPosition, direction);
            expect(result).toEqual([2, 2]);
            expect(warehouse).toEqual([
              ['.', '[', ']', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '@', '.', '.', '.'],
              ['.', '.', '.', '.', '.', '.'],
            ]);
          });
          //
          it('move boxes up case 2', () => {
            const warehouse: Warehouse = [
              ['.', '.', '.', '.', '.', '.'],
              ['.', '[', ']', '[', ']', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '.', '@', '.', '.'],
            ];
            const robotPosition: Position = [3, 3];
            const direction: Direction = '^';

            const result = moveRobot(warehouse, robotPosition, direction);
            expect(result).toEqual([2, 3]);
            expect(warehouse).toEqual([
              ['.', '[', ']', '[', ']', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '.', '@', '.', '.'],
              ['.', '.', '.', '.', '.', '.'],
            ]);
          });
        });
        describe('should move boxes down', () => {
          //
          it('move boxes down case 0', () => {
            const warehouse: Warehouse = [
              ['.', '.', '@', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '.', '.', '.', '.'],
            ];
            const robotPosition: Position = [0, 2];
            const direction: Direction = 'v';

            const result = moveRobot(warehouse, robotPosition, direction);
            expect(result).toEqual([1, 2]);
            expect(warehouse).toEqual([
              ['.', '.', '.', '.', '.', '.'],
              ['.', '.', '@', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
            ]);
          });
          //
          it('move boxes down case 1', () => {
            const warehouse: Warehouse = [
              ['.', '.', '@', '.', '.', '.'],
              ['.', '[', ']', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '.', '.', '.', '.'],
            ];
            const robotPosition: Position = [0, 2];
            const direction: Direction = 'v';

            const result = moveRobot(warehouse, robotPosition, direction);
            expect(result).toEqual([1, 2]);
            expect(warehouse).toEqual([
              ['.', '.', '.', '.', '.', '.'],
              ['.', '.', '@', '.', '.', '.'],
              ['.', '[', ']', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
            ]);
          });
          //
          it('move boxes down case 2', () => {
            const warehouse: Warehouse = [
              ['.', '.', '@', '.', '.', '.'],
              ['.', '[', ']', '[', ']', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '.', '.', '.', '.', '.'],
            ];
            const robotPosition: Position = [0, 2];
            const direction: Direction = 'v';

            const result = moveRobot(warehouse, robotPosition, direction);
            expect(result).toEqual([1, 2]);
            expect(warehouse).toEqual([
              ['.', '.', '.', '.', '.', '.'],
              ['.', '.', '@', '[', ']', '.'],
              ['.', '[', ']', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
            ]);
          });
          //
          it('move boxes down case 3', () => {
            const warehouse: Warehouse = [
              ['.', '.', '.', '@', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '[', ']', '[', ']', '.'],
              ['[', ']', '[', ']', '[', ']'],
              ['.', '.', '.', '.', '.', '.'],
            ];
            const robotPosition: Position = [0, 3];
            const direction: Direction = 'v';

            const result = moveRobot(warehouse, robotPosition, direction);
            expect(result).toEqual([1, 3]);
            expect(warehouse).toEqual([
              ['.', '.', '.', '.', '.', '.'],
              ['.', '.', '.', '@', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '[', ']', '[', ']', '.'],
              ['[', ']', '[', ']', '[', ']'],
            ]);
          });
          //
          it('move boxes down case 4', () => {
            const warehouse: Warehouse = [
              ['.', '.', '@', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '[', ']', '[', ']', '.'],
              ['[', ']', '.', '.', '[', ']'],
              ['.', '.', '#', '#', '.', '.'],
            ];
            const robotPosition: Position = [0, 2];
            const direction: Direction = 'v';

            const result = moveRobot(warehouse, robotPosition, direction);
            expect(result).toEqual([1, 2]);
            expect(warehouse).toEqual([
              ['.', '.', '.', '.', '.', '.'],
              ['.', '.', '@', '.', '.', '.'],
              ['.', '.', '[', ']', '.', '.'],
              ['.', '[', ']', '[', ']', '.'],
              ['[', ']', '#', '#', '[', ']'],
            ]);
          });
        });
      });
    });
  });
});
