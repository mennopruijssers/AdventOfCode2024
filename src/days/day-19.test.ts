import { describe, expect, it } from '@jest/globals';
import Day, { getPossibleOptions } from './day-19';
import { dayRunner, dayVerifier } from './test-util';

const example = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`.trim();

dayRunner(Day, example, 6, 16);

dayVerifier(19, 213, 1016700771200474);


describe('getPossibleOptions', () => {
  const towels = 'r, wr, b, g, bwu, rb, gb, br'.split(', ')
  it.each([
    ['brwrr', 2],
    ['bggr', 1],
    ['gbbr', 4],
    ['rrbgbr', 6],
    ['bwurrg', 1],
    ['brgr', 2],
  ])('design %s', (design, options)=> {
    expect(getPossibleOptions(design, towels, new Map())).toBe(options)
  })
})