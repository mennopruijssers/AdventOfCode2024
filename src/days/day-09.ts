import { BaseDay } from '../day';

interface Block {
  free: boolean;
  length: number;
}

type FreeBlock = Block & {
  free: true
}

type FileBlock = Block & {
  id: number;
  free: false
}

function isFreeBlock(block: Block): block is FreeBlock {
  return block.free;
}

function isFileBlock(block: Block): block is FileBlock {
  return !block.free;
}


type Input = Block[];
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('').map((char, index) => ({
      id: index % 2 === 0 ?index / 2 : undefined,
      length: parseInt(char),
      free: index % 2 === 1,
    }))
  }

 partOne() {
   const blocks = this.input.map(b=>({...b}));

   const newLayout: Block[] = [];

   let b = blocks.length - 1;
   for (let a = 0; a < b; a++){
     const current = blocks[a];
     if (!isFreeBlock(current)) {
       newLayout.push(current);
       continue;
     }

     while (current.length > 0) {
       const lastBlock = blocks[b];
       //istanbul ignore next: type guard for extra safety
       if(!isFileBlock(lastBlock)) throw new Error('unexpected free block')

       if (lastBlock.length <= current.length) {
         newLayout.push(lastBlock);
         current.length -= lastBlock.length;
         b -= 2;
       } else {
         newLayout.push({ id: lastBlock.id, length: current.length, free: false } as FileBlock);
         lastBlock.length -= current.length;
         current.length = 0;
       }
     }
   }
   if (blocks[b].length > 0) {
     newLayout.push(blocks[b]);
   }

   let index = 0;
   let checksum = 0;
   for (const block of newLayout) {
     const { length } = block;
     if (isFileBlock(block)) {
       for (let i = index; i < index + length; i++) {
         checksum += i * block.id;
       }
     }
     index += length;
   }

   return checksum;
  }

  partTwo() {
    const blocks = this.input;

    for(const current of [...blocks].reverse()) {
      if (!isFileBlock(current)) continue;

      for(let i=0; i<blocks.length; i++) {
        const block = blocks[i];
        if(block === current) break;
        if(!isFreeBlock(block)) continue;

        if (block.length === current.length) {
          blocks[i] = { ...current };
          // @ts-expect-error change to free
          current.free = true;
          break;
        }
        if (block.length > current.length) {
          blocks.splice(i, 0, {...current})
          block.length -= current.length;
          // @ts-expect-error change to free
          current.free = true;
          break;
        }
      }
    }

    let index = 0;
   let checksum = 0;
   for (const block of blocks) {
     const { length } = block;
     if (isFileBlock(block)) {
       for (let i = index; i < index + length; i++) {
         checksum += i * block.id;
       }
     }
     index += length;
   }

   return checksum;
  }
}

export default Day;
