let myDate = new Date();
let myDate2 = myDate.toISOString().slice(0, 10);
let getFullYear = myDate.getFullYear();
let getMonth = myDate.getMonth();
let getDate = myDate.getDate();
let getHours = myDate.getHours();
let getUTCHours = myDate.getUTCHours();
let getMinutes = myDate.getMinutes();
let getSeconds = myDate.getSeconds();
let getTime = myDate.getTime();
let getTimezoneOffset = myDate.getTimezoneOffset();
let getDay = myDate.getDay();

console.log("MY DATE---->", myDate);
console.log("MY DATE---->", myDate2);
console.log("getFullYear---->", getFullYear);
console.log("getMonth---->", getMonth);
console.log("getDate---->", getDate);
console.log("getHours---->", getHours);
console.log("getUTCHours---->", getUTCHours);
console.log("getMinutes---->", getMinutes);
console.log("getSeconds---->", getSeconds);
console.log("getTime---->", getTime);
console.log("getTimezoneOffset---->", getTimezoneOffset);
console.log("getDate---->", getDay);
