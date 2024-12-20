import { BaseDay } from '../day';
import {  Grid } from '../utils/grid';
import { getPointNeighbors, Point, PointToString } from '../utils/types';


interface Area {
  points: Point[];
  key: string;
}

type Input = Area[]
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const grid = new Grid(input.split('\n').map(line => line.split('')));

    const areas: Area[] = [];

    const visited = new Set<string>();

    for (let y = 0; y < grid.grid.length; y++) {
      for (let x = 0; x < grid.grid[y].length; x++) {
        const point = { x, y };
        const value = grid.get(point);
        const key = PointToString(point);
        if (visited.has(key)) continue;

        const areaMap = new Map<string, Point>();
        const queue = [point];
        while (queue.length > 0) {
          const current = queue.shift()!;
          const currentKey = PointToString(current);
          if (visited.has(currentKey)) continue;
          if (value === grid.get(current)) {
            areaMap.set(currentKey, current);
            visited.add(currentKey);
            queue.push(...grid.getNeighbors(current));
          }
        }

        areas.push({
          points: Array.from(areaMap.values()),
          key: value,
        });
      }
    }
    return areas;
  }

  partOne() {
    const areas = this.input;


    const areasWithCalculations = areas.map(area=>({
      ...area,
      area: area.points.length,
      perimeter: getPerimeter(area.points)
    }));

    const prices = areasWithCalculations.map(area=>area.area * area.perimeter);

    return prices.reduce((a,b)=>a+b,0);
  }

  partTwo() {
    const areas = this.input;


    const areasWithCalculations = areas.map(area=>({
      ...area,
      area: area.points.length,
      sides: getSides(area.points)
    }));

    const prices = areasWithCalculations.map(area=>area.area * area.sides);

    return prices.reduce((a,b)=>a+b,0);
  }
}

export default Day;
function getPerimeter(points: Point[]): number {
  const pointSet = new Set(points.map(PointToString));
  let perimeter = 0;
  for (const point of points) {
    const neighbors = getPointNeighbors(point);
    const missingNeighbors = neighbors.filter(neighbor => !pointSet.has(PointToString(neighbor)));
    const pointPerimeter = missingNeighbors.length;
    perimeter += pointPerimeter
  }
  return perimeter;
}
function getSides(points: Point[]): number {
  let sides = 0;
  const pointSet = new Set(points.map(PointToString));
  for (const point of points) {
    let cornersForPoint = 0;

    const [left, top, right, down] = getPointNeighbors(point);
    const [leftS, topS, rightS, downS] = [left, top, right, down].map(PointToString);

    if (!pointSet.has(topS) && !pointSet.has(rightS)) cornersForPoint++
    if (!pointSet.has(rightS) && !pointSet.has(downS)) cornersForPoint++
    if (!pointSet.has(downS) && !pointSet.has(leftS)) cornersForPoint++
    if (!pointSet.has(topS) && !pointSet.has(leftS)) cornersForPoint++

    if (pointSet.has(topS) && pointSet.has(rightS)) {
      const topRight = { x: right.x, y: top.y };
      if (!pointSet.has(PointToString(topRight))) cornersForPoint++;
    }

    if (pointSet.has(rightS) && pointSet.has(downS)) {
      const rightDown = { x: right.x, y: down.y };
      if (!pointSet.has(PointToString(rightDown))) cornersForPoint++;
    }

    if (pointSet.has(leftS) && pointSet.has(downS)) {
      const downLeft = { x: left.x, y: down.y };
      if (!pointSet.has(PointToString(downLeft))) cornersForPoint++;
    }

    if (pointSet.has(leftS) && pointSet.has(topS)) {
      const leftTop = { x: left.x, y: top.y };
      if (!pointSet.has(PointToString(leftTop))) cornersForPoint++;
    }

    sides += cornersForPoint;
  }

  return sides;
}

