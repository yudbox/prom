// f12 -> Application -> strorages -> coockies

// name - имя куки для обращения
// value - само значение которое хранится в куке
// Domain - сфйт на который кука будет отправляться (домен)
// Path - для какой конкретной части роута будет предназначен кука
// Expires - очначает время жизни от пары часов до нескольких дней
// size - размер
// HTTP only - true/false означает можно ли воздействовать на куку из Javascript (false значит можно)
// secure - true/false значит кука сработает если запрос делается через HTTPS, то есть защищеное соединение


// screen - это размер окна браузера, его можно ресайзить

let btn = document.getElementById("changeLoc");

btn.addEventListener("click", () => {
  // оба метода оставляют возможность нажать кнопку назад у браузера
  //   window.location.href = "https://google.com";
  //   window.location.assign("https://google.com");

  // нельзя нажать кнопку назад
  //   window.location.replace("https://google.com")

    // перезагрузит страницу
  //   window.location.replace() 
  //   window.location.replace(true) // перезагрузит со сбразыванием cache
});

// screen - это размер экрана

console.log('screen.width', screen.width);
console.log('screen.height', screen.height);

 //доступная ширина/высота экрана, обычно меньше из-зи боковых тул баров
console.log('screen.availWidth', screen.availWidth);
console.log('screen.availHeight', screen.availHeight);

//доступна всякая статистическая инфа о браузере, ОС и т.д.
console.log('navigator', window.navigator);

