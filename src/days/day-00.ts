import { BaseDay } from '../day';

type Input = string[];
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n');
  }

 partOne(): number {
    return 42;
  }

  partTwo(): number {
    return 42;
  }
}

export default Day;
