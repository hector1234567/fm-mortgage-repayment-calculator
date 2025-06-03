const form = document.querySelector(".form");
const clearBtn = document.querySelector(".calculator__clear-btn");
const results = document.querySelector(".results");
const mortgageMonth = document.querySelector(".results__monthly span");
const mortgageTotal = document.querySelector(".results__total span");

function clearAll() {
  form.reset();
  results.classList.remove("submitted");
}

function submitForm(ev) {
  ev.preventDefault();

  const dataArr = [...new FormData(this)];
  const data = Object.fromEntries(dataArr);
  calculateMortgage(data);
  results.classList.add("submitted");
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

function formatNumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function typeRepayment(amount, months, monthInterest) {
  return (
    (Number(amount) * monthInterest * (1 + monthInterest) ** months) /
    ((1 + monthInterest) ** months - 1)
  );
}

function typeInterestOnly(amount, monthInterest) {
  return Number(amount) * monthInterest;
}

function calculateMortgage({ amount, term, interest, type }) {
  const monthInterest = Number(interest) / 1200;
  const months = Number(term) * 12;

  let monthly;
  if (type === "repayment") {
    monthly = typeRepayment(amount, months, monthInterest);
  } else {
    monthly = typeInterestOnly(amount, monthInterest);
  }

  mortgageMonth.innerHTML = formatNumberWithCommas(monthly.toFixed(2));
  mortgageTotal.innerHTML = formatNumberWithCommas(
    (monthly * months).toFixed(2)
  );
}

(function init() {
  clearBtn.addEventListener("click", clearAll);
  form.addEventListener("submit", submitForm);
})();
