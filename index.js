const baseURL = "https://deckofcardsapi.com/api/deck";
let deckId;

// Click a button to draw a card.
document.querySelector(".btn").addEventListener("click", () => {
  if (!deckId) {
    console.error("Error when creating deck.");
  }

  axios
    .get(`${baseURL}/${deckId}/draw/?count=1`)
    .then((res) => {
      // Disable the draw btn when no cards left.
      if (res.data.remaining === 0) {
        document.querySelector(".btn").classList.add("d-none");
        alert("No more cards left in the deck.");
        return;
      }

      const card = res.data.cards[0];
      console.log(card);

      console.log(`${card.value} of ${card.suit}`);

      const img = document.createElement("img");
      img.src = card.image;

      // apply a slight random rotation and translate for each card
      const deg = Math.random() * 90 - 45;
      const offSetX = Math.random() * 90 - 45;
      const offSetY = Math.random() * 45;
      img.style.position = "absolute";
      img.style.transform = `translate(${offSetX}px, ${offSetY}px) rotate(${deg}deg)`;

      document.querySelector(".card-display").appendChild(img);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a new deck when page loads.
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${baseURL}/new/shuffle/?deck_count=1`)
    .then((res) => {
      deckId = res.data.deck_id;
    })
    .catch((err) => {
      console.error("Error when creating deck: ", err);
    });
});
