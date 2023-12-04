const fs = require("node:fs");

const strNums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function strNumtoInt(str) {
  return strNums[str.toLowerCase()];
}

const isNum = (n) => !isNaN(Number(n));

const digitss = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function main() {
  try {
    // Read File
    const data = fs.readFileSync("./input.txt", "utf8");
    const lines = data
      .toString()
      .split("\n")
      .filter((v) => !!v);

    let answer = 0;

    lines.forEach((line) => {
      const digits = [];
      const l = line.split("");

      l.forEach((ll, i) => {
        if (isNum(ll)) {
          digits.push(ll);
        }

        digitss.forEach((d, ii) => {
          if (line.substring(i).startsWith(d)) {
            digits.push(`${ii + 1}`);
          }
        });
      });
      answer += Number(
        `${Number(digits[0])}${Number(digits[digits.length - 1])}`
      );
    });
    console.log(answer);
  } catch (err) {
    console.error(err);
  }
}

main();
