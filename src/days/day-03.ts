import { BaseDay } from '../day';

type Input = string;

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.trim();
  }

  async partOne(): Promise<number> {
    const matchAll = this.input.matchAll(/mul\((\d+),(\d+)\)/g);

    const matches = [...matchAll];

    const results = matches.map((match) => {
      const [_, a, b] = match;
      const result = Number(a) * Number(b);
      return result;
    });

    return results.reduce((sum, n) => sum + n, 0);
  }

  async partTwo(): Promise<number> {
    const matches = this.input.matchAll(/(mul|do|don't)\((?:(\d+),(\d+))?\)/g);
    let enabled = true;

    let sum = 0;
    for (const match of matches) {
      if (match[1] === 'do') {
        enabled = true;
        continue;
      }
      if (match[1] === "don't") {
        enabled = false;
        continue;
      }
      if (enabled) {
        if (match[1] === 'mul') {
          const [_1, _2, a, b] = match;
          sum += Number(a) * Number(b);
        }
      }
    }

    return sum;
  }
}

export default Day;
