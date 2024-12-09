import Day from './day-09';
import { dayRunner, dayVerifier } from './test-util';

const example = `
2333133121414131402
`.trim();

dayRunner(Day, example, 1928, 2858);

dayVerifier(9, 6446899523367, 6478232739671);
