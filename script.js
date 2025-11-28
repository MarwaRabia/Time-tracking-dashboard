const buttons = document.querySelectorAll("[data-tf]");
let allData = [];

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    createCards(allData);
    updateCards("weekly");
  });

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    updateCards(btn.dataset.tf);
  });
});

function createCards(data) {
  const container = document.querySelector(".container");
  data.forEach((item) => {
    const className = item.title.toLowerCase().replace(" ", "-");
    const card = document.createElement("div");
    card.classList.add("card", `card-${className}`);
    card.innerHTML = `
      <div class="card-top">&nbsp;</div>
      <div class="card-content">
        <div class="card-header">
          <h2>${item.title}</h2>
          <img src="images/icon-ellipsis.svg" alt="dots">
        </div>
        <div class="card-body">
          <h3 class="current"></h3>
          <p class="previous"></p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateCards(period) {
  const periodText = {
    daily: "Day",
    weekly: "Week",
    monthly: "Month",
  };
  allData.forEach((item) => {
    const className = item.title.toLowerCase().replace(" ", "-");
    const card = document.querySelector(`.card-${className}`);
    card.querySelector(
      ".current"
    ).textContent = `${item.timeframes[period].current}hrs`;
    card.querySelector(
      ".previous"
    ).textContent = `Last ${periodText[period]} - ${item.timeframes[period].previous}hrs`;
  });
}
