const COLUMN_COUNT = 4;
const ROW_COUNT = 4;

const generateRandom = (max) => Math.floor(Math.random() * (max + 1))

const row = (targetSymbol, numOfTargets) => {
  const row = new Array(COLUMN_COUNT).fill('-');
  for (let iterator = 0; iterator < numOfTargets; iterator++) {
    const monster = generateRandom(COLUMN_COUNT);
    row[monster] = targetSymbol.join('');
  }

  return row.join('');
}

export const boardGenerator = () => {
  const board = new Array(ROW_COUNT).fill().map(() => row`X${generateRandom(2)}`);
  board.map((row) => console.log(row));
}