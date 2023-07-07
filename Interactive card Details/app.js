// importing inputFields
const input = document.querySelectorAll(".input");
const inputName = document.getElementById("nameInput");
const inputNum = document.getElementById("cardInput");
const inputDay = document.getElementById("expDateInput");
const inputYear = document.getElementById("expYearInput");
const inputCvc = document.getElementById("cvcInput");

// importing button
const sumbit = document.querySelector(".add-info");

// importing output element
const outputName = document.querySelector(".outputName");
const outputNum = document.querySelector(".outputNum");
const outputExpDate = document.querySelector(".outputExpDate");
const outputExpYear = document.querySelector(".outputExpYear");
const outputCvc = document.querySelector(".Cvc");

// importing sides
const right = document.querySelector(".rightSide");
const lastPage = document.querySelector(".lastpage");

/************************************* functions *********************************/

let validator = true;

// for validation function
function validation() {
  validator;
  input.forEach((e) => {
    let parent = e.parentElement;
    if (!e.value) {
      e.style.borderColor = "red";
      parent.querySelector("small").textContent = "fill the detailes please";
      return (validator = false);
    } else if (!isNaN(inputName.value)) {
      inputName.style.borderColor = "red";
      inputName.parentElement.querySelector("small").textContent =
        "alphabets only";
      return (validator = false);
    } else if (inputNum.value.length > 19 || inputNum.value.length < 19) {
      inputNum.style.borderColor = "red";
      inputNum.parentElement.querySelector("small").textContent =
        "enter the valid card number";
      return (validator = false);
    } else if (isNaN(inputDay.value)) {
      inputDay.style.borderColor = "red";
      inputDay.parentElement.querySelector("small").textContent =
        "Enter the date";
      return (validator = false);
    } else if (inputDay.value > 31 || inputDay.value < 1) {
      inputDay.style.borderColor = "red";
      inputDay.parentElement.querySelector("small").textContent =
        "Enter the valid date";
      return (validator = false);
    } else if (isNaN(inputYear.value)) {
      inputYear.style.borderColor = "red";
      inputYear.parentElement.querySelector("small").textContent =
        "Enter the year";
      return (validator = false);
    } else if (inputYear.value.length > 4 || inputYear.value.length < 4) {
      inputYear.style.borderColor = "red";
      inputYear.parentElement.querySelector("small").textContent =
        "Enter the valid year";
      return (validator = false);
    } else if (isNaN(inputCvc.value)) {
      inputCvc.style.borderColor = "red";
      inputCvc.parentElement.querySelector("small").textContent =
        "Enter the cvc number";
      return (validator = false);
    } else if (inputCvc.value.length > 3 || inputCvc.value.length < 3) {
      inputCvc.style.borderColor = "red";
      inputCvc.parentElement.querySelector("small").textContent =
        "number must be 3 digit";
      return (validator = false);
    } else {
      e.style.borderColor = "Blue";
      parent.querySelector("small").textContent = "";
      return (validator = true);
    }
  });
}

// get values from input
function getValues() {
  if (validator === true) {
    let obj = {
      Name: inputName.value,
      Number: inputNum.value,
      ExpDate: inputDay.value,
      ExpYear: inputYear.value,
      Cvc: inputCvc.value,
    };
    return obj;
  }
}

// clear fields
function clearFiedls() {
  const field = document.querySelectorAll(".input");
  const fieldArr = Array.from(field);
  fieldArr.forEach((e) => {
    e.value = "";
  });
}

// function for sumbition
function sumbition() {
  const values = getValues();
  outputName.innerHTML = values.Name;
  outputNum.innerHTML = values.Number;
  outputExpDate.innerHTML = values.ExpDate;
  outputExpYear.innerHTML = values.ExpYear;
  outputCvc.innerHTML = values.Cvc;
  clearFiedls();
  right.classList.add("remove");
  lastPage.classList.add("addLastPage");
}

// functions for init
function init() {
  validation();
  sumbition();
}

// function for events
function events() {
  // for click
  sumbit.addEventListener("click", init);

  //for enter
  document.addEventListener("keypress", (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      init();
    }
  });

  // for card input
  inputNum.addEventListener("input", (event) => {
    const input = event.target.value.replace(/\s/g, "");
    const regex = /(\d{1,4})/g;
    const groups = [];
    console.log(groups);
    let match;
    while ((match = regex.exec(input))) {
      groups.push(match[1]);
    }
    event.target.value = groups.join(" ");
  });
}
events();
