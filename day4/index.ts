const path = "./test.txt";
const file = Bun.file(path);

const lineText = await file.text();

const cards = lineText.split("\n").filter((v) => !!v);

let answer = 0;
cards.forEach((card, i) => {
  const cardNumber = i + 1;
  console.log(cardNumber);
  const cardSplit = card.split("|");

  const leftCards = cardSplit[0]
    .split(":")[1]
    .split(" ")
    .filter((v) => !!v);

  const rightCards = cardSplit[1]
    .normalize()
    .split(" ")
    .filter((v) => !!v);

  let score = 0;
  rightCards.forEach((card) => {
    if (leftCards.includes(card) && score === 0) {
      score += 1;
    } else if (leftCards.includes(card) && score > 0) {
      score *= 2;
    }
  });

  answer += score;
});

console.log(answer);
