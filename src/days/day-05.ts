import { BaseDay } from '../day';

interface Input { rules: [number, number][], updates: number[][] }

const isValid = (rules: Input['rules'], update: Input['updates'][number]) => {
  const visitedPages = new Set<number>();

  for (const page of update) {
    const rulesForPage = rules.filter(rule => rule[0] === page);
    if (rulesForPage.some(([_, b]) => visitedPages.has(b))) {
      return false;
    }
    visitedPages.add(page);
  }
  return true;
}

const makeValid = (rules: Input['rules'], update: Input['updates'][number]) => {
  const sorted = update.sort((a, b) => {
    const applicableRule = rules.find(rule => (rule[0] == a && rule[1] === b) || (rule[0] == b && rule[1] === a));
    if (applicableRule![0] === a) return -1;
    return 1;
  })

  return sorted;
}


export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const [rulesInput, updatesInput] = input.split('\n\n');

    const rules = rulesInput.split('\n').map(line => line.split('|').map(Number) as [number, number]);
    const updates = updatesInput.split('\n').map(line => line.split(',').map(Number));
    return { rules, updates };
  }

  partOne() {
    const { rules, updates } = this.input;

    const validUpdates = updates.filter(update => isValid(rules, update));
    const middlePages = validUpdates.map(update => update[Math.floor(update.length / 2)])
    return middlePages.reduce((acc, curr) => acc + curr, 0);
  }

  partTwo() {
    const { rules, updates } = this.input;

    const invalidUpdates = updates.filter(update => !isValid(rules, update));

    const validUpdates = invalidUpdates.map(update => makeValid(rules, update));

    const middlePages = validUpdates.map(update => update[Math.floor(update.length / 2)])
    return middlePages.reduce((acc, curr) => acc + curr, 0);
  }
}

export default Day;
