import { BaseDay } from '../day';
import { allPairs } from '../utils/arrays';
import { Point } from '../utils/types';

interface Input { antennas: Map<string, Point[]>, bounds: Point }

const isInBounds = ({ x, y }: Point, bounds: Point) => {
  if (x < 0 || x >= bounds.x) return false
  if (y < 0 || y >= bounds.y) return false
  return true;
}

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const lines = input.split('\n');

    const antennas = new Map<string, Point[]>();
    lines.forEach((line, y) => {
      line.split('').forEach((char, x) => {
        if (char === '.') return;

        if (!antennas.has(char)) antennas.set(char, []);
        antennas.get(char)!.push({ x, y });
      });
    });
    const bounds = { x: lines[0].length, y: lines.length };

    return { antennas, bounds };
  }

  partOne() {
    const { antennas, bounds } = this.input;
    const pairs = [...antennas.values()]
      .flatMap((antennas) => {
        return allPairs(antennas);
      })


    const antiNodes = pairs.flatMap(([a, b]) => {
      const antinodeA = { x: (a.x - 2 * b.x) / -1, y: (a.y - 2 * b.y) / -1 }
      const antinodeB = { x: (b.x - 2 * a.x) / -1, y: (b.y - 2 * a.y) / -1 }
      return [antinodeA, antinodeB]
    })

    const validAntiNodes = antiNodes
      .filter(p => isInBounds(p, bounds))

    const uniqueAntiNodes = new Set(validAntiNodes.map(({ x, y }) => `${x},${y}`))
    return uniqueAntiNodes.size;
  }

  partTwo() {
    const { antennas, bounds } = this.input;
    const pairs = [...antennas.values()]
      .flatMap((antennas) => {
        return allPairs(antennas);
      })


    const antiNodes = pairs.flatMap(([a, b]) => {
      const diffX = (a.x - b.x)
      const diffY = (a.y - b.y)


      const antiNodes = []
      let antiNode = { x: a.x - diffX, y: a.y - diffY };
      while (isInBounds(antiNode, bounds)) {
        antiNodes.push(antiNode)
        antiNode = { x: antiNode.x - diffX, y: antiNode.y - diffY };
      }

      antiNode = { x: b.x + diffX, y: b.y + diffY };
      while (isInBounds(antiNode, bounds)) {
        antiNodes.push(antiNode)
        antiNode = { x: antiNode.x + diffX, y: antiNode.y + diffY };
      }
      return antiNodes
    })


    const uniqueAntiNodes = new Set(antiNodes.map(({ x, y }) => `${x},${y}`))
    return uniqueAntiNodes.size;
  }
}

export default Day;
