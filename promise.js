const prom = async () => {
  const getData = () => {
    return new Promise((resolve, reject) => {
      const switcher = Math.ceil(Math.random() * 10);
      console.log('switcher', switcher);
      setTimeout(() => {
        if (switcher > 4) {
          resolve('alex');
        }

        reject('Arise some error');
      }, 2000);
    });
  };

  console.log('111111111111');
  let result;
  try {
    result = await getData();
  } catch (error) {
    console.log('error', error);
  }

  console.log('result', result);
  console.log('22222222222');
  console.log('333333333333');
};

prom();
