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
  if (value === "J") return 11;
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

// Fiveofkind: 5, FourOfKind: 4, Full House: 3.5, ThreeOfKind: 3, Two Pair: 2, One Pair: 1, HighCard: 0.5
const kind = (card: string) => {
  const data: Record<string, string[]> = {};
  const cards = card.split("");

  cards.forEach((c, i) => {
    if (!data[c]) {
      data[c] = [];
    }
    data[c].push(c);
  });
  const len = Object.keys(data).length;

  if (len === 1 && Object.keys(data).some((d) => data[d].length === 5)) {
    return { value: 5, data: cards };
  }

  if (Object.keys(data).some((d) => data[d].length === 4)) {
    return { value: 4, data: cards };
  }

  if (len === 2 && Object.keys(data).some((d) => data[d].length === 3)) {
    return { value: 3.5, data: cards };
  }

  if (len > 2 && Object.keys(data).some((d) => data[d].length === 3)) {
    return { value: 3, data: cards };
  }

  if (len === 3) {
    return { value: 2, data: cards };
  }

  if (len === 4) {
    return { value: 1, data: cards };
  }

  return { value: 0.5, data: cards };
};

let arrs: string[][] = [];
ranges.forEach(([card, bid], i) => {
  const { value: kindCard } = kind(`${card}`);
  if (i === 0) {
    arrs.push([`${kindCard}`, card, bid]);
    return;
  }

  const { value: curr, data: dataCurr } = kind(card);
  for (let ii = 0; ii <= Math.floor(arrs.length / 2); ii++) {
    const startIndex = 0 + ii;
    const endIndex = arrs.length - 1 - ii;
    const { value: start, data: dataStart } = kind(arrs[startIndex][1]);
    const { value: end, data: dataEnd } = kind(arrs[endIndex][1]);
    const v = [`${kindCard}`, card, bid];

    if (curr < start) {
      arrs.splice(startIndex, 0, v);
      break;
    }

    if (curr > end) {
      arrs.splice(endIndex + 1, 0, v);
      break;
    }

    if (curr === start) {
      const vv = battleCard(dataCurr, dataStart);
      if (!vv) {
        arrs.splice(startIndex, 0, v);
        break;
      }
    }

    if (curr === end) {
      const vv = battleCard(dataCurr, dataEnd);

      if (vv) {
        arrs.splice(endIndex + 1, 0, v);
        break;
      }
    }
  }
});

const answer = arrs.reduce((a, b, i) => a + Number(b[2]) * (i + 1), 0);

// console.log(arrs);
console.log(answer);
