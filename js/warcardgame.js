let deckId;
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const message = document.getElementById("message");
const remaingCards = document.getElementById("remaining-cards");

//api call for random cards
function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      //display remaing cards message
      remaingCards.innerHTML = `Remaining Cards: ${data.remaining}`;
      deckId = data.deck_id;
      console.log(deckId);
    });
}

//new card deck
newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
      cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `;
      //display cards
      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      console.log(winnerText);
      //display remaing cards message
      remaingCards.innerHTML = `Remaining Cards: ${data.remaining}`;

      //checking when card runs out and disabling draw button if its true
      if (data.remaining === 0) {
        drawCardBtn.disabled = true;
      }
    });
});

//array of cards values
function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  //setting variables
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  console.log("card 1:", card1ValueIndex);
  console.log("card 2:", card2ValueIndex);

  //determine if you win or lose
  if (card1ValueIndex > card2ValueIndex) {
    return (message.innerHTML = "Top card win!");
  } else if (card1ValueIndex < card2ValueIndex) {
    return (message.innerHTML = "Bottom card win!");
  } else {
    return (message.innerHTML = "Draw!");
  }
}
