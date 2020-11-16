/**
 * Run 'tsc' to compile.
 *
 * Run 'tsc -p' for the TypeScript compiler to watch
 * for changes in the files and automatically trigger the transpilation.
 */
var getRandomInteger = function () {
    return (Math.random() * 10).toFixed(0);
};
var findEven = new Promise(function (resolve, reject) {
    console.log(getRandomInteger());
    setTimeout(function () {
        var value = parseInt(getRandomInteger());
        if (value % 2 === 0) {
            resolve(value);
        }
        else {
            reject('Odd number found!');
        }
    }, 1000);
});
findEven
    .then(function (value) { return console.log('Resolved:', value + 1); })["catch"](function (error) { return console.log('Rejected:', error); })["finally"](function () { return console.log('Finished'); });
