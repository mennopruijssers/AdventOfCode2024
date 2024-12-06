import { BaseDay } from '../day';
import { Point } from '../utils/types';

interface Input { position: Point, direction: Point, blocks: Set<string>, max: Point }

const rotate = (direction: Point): Point => {
  // N:0 , -1
  // E:1, 0
  // S:1, 0
  // W:0, -1
  return { x: -direction.y, y: direction.x };
}


const pointToString = (p: Point): string => `${p.x},${p.y}`;

const isLoop = (input: Input, blocks: Set<string>): boolean => {
  const { max } = input;
  let position = input.position;
  let direction = input.direction;
  const path = new Map<string, Set<string>>();
  while (position.x >= 0 && position.y >= 0 && position.x < max.x && position.y < max.y) {
    const pString = pointToString(position);
    if (path.has(pString)) {
      if (path.get(pString)!.has(pointToString(direction))) {
        return true;
      }
    } else {
      path.set(pString, new Set<string>());
    }
    path.get(pString)!.add(pointToString(direction));
    const newPosition = { x: position.x + direction.x, y: position.y + direction.y };
    if (blocks.has(pointToString(newPosition))) {
      direction = rotate(direction);
    } else {
      position = newPosition;
    }
  }
  return false;
}

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const lines = input.split('\n');

    let position: Point = { x: 0, y: 0 };
    let direction: Point = { x: 0, y: -1 };
    const blocks = new Set<string>();

    lines.forEach((line, y) => {
      line.split('').forEach((char, x) => {
        if (char === '#') blocks.add(pointToString({ x, y }));
        if (char === '^') {
          position = { x, y };
          direction = { x: 0, y: -1 };
        }
      });
    });

    return { position, direction, blocks, max: { x: lines[0].length, y: lines.length } };
  }

  partOne() {
    const { blocks, max } = this.input;
    let position = this.input.position;
    let direction = this.input.direction;
    const path = new Set<string>();
    while (position.x >= 0 && position.y >= 0 && position.x < max.x && position.y < max.y) {
      path.add(pointToString(position));
      const newPosition = { x: position.x + direction.x, y: position.y + direction.y };
      if (blocks.has(pointToString(newPosition))) {
        direction = rotate(direction);
      } else {
        position = newPosition;
      }
    }
    return path.size;
  }

  partTwo() {
    const { blocks, max } = this.input;
    let position = this.input.position;
    let direction = this.input.direction;
    const path = new Set<string>();
    while (position.x >= 0 && position.y >= 0 && position.x < max.x && position.y < max.y) {
      path.add(pointToString(position));
      const newPosition = { x: position.x + direction.x, y: position.y + direction.y };
      if (blocks.has(pointToString(newPosition))) {
        direction = rotate(direction);
      } else {
        position = newPosition;
      }
    }


    const createsLoop = Array.from(path).filter((p) => {
      return isLoop(this.input, new Set([...blocks, p]))
    })

    return createsLoop.length;
  }
}

export default Day;
