function add(x, y) {
    return x + y;
  }
console.log(add(2, 3));

const addStr = function (x, y) {
    return x + y;
};
console.log(addStr("안녕", "하세요"));
  
add = (x, y) => {
  return x + y;
};

add = x => {
  return x;
};

add = () => {
  return 1;
};

add = (x, y) => x + y;

const square = x => x * x;

// const person = (name, age) => ({ name: name, age: age });

const person = function (name, age) {
  return {
    name: name,
    age: age,
  };
};