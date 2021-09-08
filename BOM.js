// -------    location - позволяет управлять строкой URL

let btn = document.getElementById('changeLoc');

btn.addEventListener('click', () => {
  // оба метода оставляют возможность нажать кнопку назад у браузера
  //   window.location.href = "https://google.com";
  //   window.location.assign("https://google.com");
  // нельзя нажать кнопку назад
  //   window.location.replace("https://google.com")
  // перезагрузит страницу
  //   window.location.replace()
  //   window.location.replace(true) // перезагрузит со сбразыванием cache
});

console.log('location.host', location.host); 

// ----------    screen - это размер экрана

console.log('screen.width', screen.width);
console.log('screen.height', screen.height);

//доступная ширина/высота экрана, обычно меньше из-зи боковых тул баров
console.log('screen.availWidth', screen.availWidth);
console.log('screen.availHeight', screen.availHeight);

// ----------    navigator 
//доступна всякая статистическая инфа о браузере, ОС и т.д.
console.log('navigator', window.navigator);

// ----------    history

history.length // показывает по скольким вкладкам перешел юсер в пределах одного домена

//history.back() // имитирует кнопку "назад" в браузере
//history.go(-2 || 0 || 3) // заставляет вернуться по истории на 2 шага назад/3 вперед, 0 - перезагрузит страницу

// если URL htttps://facebook.com/users,
// то replaceState подменит последнюю часть на htttps://facebook.com/friends.html
// без перезагрузки страницы
history.replaceState('some name', null, 'friends.html')

// можно подменитьцелый URL на htttps://facebook.com/friends.html без перезагрузки страницы
history.replaceState('some name', null, 'htttps://facebook.com/riends.html')

history.state