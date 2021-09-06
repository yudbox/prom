//for primitives

let str = "my string";
let strObj = new String(str);
strObj = strObj.toLocaleUpperCase().toString();

let num = 5.55;
let numObj = new Number(num);
numObj = Number(numObj);

console.log("str", str);
console.log("strObj", strObj);

console.log("num", num);
console.log("numObj", numObj);

let names = {
  one: "alex",
  two: "sergey",
};

let names2 = new Object({
  one: "alex",
  two: "sergey",
});

let person = {
  man: true,
  hand: "two",
  legs: "two",
};

names.__proto__ = person;
let names3 = Object.create(person, {
  one: { value: "alex" },
  hand: { value: "sergey" },
});

console.log("names ", names);
console.log("names3 ", names3);
console.log("names proto get", num.__proto__);
