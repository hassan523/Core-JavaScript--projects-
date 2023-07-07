"use strict";

let el, validator, val;

/************************************* Getting elements from DOM *************************/
function getEl() {
  return {
    page: document.querySelectorAll(".page"),
    circle: document.querySelectorAll(".step-num"),

    // input fields from panel 1
    input: document.querySelectorAll(".inputFeild"),
    inputName: document.getElementById("input_name"),
    inputEmail: document.getElementById("input_email"),
    inputNumber: document.getElementById("input_number"),

    // select plans from panel 2
    plan: document.querySelectorAll(".panel-2_plan"),
    switcher: document.querySelector(".slideBtn-checkbox"),
    planArcade: document.querySelector(".plan_1-price"),
    planAdvance: document.querySelector(".plan_2-price"),
    planPro: document.querySelector(".plan_3-price"),

    // services from panel 3
    service: document.querySelectorAll(".panel-3_service"),
    serviceCheck: document.querySelectorAll(".service-check"),
    servicedes: document.querySelectorAll(".service-description"),
    servicePrice: document.querySelectorAll(".service_prices"),

    // panel 4
    displayAdd: document.querySelector(".detailContainer"),
    planDetail: document.querySelector(".planDetail"),
    totalName: document.querySelector(".totals_name"),
    totalPrice: document.querySelector(".totals_price"),

    //panel 5
  };
}

let obj = {};
let currentPage = 0;
let currentStep = 0;

/*************************************** Function for Buttons *****************************/
function buttons() {
  el.page.forEach((e) => {
    let backBtn = e.querySelector(".btn_back");
    let nextBtn = e.querySelector(".btn_next");
    let changBtn = e.querySelector(".detail-btn");
    // if back btn is available
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        validation();
        if (currentPage <= 4) {
          if (validator === true) {
            // for add next page in next button
            document.querySelector(`.panel-${currentPage}`).style.display =
              "none";
            currentPage++;
            currentStep++;
            if (currentPage <= 4) {
              // for add next circle in next button
              document
                .querySelector(`.step-num-${currentStep + 1}`)
                .classList.add("step-active");
              // for add previous circle in next button
              document
                .querySelector(`.step-num-${currentStep}`)
                .classList.remove("step-active");
            }

            // current is panel-4
            if (currentPage === 5) {
              document
                .querySelector(`.step-num-4`)
                .classList.remove("step-active");
            }
            // for add next page in next button
            document.querySelector(`.panel-${currentPage}`).style.display =
              "flex";
          }
        }
      });
    }

    // if there is button change
    if (changBtn) {
      changBtn.addEventListener("click", () => {
        document.querySelector(`.panel-${currentPage}`).style.display = "none";
        document.querySelector(".panel-2").style.display = "flex";
        currentPage = 2;
        currentStep = 1;
        // for add current circle in back button
        document.querySelector(`.step-num-2`).classList.add("step-active");
        // // for removing next circle in back button
        document.querySelector(`.step-num-4`).classList.remove("step-active");
      });
    }

    // if back button is available
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        // for removing current page in back button
        document.querySelector(`.panel-${currentPage}`).style.display = "none";

        // for add current circle in back button
        document
          .querySelector(`.step-num-${currentStep}`)
          .classList.add("step-active");
        // for removing next circle in back button
        document
          .querySelector(`.step-num-${currentStep + 1}`)
          .classList.remove("step-active");
        currentPage--;
        currentStep--;

        // for add next page in back button
        document.querySelector(`.panel-${currentPage}`).style.display = "flex";
      });
    }
  });
}

/************************************* function for validation ************************/
function validation() {
  validator;
  el.input.forEach((e) => {
    // if input has no values
    if (!e.value) {
      e.parentElement.querySelector("small").innerHTML = "Enter The Details";
      e.style.borderColor = "red";
      return (validator = false);
    }
    // if Name input has numbers
    else if (!isNaN(el.inputName.value)) {
      el.inputName.parentElement.querySelector("small").innerHTML =
        "Please Enter The Name";
      el.inputName.style.borderColor = "red";
      return (validator = false);
    }
    // if number input has any alphabats
    else if (isNaN(el.inputNumber.value)) {
      el.inputNumber.parentElement.querySelector("small").innerHTML =
        "Please Enter The Name";
      el.inputNumber.style.borderColor = "red";
      return (validator = false);
    }
    // if everything is correct
    else {
      e.parentElement.querySelector("small").innerHTML = "";
      e.style.borderColor = "black";
      return (validator = true);
    }
  });
}

