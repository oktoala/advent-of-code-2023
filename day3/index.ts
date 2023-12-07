const path = "./input.txt";
const file = await Bun.file(path);

const lineText = await file.text();

const lines = lineText.split("\n").filter((v) => !!v);

function isNumber(num: string) {
  return !isNaN(Number(num));
}

function isSymbol(str: string) {
  const v = str === "*";
  return v;
}

type Star = Record<string, number[]>;

const schemas: number[] = [];
let currStar: Star = {};
lines.forEach((line, i) => {
  const prevLine = i - 1 < 0 ? undefined : lines[i - 1].split("");
  const nextLine =
    i + 1 > lines.length - 1 ? undefined : lines[i + 1].split("");

  const words = line.split("");

  let findSymbol = false;
  let startIndex: number | null = null;
  const bandIndex: number[] = [];
  words.forEach((letter, ii) => {
    let location: string | null = null;
    let tempCurrStar: Star = {};
    const isLefter = ii === 0;
    const isRighter = ii === words.length - 1;

    const prev = ii - 1 < 0 ? undefined : words[ii - 1];
    const next = ii + 1 > lines.length - 1 ? undefined : words[ii + 1];

    if (isNumber(letter) && !findSymbol && !bandIndex.includes(ii)) {
      if (startIndex === null) {
        startIndex = ii;
      }

      if (prev && !findSymbol) {
        location = `${i}-${ii - 1}`;
        findSymbol = isSymbol(prev);

        if (prevLine && !findSymbol) {
          findSymbol = isSymbol(prevLine[ii - 1]);
          location = `${i - 1}-${ii - 1}`;
        }

        if (nextLine && !findSymbol) {
          findSymbol = isSymbol(nextLine[ii - 1]);
          location = `${i + 1}-${ii - 1}`;
        }
      }

      if (prevLine && !findSymbol) {
        findSymbol = isSymbol(prevLine[ii]);
        location = `${i - 1}-${ii}`;
      }

      if (nextLine && !findSymbol) {
        findSymbol = isSymbol(nextLine[ii]);
        location = `${i + 1}-${ii}`;
      }

      if (next && !findSymbol) {
        findSymbol = isSymbol(next);
        location = `${i}-${ii + 1}`;

        if (prevLine && !findSymbol) {
          findSymbol = isSymbol(prevLine[ii + 1]);
          location = `${i - 1}-${ii + 1}`;
        }

        if (nextLine && !findSymbol) {
          findSymbol = isSymbol(nextLine[ii + 1]);
          location = `${i + 1}-${ii + 1}`;
        }
      }
    } else {
      findSymbol = false;
      startIndex = null;
    }

    if (startIndex !== null && findSymbol && !!location) {
      let temp = "";
      const vv = line.substring(startIndex).split("");
      if (location === "1136") {
        console.log(line);
      }

      vv.some((v, j) => {
        if (!isNumber(v)) return true;
        temp += v;
        if (startIndex) {
          bandIndex.push(startIndex + j);
        }
      });
      schemas.push(Number(temp));
      if (!currStar[location]) {
        currStar[location] = [];
      }
      currStar[location] = [...currStar[location], Number(temp)];
      if (location === "1136") {
        // console.log(line);
        console.log(i, ii);
        console.log(location);
      }
    }
  });
});

const ger = Object.keys(currStar)
  .filter((k) => currStar[k].length > 1)
  .reduce((obj, key) => {
    return obj + currStar[key].reduce((a, b) => a * b);
  }, 0);

console.log(ger);
Bun.write("./output.txt", schemas.join("\n"));
// console.log(schemas);
const answer = schemas.reduce((a, b) => a + b, 0);
// console.log(answer);
