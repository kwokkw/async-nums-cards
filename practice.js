let baseURL = "http://numbersapi.com";
const container = document.querySelector(".container");

// ===========================================
// PART 1: STEP 1 & 2
// ===========================================
axios
  .get(`${baseURL}/1..3,10?json`)
  .then((res) => {
    for (let number in res.data) {
      const fact = res.data[number];
      const el = document.createElement("p");
      el.innerText = fact;
      container.appendChild(el);
    }
  })
  .catch((err) => {
    console.log(err);
  });

// ===========================================
// PART 1: STEP 3
// ===========================================
let fourNumberPromises = [];
for (let i = 1; i < 5; i++) {
  fourNumberPromises.push(axios.get(`${baseURL}/22`));
}

Promise.all(fourNumberPromises)
  .then((numberArr) => {
    for (let res of numberArr) {
      console.log(res.data);
      const fact = res.data;
      const el = document.createElement("p");
      el.innerText = fact;
      container.appendChild(el);
    }
  })
  .catch((err) => console.log(err));

// ===========================================
// PART 2: STEP 1
// ===========================================
baseURL = "https://deckofcardsapi.com/api/deck";

// Step 1: Draw a single card from a newly shuffled deck
axios
  .get(`${baseURL}/new/draw/?count=1`)
  .then((res) => {
    const card = res.data.cards[0]; // The drawn card
    console.log(res);
    console.log(`${card.value} of ${card.suit}`); // Log value and suit
  })

  .catch((err) => console.log("Error:", err));

// ===========================================
// PART 2: STEP 2
// ===========================================
axios
  .get(`${baseURL}/new/draw/?count=1`)
  .then((res) => {
    const card1 = res.data.cards[0];
    const value = card1.value;
    const suit = card1.suit;
    const deckId = res.data.deck_id;
    console.log(`${value} of ${suit}`);
    return axios.get(`${baseURL}/${deckId}/draw/?count=1`);
  })
  .then((res) => {
    const card2 = res.data.cards[0];
    const value = card2.value;
    const suit = card2.suit;
    console.log(`${value} of ${suit}`);
  })
  .catch((err) => console.log("Error:", err));

let p1 = axios.get(`${baseURL}/5`);
let p2 = axios.get(`${baseURL}/10`);
let p3 = axios.get(`${baseURL}/15`);

Promise.all([p1, p2, p3]).then((arr) => {
  for (let res of arr) {
    console.log(res);
  }
});
