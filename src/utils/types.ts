export interface Point {
  x: number;
  y: number;
}

export const PointToString = ({x,y}: Point) => `${x},${y}`;

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


export const getPointNeighbors = ({x,y}: Point, diagonal = false): Point[] => {
  return [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    ...(diagonal
      ? [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ]
      : []),
  ].map(([difX, difY]) => ({ x: x + difX, y: y + difY }));
}