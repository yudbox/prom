let form = document.forms.userform;
let forms = document.forms;
let fieldset = form.userFields;
let slectform = forms[1];
//we can set any option value in select

// slectform.select.options[1].selected = true;
// let optionNext = new Option("Текст", "value", true, false);
// slectform.select.options[3] = optionNext;
//other way to set option value in select
// select.selectedIndex = 2;
// select.value = 'banana';

// console.log("form", form);
// console.log("forms", forms);
// console.log("fieldset", fieldset);
// console.log("slectform", slectform);

let elem = form.elements.usercheckbox;
// console.log("elem usercheckbox", elem.checked);
// let form2 = document.getElementById("userform");
// console.log("form2", form2);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("e", e.target.userform);

  const fomData = new FormData(e.target.fieldset);

  console.log("this", this);
  console.log("fomData", fomData);
});
