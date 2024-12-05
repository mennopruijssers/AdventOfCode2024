import { BaseDay } from '../day';

type Input = number[][];

const isSafe = (line: number[]) => {
  const increasing = line[0] < line[1];
  for (let i = 1; i <= line.length - 1; i++) {
    const diff = line[i] - line[i - 1];
    if (diff === 0) return false;
    if (increasing && diff < 0) return false;
    if (!increasing && diff > 0) return false;
    if (Math.abs(diff) > 3) return false;
  }
  return true;
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n').map((line) => line.split(/ +/).map(Number));
  }

  async partOne(): Promise<number> {
    const safe = this.input.filter(isSafe);
    return safe.length;
  }

  async partTwo(): Promise<number> {
    const safe = this.input.filter((line) => {
      if (isSafe(line)) return true;

      for (let i = 0; i < line.length; i++) {
        const newLine = [...line];
        newLine.splice(i, 1);
        if (isSafe(newLine)) {
          return true;
        }
      }
      return false;
    });

    return safe.length;
  }
}

export default Day;
