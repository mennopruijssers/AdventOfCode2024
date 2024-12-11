import { BaseDay } from '../day';
import { Grid } from '../utils/grid';
import { Point } from '../utils/types';

type Input = Grid<number>



const pointToString = (point: Point) => `${point.x},${point.y}`;

export const scoreTrailHead = (grid: Input, start: Point) => {
  // istanbul ignore next
  if (grid.get(start) !== 0) {
    throw new Error('start is not a 0');
  }
  const queue: Point[] = [start];
  const visited = new Set<string>();
  const destinations = new Set<string>();
  while (queue.length > 0) {
    const current = queue.shift()!;
    if(visited.has(pointToString(current))) {
      continue;
    }
    visited.add(pointToString(current));
    const currentValue = grid.get(current);
    if (currentValue === 9) {
      destinations.add(pointToString(current));
      continue;
    }
    const neighbors = grid.getNeighbors(current);

    neighbors.filter(neighbor => !visited.has(pointToString(neighbor))).forEach(neighbor => {
      if(grid.get(neighbor) === currentValue+1) {
        queue.push(neighbor);
      }
    });
  }
  return destinations.size
}

export const scoreTrailHead2 = (grid: Input, start: Point) => {
  // istanbul ignore next
  if (grid.get(start) !== 0) {
    throw new Error('start is not a 0');
  }
  const queue: Point[] = [start];
  let score = 0;
  while (queue.length > 0) {
    const current = queue.shift()!;

    const currentValue = grid.get(current);
    if (currentValue === 9) {
      score++;
      continue;
    }
    const neighbors = grid.getNeighbors(current);

    neighbors.forEach(neighbor => {
      if(grid.get(neighbor) === currentValue+1) {
        queue.push(neighbor);
      }
    });
  }
  return score;
}
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return new Grid(input.split('\n').map(line => line.split('').map(Number)));
  }

  partOne() {
    const grid = this.input;
    let total = 0;
    for (let y = 0; y < grid.grid.length; y++) {
      for (let x = 0; x < grid.grid[y].length; x++) {
        if (grid.get({ x, y }) !== 0) {
          continue;
        }
        const score = scoreTrailHead(grid, { x, y });
        total += score;
      }
    }
    return total;
  }

  partTwo() {
    const grid = this.input;
    let total = 0;
    for (let y = 0; y < grid.grid.length; y++) {
      for (let x = 0; x < grid.grid[y].length; x++) {
        if (grid.get({ x, y }) !== 0) {
          continue;
        }
        const score = scoreTrailHead2(grid, { x, y });
        total += score;
      }
    }
    return total;
  }
}

export default Day;
