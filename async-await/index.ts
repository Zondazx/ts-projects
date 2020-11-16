/**
 * Run 'tsc' to compile.
 *
 * Run 'tsc -p' for the TypeScript compiler to watch
 * for changes in the files and automatically trigger the transpilation.
 */
const getRandomInteger = (): string => {
  return (Math.random() * 10).toFixed(0);
};

const findEven = new Promise<number>((resolve, reject) => {
  console.log(getRandomInteger());
  setTimeout((): void => {
    const value = parseInt(getRandomInteger());

    if (value % 2 === 0) {
      resolve(value);
    } else {
      reject('Odd number found!');
    }
  }, 1000);
});

findEven
  .then(value => console.log('Resolved:', value + 1))
  .catch(error => console.log('Rejected:', error))
  .finally(() => console.log('Finished'));
