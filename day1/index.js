const fs = require("node:fs");

try {
  // Read File
  const data = fs.readFileSync("./input.txt", "utf8");
  const array = data
    .toString()
    .split("\n")
    .filter((v) => !!v);
  console.log(array);

  const r = /\d/g;

  const arrayDigits = array.map((v) => {
    const digits = v.match(r);
    if (v.length === 1) {
      return Number(`${digits[0]}${digits[0]}`);
    }
    return Number(`${digits[0]}${digits[digits.length - 1]}`);
  });

  console.log(arrayDigits);

  const sum = arrayDigits.reduce((a, b) => a + b, 0);

  console.log(sum);
} catch (err) {
  console.error(err);
}
