import { describe, expect, it } from '@jest/globals';
import Day, {getWords} from './day-04';
import { dayRunner, dayVerifier } from './test-util';

const example = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`.trim();

dayRunner(Day, example, 18, 9);

dayVerifier(4, 2336, 1831);


describe('words', () => {
  it('should return all words', () => {
    const words = getWords(example.split('\n').map(line => [...line]), { x: 0, y: 0 })
    expect(words).toEqual(['M', 'M','MMMS', 'MSXM', 'MMAM','M','M','M']);
  });
});
