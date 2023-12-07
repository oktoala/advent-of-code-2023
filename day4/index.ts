const path = "./input.txt";
const file = Bun.file(path);

const lineText = await file.text();

const cards = lineText.split("\n").filter((v) => !!v);

type Cards = Record<string, number>;
const c: Cards = {};

cards.forEach((card, i) => {
  const cardNumber = i + 1;
  const cardSplit = card.split("|");

  console.log(`Kartu-${cardNumber}`);

  if (!c[cardNumber] === undefined) {
    c[cardNumber] = 0;
  }

  const leftCards = cardSplit[0]
    .split(":")[1]
    .split(" ")
    .filter((v) => !!v);

  const rightCards = cardSplit[1]
    .normalize()
    .split(" ")
    .filter((v) => !!v);

  let score = 0;

  // Looping Kartu Extra
  for (let indexx = 0; indexx < c[cardNumber]; indexx++) {
    let scoreExtra = 0;
    rightCards.forEach((card) => {
      if (leftCards.includes(card)) {
        scoreExtra += 1;
      }
    });

    for (let index = 0; index < scoreExtra; index++) {
      if (!c[cardNumber + index + 1]) {
        c[cardNumber + index + 1] = 0;
      }
      c[cardNumber + index + 1] += 1;
    }
  }

  // Looping Kartu Original
  rightCards.forEach((card) => {
    if (leftCards.includes(card)) {
      score += 1;
    }
  });

  // Ngitung udah berapa yang menang
  for (let index = 0; index < score; index++) {
    if (!c[cardNumber + index + 1]) {
      c[cardNumber + index + 1] = 0;
    }
    c[cardNumber + index + 1] += 1;
  }

  if (!c[cardNumber]) {
    c[cardNumber] = 0;
  }
  c[cardNumber] += 1;

  console.log(`End of Kartu-${cardNumber}`);
});

const answer = Object.keys(c).reduce((a, b) => a + c[b], 0);

console.log(answer);
