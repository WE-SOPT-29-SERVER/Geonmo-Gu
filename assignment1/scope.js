if (true) {
    var x = "var"; //fuction scope
}
console.log(`var: ${x}`);

if (true) {
    let y = "let";
    const z = "const";
    
    // block scope
    console.log(`let: ${y}`);
    console.log(`const: ${z}`);
}

// console.log(`let: ${y}`);
// console.log(`const: ${z}`);

function coloerfunction() {
    if (true) {
        var color = "blue";
        console.log(color);
    }
    console.log(color);
}

// console.log(color);