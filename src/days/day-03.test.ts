import Day from './day-03';
import { dayRunner, dayVerifier } from './test-util';

const example = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const example2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

dayRunner(Day, example, 161, undefined);
dayRunner(Day, example2, undefined, 48);
dayVerifier(3, 156388521, 75920122);
