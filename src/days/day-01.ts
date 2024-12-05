import { BaseDay } from '../day';

type Input = [number[], number[]];
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const lines = input.split('\n').map((line) => line.split(/ +/).map(Number));

    const left = lines.map((line) => line[0]);
    const right = lines.map((line) => line[1]);

    return [left, right];
  }

   partOne(): number {
    const left = this.input[0].sort((a, b) => a - b);
    const right = this.input[1].sort((a, b) => a - b);

    const differences = left.map((n, i) => Math.abs(n - right[i]));
    return differences.reduce((sum, n) => sum + n);
  }

  partTwo(): number {
    const [left, right] = this.input;

    const rightMap = right.reduce<Record<number, number>>((map, n) => {
      if (map[n]) {
        map[n]++;
      } else {
        map[n] = 1;
      }
      return map;
    }, {});

    return left.reduce((sum, n) => {
      const count = rightMap[n] ?? 0;
      const score = count * n;
      return sum + score;
    }, 0);
  }
}

export default Day;
