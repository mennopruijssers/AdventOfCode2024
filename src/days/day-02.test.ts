import Day from './day-02';
import { dayRunner, dayVerifier } from './test-util';

const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

dayRunner(Day, example, 2, 4);

dayVerifier(2, 224, 293);
