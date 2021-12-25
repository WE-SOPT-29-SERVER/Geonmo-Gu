const num1 = 1;
const num2 = 2;
const str = "1";

const bool = true;

console.log(num1 == bool);
console.log(num2 == bool);
// 1 -> ture
// true == 1
// false == 0


// Truthy
// 대충 true 다

console.log(Boolean(10))
console.log(Boolean(-1))
console.log(Boolean("undefined"))
console.log(Boolean(true))
console.log(Boolean({}))
console.log(Boolean([]))


// Falsy
// 대충 false 다
// false, 0, null, undefined

console.log(Boolean(0))
console.log(Boolean(false))
console.log(Boolean(null))
console.log(Boolean(undefined))
console.log(Boolean(""))

