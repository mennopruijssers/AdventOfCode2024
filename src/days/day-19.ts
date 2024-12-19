import { BaseDay } from '../day';

interface Input { towels: string[]; designs: string[] }

const isPossible = (design: string, towels: string[]) => {
  for (const towel of towels) {
    if (design === towel) return true;
    if (design.startsWith(towel)) {
      const subPossible = isPossible(design.substring(towel.length), towels);
      if (subPossible) return true;
    }
  }
  return false
}

export const getPossibleOptions = (design: string, towels: string[], cache: Map<string,number>) => {
  if(cache.has(design)) return cache.get(design)!;

  let count = 0;
  for (const towel of towels) {
    if(design === towel) {
      count++;
    }
    else if (design.startsWith(towel)) {
      const subCount = getPossibleOptions(design.substring(towel.length), towels, cache);
      count+=subCount
    }
  }
  cache.set(design, count);
  return count;
}

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const [towels, designs] = input.split('\n\n');
    return { towels: towels.split(', '), designs: designs.split('\n') }
  }

  partOne() {
    const { towels, designs } = this.input;

    const possibleDesigns = designs.filter(design => isPossible(design, towels));

    return possibleDesigns.length;
  }

  partTwo() {
    const { towels, designs } = this.input;

    const cache = new Map<string, number>();
    const possibleOptions = designs.map(design => getPossibleOptions(design, towels, cache));

    return possibleOptions.reduce((acc, curr) => acc + curr, 0);
  }
}

export default Day;