/************************************* function select plan ****************************/
function selectPlan() {
  // for remove class and select things from second panel
  el.plan.forEach((e) => {
    e.addEventListener("click", () => {
      document.querySelector(".plan-active").classList.remove("plan-active");
      e.classList.add("plan-active");
      const name = e.querySelector("b").innerHTML;
      const price = e.querySelector("p").innerHTML;
      obj.PlanName = name;
      obj.planPrice = price;
      clearPlan();
      showPlan(obj);
      totalPrice();
    });
  });

  // for switcher button on secon panel
  el.switcher.addEventListener("click", () => {
    // check if switch is true or false
    let switcherCondition = el.switcher.checked ? true : false;
    obj.kind = switcherCondition;

    if (switcherCondition === true) {
      document
        .querySelector(".slideBtn-month")
        .classList.toggle("slideBTn-active");
      document
        .querySelector(".slideBtn-year")
        .classList.toggle("slideBTn-active");
    } else if (switcherCondition === false) {
      document
        .querySelector(".slideBtn-month")
        .classList.toggle("slideBTn-active");
      document
        .querySelector(".slideBtn-year")
        .classList.toggle("slideBTn-active");
    }

    // if switch btn then change values
    if (switcherCondition === true) {
      el.planArcade.innerHTML = "$90/yr";
      el.planAdvance.innerHTML = "$120/yr";
      el.planPro.innerHTML = "$150/yr";
      el.totalName.innerHTML = "Total (per year)";
      el.totalPrice.innerHTML = "$120/yr";
      clearPlan();
    } else if (switcherCondition === false) {
      el.planArcade.innerHTML = "$9/mo";
      el.planAdvance.innerHTML = "$12/mo";
      el.planPro.innerHTML = "$15/mo";
      el.totalName.innerHTML = "Total (per month)";
      el.totalPrice.innerHTML = "$12/mo";
    }

    // if there is no plan
    if (document.querySelector(".planDetail")?.textContent === "") {
      document.querySelector(".planDetail").textContent =
        "Please select your plan first";
    }
  });
}

/************************************* function for select services ************************/
function services() {
  el.service.forEach((e) => {
    e.addEventListener("click", () => {
      // check "addCheck" is ture  or false
      let addCheck = e.querySelector(".service-check");

      // if addcheck is true
      if (addCheck.checked) {
        addCheck.checked = false;
        e.classList.remove("active-service");
      }
      // if addcheck is not false
      else {
        addCheck.checked = true;
        e.classList.add("active-service");
        obj.servicename = e.querySelector(".service_name").innerHTML;
        obj.serviceprice = e.querySelector(".service_prices").innerHTML;
        showAddons(obj);
        totalPrice();
      }
    });
  });
}

/************************************* function for show addons ************************/
function showAddons(addItems) {
  let markup = `
  <div class="serviceDetail">
    <p class="serviceDetail-name">${addItems.servicename}</p>
    <p class="serviceDetail-price">${addItems.serviceprice}</p>
  </div>`;
  el.displayAdd.insertAdjacentHTML("beforeend", markup);
}

/************************************* function for show plan ************************/
function showPlan(planItems) {
  let markupTwo = `
      <div class="detailNames">
        <p>${
          planItems.kind === true
            ? planItems.PlanName + " (yearly)"
            : planItems.PlanName + " (monthly)"
        }
        </p>
        <b class="planDetail_price">${planItems.planPrice}</b>
      </div>`;
  el.planDetail.insertAdjacentHTML("beforeend", markupTwo);
}

/************************************* function for clear plan *************************/
function clearPlan() {
  el.planDetail.innerHTML = "";
}

/************************************* function for clear field ************************/
function clearField() {
  el.input.forEach((e) => {
    e.value = "";
  });
}

/************************************* function for totals ************************/
function totalPrice() {
  // total value
  let total = 0;

  //element of plan price
  const planDetailPriceEl = document.querySelector(".planDetail_price");
  const planAddPrice = planDetailPriceEl.textContent;
  const planDetailPriceNum = Number(planAddPrice.replace(/\D/g, ""));

  //element of service price
  const servicetotalPriceEl = document.querySelectorAll(".serviceDetail-price");

  // loop for add price of service price
  [...servicetotalPriceEl].forEach((e) => {
    const serviceAddPrice = e.innerHTML;
    const servicePriceNum = Number(serviceAddPrice.replace(/\D/g, ""));
    total += servicePriceNum;
  });
  const subTotal = total + Number(planDetailPriceNum);
  el.totalPrice.innerHTML = `$${subTotal}/${obj.kind === true ? "yr" : "mo"}`;
}

/************************************* init function ***********************************/
function init() {
  // get el from DOM
  document.querySelector(".panel-1").style.display = "flex";
  document.querySelector(".panel-3_service").classList.remove("active-service");

  // reset pages
  currentPage = 1;
  currentStep = 0;

  // init the functions
  el = getEl();
  clearField();
  buttons();
  selectPlan();
  services();

  // reset the switcher
  val = el.switcher.checked = false;
}
init();
