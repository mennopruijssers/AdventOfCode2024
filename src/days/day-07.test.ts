import Day from './day-07';
import { dayRunner, dayVerifier } from './test-util';

const example = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`
  .trim();

dayRunner(Day, example, 3749, 11387);

dayVerifier(7, 20665830408335, 354060705047464);
