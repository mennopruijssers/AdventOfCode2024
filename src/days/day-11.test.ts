import Day from './day-11';
import { dayRunner, dayVerifier } from './test-util';

const example = `
125 17
`.trim();

dayRunner(Day, example, 55312, 65601038650482);

dayVerifier(11, 186203, 221291560078593);