const sum = require('./sum');

const result = sum(1,3);
// console.log("sum result: ", result);

const {add, subtract, multiply, divide} = require('./calculator');

console.log("add: ",add(1,3))
console.log("subtract: ",subtract(1,3))
console.log("multiply: ",multiply(1,3))
console.log("divide: ",divide(1,3))