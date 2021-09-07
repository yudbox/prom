let arr = [2, 7, -9, 12, 13, -15];

let result = arr.reduce((accum, elem, index) => {
  if (elem > 0) {
    if (accum["numbers"]) {
      accum["numbers"].push(elem);
      accum["positiveIndex"].push(index);
    } else {
      accum["numbers"] = [elem];
      accum["positiveIndex"] = [index];
    }
    return accum;
  }

  return accum;
}, {});

console.log("result", result);
