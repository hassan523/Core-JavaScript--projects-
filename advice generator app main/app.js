// DOM munipulation
const btn = document.querySelector(".next_btn");
const advicesNumber = document.querySelector(".advice_no");
const displayAdvices = document.querySelector(".advice");

// constructor funtion
class ADVICE {
  constructor(query) {
    this.query = query;
  }
  async getAdvice() {
    const res = await fetch(`https://api.adviceslip.com/advice/${this.query}`);
    const conRes = await res.json();
    this.storeAdvice = conRes.slip.advice;
    this.id = conRes.slip.id;
  }
  catch(error) {
    console.log(error);
  }
}

// display advice on UI
function displayAdvice(item) {
  let markupOne = `<p>"${item.storeAdvice}"</p>`;
  displayAdvices.insertAdjacentHTML("beforeend", markupOne);
  let markupTwo = `<p>advice #${item.id}</p>`;
  advicesNumber.insertAdjacentHTML("beforeend", markupTwo);
}

// clear advice innerhtml
function clearAdvice() {
  displayAdvices.innerHTML = "";
  advicesNumber.innerHTML = "";
}

// call constructor funtion
let query = 1;
let advice = new ADVICE(query);
let runAdvice = advice.getAdvice();

// btn for change advice
btn.addEventListener("click", () => {
  query++;
  // update query with the new value of q
  advice.query = query;
  // fetch new advice with the updated query
  advice.getAdvice();

  // call functions
  clearAdvice();
  displayAdvice(advice);
});
