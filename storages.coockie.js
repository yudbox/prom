// Cookie----------> 4kB  /HTML4-5 / expires - manually  / request - yes
// LocalStorage----> 10mB /HTML5   / expires - never     / request - no
// SessionStorage-->  5mB /HTML5  / expires - single tab / request - no

// f12 -> Application -> strorages -> coockies

// name - имя куки для обращения
// value - само значение которое хранится в куке
// Domain - сфйт на который кука будет отправляться (домен)
// Path - для какой конкретной части роута будет предназначен кука
// Expires - очначает время жизни от пары часов до нескольких дней
// size - размер
// HTTP only - true/false означает можно ли воздействовать на куку из Javascript (false значит можно)
// secure - true/false значит кука сработает если запрос делается через HTTPS, то есть защищеное соединение

//для того чтоб задать expires в cookie нужно указать его в кодировке UTC (т.е. по Гринвичу)
// для этого используем new Date(2022, 0, 29).toUTCString(); чтоб устнавить no expires - new Date(9999, 0, 29).toUTCString()

document.cookie = 'name=Alex; expires=' + new Date(2022, 0, 29).toUTCString();

//first parameters its a key = name, second its a value = Alex
localStorage.setItem('name', 'Alex');
localStorage.setItem('name', 'Frenk'); // to update patameters
let storeParams = localStorage.getItem('name'); //getting parameter value
localStorage.removeItem('name'); // remove parameters

//same for session storage
sessionStorage.setItem('age', 29);
sessionStorage.setItem('age', 18); // to update patameters
let sessionParams = sessionStorage.getItem('age');
console.log('sessionParams', sessionParams);
sessionStorage.removeItem('age');
