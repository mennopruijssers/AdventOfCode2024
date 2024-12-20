import Day from './day-12';
import { dayRunner, dayVerifier } from './test-util';

const example = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`.trim();

dayRunner(Day, example, 1930, 1206);

dayVerifier(12, 1461806, 887932);
