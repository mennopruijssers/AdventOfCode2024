import { BaseDay } from '../day';
import { Directions, Point } from '../utils/types';

type Input = string[][];

const searchString = 'XMAS';

const getWord = (input: Input, p: Point, direction: Point, maxLength: number) => {
  const word = [];
  for (let i = 0; i < maxLength; i++) {
    const x = p.x + direction.x * i;
    const y = p.y + direction.y * i;
    if (x < 0 || y < 0 || y >= input.length || x >= input[y].length) {
      break;
    }
    word.push(input[y][x]);
  }
  return word.join('');
};

export const getWords = (input: Input, p: Point, directions=Object.values(Directions), length=searchString.length) => {
  const words = directions
    .map(direction => getWord(input, p, direction, length))
    // .filter((word, index, arr) => arr.indexOf(word) === index);
  return words;
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n').map(line=>[...line]);
  }

  partOne() {
    let total = 0;

    for (let y = 0; y < this.input.length; y++) {
      const line = this.input[y];
      for (let x = 0; x < line.length; x++) {
        if (this.input[y][x] === 'X') {
          // console.log(x, y);
        }

        const words = getWords(this.input, { x, y });
        const count = words.filter(w=>w===searchString).length;

        total += count;
      }
    }
    return total;
  }

  partTwo() {
    let total = 0;

    for (let y = 1; y < this.input.length-1; y++) {
      const line = this.input[y];
      for (let x = 1; x < line.length-1; x++) {
        if (this.input[y][x] !== 'A') continue;
        const wordA = getWord(this.input, { x:x- 1, y:y - 1}, Directions.SE, 3)
        const wordB = getWord(this.input, { x: x + 1, y: y - 1 }, Directions.SW, 3)

        if ((wordA === 'MAS' || wordA == 'SAM') && (wordB === 'MAS' || wordB == 'SAM')) {
          total++;
        }
      }
    }
    return total;
  }
}

export default Day;
