import { BaseDay } from '../day';

type Input = Map<number, number>;

export function blink(stones: Input): Input {
  const newStones = new Map<number, number>();

  const addStones = (stone: number, count: number)=> {
    if(newStones.has(stone)){
      newStones.set(stone, newStones.get(stone)! + count);
    } else {
      newStones.set(stone, count);
    }
  }

  [...stones.entries()].forEach(([stone, count]) => {
    if (stone === 0) {
      addStones(1, count);
      return;
    }
      const s = `${stone}`;
      if (s.length % 2 === 0) {
        const partA = s.substring(0, s.length / 2);
        const partB = s.substring(s.length / 2);
        addStones(Number(partA), count);
        addStones(Number(partB), count);
        return;
      }
    addStones(stone * 2024, count);
  });
  return newStones;
}

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.trim().split(' ').map(Number).reduce((map, stone) => {
      // istanbul ignore if
      if(map.has(stone)) {
        map.set(stone, map.get(stone)! + 1);
      } else {
        map.set(stone, 1);
      }
      return map;
    }, new Map<number, number>());
  }

 partOne() {
   let stones = this.input;
   for (let i = 0; i < 25; i++){
     stones = blink(stones);
   }
   return [...stones.values()].reduce((stone,count)=>stone+count,0);

  }

  partTwo() {
    let stones = this.input;
   for (let i = 0; i < 75; i++){
     stones = blink(stones);
   }
   return [...stones.values()].reduce((stone,count)=>stone+count,0);
  }
}

export default Day;
