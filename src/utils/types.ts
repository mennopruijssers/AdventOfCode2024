export interface Point {
  x: number;
  y: number;
}

export type Point3d = Point & {
  z: number;
};
