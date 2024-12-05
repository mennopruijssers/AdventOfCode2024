export interface Point {
  x: number;
  y: number;
}

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
export const Directions:Record<Direction, Point> = {
  'N': { x: 0, y: -1 },
  'NE': { x: 1, y: -1 },
  'E': { x: 1, y: 0 },
  'SE': { x: 1, y: 1 },
  'S': { x: 0, y: 1 },
  'SW': { x: -1, y: 1 },
  'W': { x: -1, y: 0 },
  'NW': { x: -1, y: -1 },
}

export type Point3d = Point & {
  z: number;
};
