import Day from './day-00';
import { dayRunner, dayVerifier } from './test-util';

const example = `
input
`.trim();

dayRunner(Day, example, 42, 42);

dayVerifier(0, 42, 42);
