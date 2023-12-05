const path = "./input.txt";
const file = await Bun.file(path);

const lineText = await file.text();

const lines = lineText.split("\n").filter((v) => !!v);

function isNumber(num: string) {
  return !isNaN(Number(num));
}

function isSymbol(str: string) {
  const v = !isNumber(str) && str !== ".";
  return v;
}

const schemas: number[] = [];
lines.forEach((line, i) => {
  const prevLine = i - 1 < 0 ? undefined : lines[i - 1].split("");
  const nextLine =
    i + 1 > lines.length - 1 ? undefined : lines[i + 1].split("");

  const words = line.split("");

  let findSymbol = false;
  let startIndex: number | null = null;
  const bandIndex: number[] = [];
  words.forEach((letter, ii) => {
    const isLefter = ii === 0;
    const isRighter = ii === words.length - 1;

    const prev = ii - 1 < 0 ? undefined : words[ii - 1];
    const next = ii + 1 > lines.length - 1 ? undefined : words[ii + 1];

    if (isNumber(letter) && !findSymbol && !bandIndex.includes(ii)) {
      if (startIndex === null) {
        startIndex = ii;
      }

      if (prev && !findSymbol) {
        findSymbol = isSymbol(prev);

        if (prevLine && !findSymbol) {
          findSymbol = isSymbol(prevLine[ii - 1]);
        }

        if (nextLine && !findSymbol) {
          findSymbol = isSymbol(nextLine[ii - 1]);
        }
      }

      if (prevLine && !findSymbol) {
        findSymbol = isSymbol(prevLine[ii]);
      }

      if (nextLine && !findSymbol) {
        findSymbol = isSymbol(nextLine[ii]);
      }

      if (next && !findSymbol) {
        findSymbol = isSymbol(next);

        if (prevLine && !findSymbol) {
          findSymbol = isSymbol(prevLine[ii + 1]);
        }

        if (nextLine && !findSymbol) {
          findSymbol = isSymbol(nextLine[ii + 1]);
        }
      }
    } else {
      findSymbol = false;
      startIndex = null;
    }

    if (startIndex !== null && findSymbol) {
      let temp = "";
      const vv = line.substring(startIndex).split("");
      // console.log(line.substring(startIndex));

      vv.some((v, j) => {
        if (!isNumber(v)) return true;
        temp += v;
        bandIndex.push(startIndex + j);
      });
      console.log(bandIndex);
      schemas.push(Number(temp));
      // console.log(line.substring(startIndex));
    }
  });
});

Bun.write("./output.txt", schemas.join("\n"));
// console.log(schemas);
const answer = schemas.reduce((a, b) => a + b, 0);
console.log(answer);
