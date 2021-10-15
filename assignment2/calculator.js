const add = (a,b) => {
    return a + b;
}
const subtract = (a,b) => {
    return a - b;
}
const multiply = (a,b) => {
    return a * b;
}
const divide = (a,b) => {
    return a / b;
}

const calculator = {
    add,
    subtract,
    multiply,
    divide,
}

module.exports= {add,subtract,multiply,divide};
module.exports = calculator;