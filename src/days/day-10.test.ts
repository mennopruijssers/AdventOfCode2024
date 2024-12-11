import { describe, expect, it } from '@jest/globals';
import Day, { scoreTrailHead, scoreTrailHead2 } from './day-10';
import { dayRunner, dayVerifier } from './test-util';
import { Grid } from '../utils/grid';

const parse = (input: string) => new Grid(input.trim().split('\n').map(line => line.split('').map(Number)));
describe('scoreTrailHead', () => {
  it('example 1', () => {
    const grid = parse(`
0123
1234
8765
9876`);
    expect(scoreTrailHead(grid, {x:0, y:0})).toBe(1);
  })

  it('example 2', () => {
    const grid = parse(`
...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`);
    expect(scoreTrailHead(grid, { x: 3, y: 0 })).toBe(2);
  })

  it('example 3', () => {
    const grid = parse(`
..90..9
...1.98
...2..7
6543456
765.987
876....
987....`);
    expect(scoreTrailHead(grid, { x: 3, y: 0 })).toBe(4);
  })

  it('example 4', () => {
    const grid = parse(`
10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`);
    expect(scoreTrailHead(grid, { x: 1, y: 0 })).toBe(1);
    expect(scoreTrailHead(grid, { x: 5, y: 6 })).toBe(2);
  })
});

describe('scoreTrailHead2', () => {
  it('example 1', () => {
    const grid = parse(`
.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`);
    expect(scoreTrailHead2(grid, {x:5, y:0})).toBe(3);
  })

  it('example 2', () => {
    const grid = parse(`
..90..9
...1.98
...2..7
6543456
765.987
876....
987....`);
    expect(scoreTrailHead2(grid, { x: 3, y: 0 })).toBe(13);
  })

  it('example 3', () => {
    const grid = parse(`
012345
123456
234567
345678
4.6789
56789.`);
    expect(scoreTrailHead2(grid, { x: 0, y: 0 })).toBe(227);
  })
});

const example = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`.trim();

dayRunner(Day, example, 36, 81);

dayVerifier(10, 825, 1805);
