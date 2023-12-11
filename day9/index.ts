const path = "./input.txt";
const file = Bun.file(path);

const lineText = await file.text();

const histories = lineText
  .split("\n")
  .filter((v) => !!v)
  .map((v) => v.split(" ").map((vv) => Number(vv)));

const sums: number[] = [];
histories.some((history, i) => {
  let s = 0;
  const nextHistories: number[][] = [];
  nextHistories.push(history);

  let notFoundZero = true;
  let index = 0;

  while (notFoundZero) {
    for (let ii = index; ii < nextHistories.length; ii++) {
      const h = nextHistories[ii];
      const next: number[] = [];
      for (let j = 0; j < h.length - 1; j++) {
        const l = h[j];
        const r = h[j + 1];

        const n = r - l;
        next.push(n);
      }

      nextHistories.push(next);

      const v = next.reduce((a, b) => a + b, 0);
      if (v === 0) {
        notFoundZero = false;
        break;
      }
    }
    index += 1;
  }

  for (let j = nextHistories.length - 1; j >= 0; j--) {
    s = nextHistories[j][0] - s;
  }
  sums.push(s);
});
const answer = sums.reduce((a, b) => a + b, 0);
console.log(answer);
