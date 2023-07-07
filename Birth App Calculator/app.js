/************************************* UI controller *******************************/

const UIController = (function () {
  // input fields values
  return {
    addValues: function () {
      return {
        //Input
        dayInp: document.querySelector("#day_input"),
        monthInp: document.querySelector("#month_input"),
        yearInp: document.querySelector("#year_input"),
      };
    },
    updateValues: function () {
      return {
        //output
        dayOut: document.querySelector(".day_output"),
        monthOut: document.querySelector(".month_output"),
        yearOut: document.querySelector(".year_output"),
      };
    },
  };
})();

/************************************ Back controller *****************************/

const backendController = (function () {
  // add input values
  const input = UIController.addValues();
  let validator;
  // function for input field
  const valide = function () {
    let inputs = document.querySelectorAll(".input");
    let inputsArray = Array.from(inputs);
    validator;
    inputsArray.forEach((e) => {
      let parent = e.parentElement;
      if (!e.value || isNaN(e.value)) {
        e.style.borderColor = "red";
        parent.querySelector("small").innerText = "Enter the Number";
        validator = false;
      } else if (input.dayInp.value < 1 || input.dayInp.value > 31) {
        input.dayInp.style.borderColor = "red";
        input.dayInp.parentElement.querySelector("small").innerText =
          "must be valid day";
        validator = false;
      } else if (input.monthInp.value < 1 || input.monthInp.value > 12) {
        input.monthInp.style.borderColor = "red";
        input.monthInp.parentElement.querySelector("small").innerText =
          "must be valid month";
        validator = false;
      } else if (
        input.yearInp.value.length > 4 ||
        input.yearInp.value.length < 4
      ) {
        input.yearInp.style.borderColor = "red";
        input.yearInp.parentElement.querySelector("small").innerText =
          "Year must be less than current year";
        validator = false;
      } else {
        e.style.borderColor = "blue";
        parent.querySelector("small").innerText = "";
        validator = true;
      }
    });

    return validator;
  };

  // function for calculate age

  const calculateAge = function (getDay, getMonth, getYear) {
    let currentDate = new Date();

    // calculate Day , month , year
    const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // days
    // const obj =
    let day = month[currentDate.getDate()];
    let days = day - getDay;

    //month
    let months = currentDate.getMonth() - getMonth;

    // year
    let years = currentDate.getFullYear() - getYear;

    if (months < 0) {
      years--;
      Math.abs(months);
    }
    return { days: days, months: months, years: years };
  };

  // Function for updateUI
  const updateUI = function () {
    const out = UIController.updateValues();
    // for day
    const age = calculateAge(
      input.dayInp.value,
      input.monthInp.value,
      input.yearInp.value
    );
    out.dayOut.textContent = age.days;
    out.monthOut.textContent = Math.abs(age.months - 1);
    out.yearOut.textContent = age.years;
  };

  // reseting the output field
  const resetOutput = function () {
    const out = UIController.updateValues();
    out.dayOut.textContent = 0;
    out.monthOut.textContent = 0;
    out.yearOut.textContent = 0;
  };

  // clearing field
  const clearField = function () {
    const field = document.querySelectorAll(".input");
    const fieldArr = Array.from(field);
    fieldArr.forEach((e) => {
      e.value = "";
    });
  };

  // for connecting all function
  const connect = function () {
    // call the functions
    valide();
    if (validator === true) {
      // calculateAge(inputValues);
      updateUI();
    }
  };

  // public function for init
  const events = function () {
    document.querySelector(".age_calculate").addEventListener("click", (e) => {
      // e.preventDefault();
      connect();
      clearField();
    });

    //keypress
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 13 || event.which === 13) {
        connect();
        clearField();
      }
    });
  };

  return {
    init: function () {
      events();
      resetOutput();
    },
  };
})();

backendController.init();
