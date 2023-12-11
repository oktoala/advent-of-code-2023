const path = "./input.txt";
const file = Bun.file(path);

const lineText = await file.text();
const ranges = lineText
  .split("\n")
  .filter((v) => !!v)
  .map((v) => v.split(" "));

function card(value: string): number {
  if (!isNaN(Number(value))) {
    return Number(value);
  }

  if (value === "T") return 10;
  if (value === "J") return 1;
  if (value === "Q") return 12;
  if (value === "K") return 13;
  if (value === "A") return 14;

  return 0;
}

function battleCard(current: string[], enemy: string[]) {
  for (let i = 0; i < current.length; i++) {
    if (card(current[i]) > card(enemy[i])) {
      return true;
    } else if (card(current[i]) < card(enemy[i])) {
      return false;
    }
  }
  return false;
}

const getCardObject = (cards: string[]) => {
  const data: Record<string, string[]> = {};
  cards.forEach((c, i) => {
    if (!data[c]) {
      data[c] = [];
    }
    data[c].push(c);
  });
  const c = Object.keys(data).reduce((a, b) => {
    const d = !!a ? data[a].length : 0;
    return d >= data[b].length ? a : b;
  }, undefined);
  return c;
};

// Fiveofkind: 5, FourOfKind: 4, Full House: 3.5, ThreeOfKind: 3, Two Pair: 2, One Pair: 1, HighCard: 0.5
const kind = (card: string) => {
  const hasJoker = card.includes("J");
  const replacedCard = getCardObject(card.split("").filter((v) => v !== "J"));
  const cardd =
    hasJoker && replacedCard ? card.replaceAll("J", replacedCard) : card;
  const data: Record<string, string[]> = {};
  const cards = cardd.split("");

  cards.forEach((c, i) => {
    if (!data[c]) {
      data[c] = [];
    }
    data[c].push(c);
  });

  const len = Object.keys(data).length;

  if (len === 1 && Object.keys(data).some((d) => data[d].length === 5)) {
    return { value: 5, data: cards, card: cardd };
  }

  if (Object.keys(data).some((d) => data[d].length === 4)) {
    return { value: 4, data: cards, card: cardd };
  }

  if (len === 2 && Object.keys(data).some((d) => data[d].length === 3)) {
    return { value: 3.5, data: cards, card: cardd };
  }

  if (len > 2 && Object.keys(data).some((d) => data[d].length === 3)) {
    return { value: 3, data: cards, card: cardd };
  }

  if (len === 3) {
    return { value: 2, data: cards, card: cardd };
  }

  if (len === 4) {
    return { value: 1, data: cards, card: cardd };
  }

  return { value: 0.5, data: cards, card: cardd };
};

let arrs: string[][] = [];
ranges.forEach(([cards, bid], i) => {
  const { value: kindCard, card } = kind(`${cards}`);
  if (i === 0) {
    arrs.push([`${kindCard}`, cards, bid]);
    return;
  }

  const { value: curr, data: dataCurr } = kind(card);
  for (let ii = 0; ii <= Math.floor(arrs.length / 2); ii++) {
    const startIndex = 0 + ii;
    const endIndex = arrs.length - 1 - ii;
    const { value: start, data: dataStart } = kind(arrs[startIndex][1]);
    const { value: end, data: dataEnd } = kind(arrs[endIndex][1]);
    const v = [`${kindCard}`, cards, bid];

    if (curr < start) {
      arrs.splice(startIndex, 0, v);
      break;
    }

    if (curr > end) {
      arrs.splice(endIndex + 1, 0, v);
      break;
    }

    if (curr === start) {
      const vv = battleCard(cards.split(""), arrs[startIndex][1].split(""));
      if (!vv) {
        arrs.splice(startIndex, 0, v);
        break;
      }
    }

    if (curr === end) {
      const vv = battleCard(cards.split(""), arrs[endIndex][1].split(""));

      if (vv) {
        arrs.splice(endIndex + 1, 0, v);
        break;
      }
    }
  }
});

const answer = arrs.reduce((a, b, i) => a + Number(b[2]) * (i + 1), 0);

console.log(arrs);
console.log(answer);
