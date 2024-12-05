import Day from './day-01';
import { dayRunner, dayVerifier } from './test-util';

const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

dayRunner(Day, example, 11, 31);

dayVerifier(1, 1151792, 21790168);
