/* istanbul ignore file */

export abstract class BaseDay<Input, Return1, Return2 = Return1> {
  input: Input;
  constructor(input: string) {
    this.input = this.parse(input);
  }

  abstract parse(input: string): Input;

  abstract partOne(): Promise<Return1> | Return1;
  abstract partTwo(partOneOutput: Return1): Promise<Return2> | Return2;

  printResultOne(output: Return1): void {
    console.log(output);
  }

  printResultTwo(output: Return2): void {
    console.log(output);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DayConstructor<Input=any, Return1=any, Return2 = Return1> = new (input: string) => BaseDay<Input, Return1, Return2> ;
