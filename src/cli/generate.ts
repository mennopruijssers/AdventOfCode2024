#!/usr/bin/env node

/* istanbul ignore file */

import * as fs from 'fs/promises';

import * as copyPaste from 'copy-paste';

async function main(): Promise<void> {
  const inputs = await fs.readdir('./inputs/');

  let nextDayNumber: number;
  const arg = process.argv[2];
  if (!arg) {
    throw new Error('Please provide a day number, "next", or "today" to generate a new day');
  }
  if (arg === 'next') {
    const last = inputs.length === 0 ? 'day-00' : inputs.reverse()[0];
    nextDayNumber = parseInt(last.substring('day-'.length)) + 1;
  } else if (arg === 'today') {
    const today = new Date().getDate();
    nextDayNumber = today;
  } else {
    nextDayNumber = parseInt(arg);
  }
  const nextDayString = nextDayNumber.toString().padStart(2, '0');

  console.log(`creating day ${nextDayNumber}`);

  await fs.writeFile(
    `inputs/day-${nextDayString}.txt`,
    copyPaste.paste() || '',
  );

  const file = await fs.readFile('src/days/day-00.ts', 'utf8');
  const fileTest = await fs.readFile('src/days/day-00.test.ts', 'utf8');

  const result = file.replace(/00/g, `${nextDayString}`);
  const resultTest = fileTest
    .replace(/00/g, `${nextDayString}`)
    .replace(/\(0/g, `(${nextDayNumber}`);

  await fs.writeFile(`src/days/day-${nextDayString}.ts`, result);
  await fs.writeFile(`src/days/day-${nextDayString}.test.ts`, resultTest);
}
main()
  .then(() => console.log('done!'))
  .catch((err) => {
    console.error(err);
  });
