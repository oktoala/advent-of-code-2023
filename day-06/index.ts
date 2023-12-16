const path = "./input.txt";
const file = Bun.file(path);

const lineText = await file.text();

const arr = lineText
  .split("\n")
  .filter((v) => !!v)
  .map((v) => v.match(/\d+/g)?.map((vv) => Number(vv)));

let range: number[][] = [];
arr.forEach((a, i) => {
  a?.forEach((aa, ii) => {
    range.push([]);
    range[ii].push(aa);
  });
});

range = range.filter((v) => v.length !== 0);

const arrayAmount: number[] = [];
range.some(([time, beatDistance]) => {
  let amount = 0;
  for (let hold = 0; hold <= Math.floor(time / 2); hold++) {
    const move = time - hold;
    const distance = hold * move;

    if (distance > beatDistance) {
      amount += 2;
    }
  }
  if (time % 2 === 0) {
    amount -= 1;
  }
  arrayAmount.push(amount);
});
console.log(arrayAmount);
const answer = arrayAmount.reduce((a, b) => a * b, 1);
console.log(answer);

// Part 2
const [time, beatDistance] = arr
  .map((v) => v?.join(""))
  .map((vv) => Number(vv));

const newAmounts: number[] = [];
let newAmount = 0;
for (let hold = 0; hold <= Math.floor(time / 2); hold++) {
  const move = time - hold;
  const distance = hold * move;

  if (distance > beatDistance) {
    newAmount += 2;
  }
}
if (time % 2 === 0) {
  newAmount -= 1;
}
newAmounts.push(newAmount);
console.log(newAmounts[0]);
