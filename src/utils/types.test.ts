import { describe, expect, it } from '@jest/globals';
import { getPointNeighbors, PointToString } from './types';

describe('pointToString', () => {
  it('converts a point to a string', () => {
    expect(PointToString({ x: 1, y: 2 })).toEqual('1,2');
  });
});

describe('getPointNeighbors', () => {
  it('returns all adjacent points', () => {
    const r = getPointNeighbors({ x: 2, y: 2 });
    expect(r).toHaveLength(4);
    expect(r).toEqual(
      expect.arrayContaining([
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: 3 },
      ]),
    );
  });

  it('returns all adjacent points with diagonals', () => {
    const r = getPointNeighbors({ x: 2, y: 2 }, true);
    expect(r).toHaveLength(8);
    expect(r).toEqual(
      expect.arrayContaining([
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 1, y: 3 },
        { x: 3, y: 3 },
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: 3 },
      ]),
    );
  });
});