import { BaseDay } from '../day';

interface Equation {
  answer: number;
  numbers: number[];
}
type Input = Equation[];

const OPERATIONS = {
  '+': (a: number, b: number) => a + b,
  '*': (a: number, b: number) => a * b,
  '||': (a: number, b: number) => parseInt(a.toString() + b.toString()),
};

const isSolvable = ({ answer, numbers }: Equation, partTwo = false): boolean => {
  const [current, ...rest] = numbers;
  const queue: { current: number, numbers: number[] }[] = [{ current, numbers: rest }];

  const operations = partTwo ? Object.values(OPERATIONS) : [OPERATIONS['+'], OPERATIONS['*']];
  while (queue.length > 0) {
    const { current, numbers } = queue.pop()!;
    if (numbers.length === 0) {
      if (current === answer) return true;
      continue;
    }
    const [number, ...rest] = numbers;
    for (const operation of operations) {
      const result = operation(current, number);
      if (result <= answer) {
        queue.push({ current: result, numbers: rest });
      }
    }
  }
  return false;
}

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n').map(line => {
      const [answer, numbers] = line.split(':').map(s => s.trim());
      return {
        answer: parseInt(answer),
        numbers: numbers.split(' ').map(n => parseInt(n))
      };
    });
  }

  partOne() {
    const solvable = this.input.filter(e => isSolvable(e));
    return solvable.map(e => e.answer).reduce((a, b) => a + b, 0);
  }

  partTwo() {
    const solvable = this.input.filter(e => isSolvable(e,true));
    return solvable.map(e => e.answer).reduce((a, b) => a + b, 0);
  }
}

export default Day;
