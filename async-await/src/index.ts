/**
 * Run 'tsc' to compile.
 *
 * Run 'tsc -p' for the TypeScript compiler to watch
 * for changes in the files and automatically trigger the transpilation.
 *
 * 'tsc filename.ts' compiles without taking into consideration
 * tsconfig.json.
 *
 * source code: https://medium.com/jspoint/typescript-promises-and-async-await-b842b55ee3fd
 */

const getRandomInteger = async () => {
  const value = parseInt((Math.random() * 10).toFixed(0));

  if (value === 0) throw new Error('Can\'t work with 0.');

  return value;
};

const isEven = async (answer: boolean) => {
  try {
    const value = await getRandomInteger();
    const isEven = value % 2 === 0;

    return isEven === answer;
  } catch (e) {
    console.log("getRandomInteger rejection:", e.message);
    return false;
  }
};

isEven(true)
  .then((value) => {
    console.log(value === true ? "lucky mf" : "unlucky mf");
  })
  .catch((error: Error) => console.log("Rejected:", error))
  .finally(() => console.log("Completed!"));
