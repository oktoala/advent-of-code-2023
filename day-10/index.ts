const path = "./input.txt";
const file = Bun.file(path);

// | = atas bawah
// - = kiri kanan
// L = atas kanan
// J = atas kiri
// 7 = kiri bawah
// F = kanan bawah
// . = tanah (null)
// S = start

const lineText = await file.text();

const lines = lineText
  .split("\n")
  .filter((v) => !!v)
  .map((v) => v.split(""));

let s = "";

lines.some((line, i) => {
  line.some((l, ii) => {
    if (l === "S") {
      s = `${i}:${ii}`;
      return true;
    }
  });

  if (!!s) {
    return true;
  }
});

const [sr, sc] = s.split(":").map((v) => Number(v));

const seen = [[sr, sc]];
let q = [[sr, sc]];

while (q.length > 0) {
  const [r, c] = q.shift() as number[];
  const ch = lines[r][c];

  const seenStr = JSON.stringify(seen);

  if (
    r > 0 &&
    "S|JL".includes(ch) &&
    "|7F".includes(lines[r - 1][c]) &&
    !seenStr.includes(JSON.stringify([r - 1, c]))
  ) {
    seen.push([r - 1, c]);
    q.push([r - 1, c]);
  }

  if (
    r < lines.length - 1 &&
    "S|7F".includes(ch) &&
    "|JL".includes(lines[r + 1][c]) &&
    !seenStr.includes(JSON.stringify([r + 1, c]))
  ) {
    seen.push([r + 1, c]);
    q.push([r + 1, c]);
  }

  if (
    c > 0 &&
    "S-J7".includes(ch) &&
    "-LF".includes(lines[r][c - 1]) &&
    !seenStr.includes(JSON.stringify([r, c - 1]))
  ) {
    seen.push([r, c - 1]);
    q.push([r, c - 1]);
  }

  if (
    c < lines[r].length - 1 &&
    "S-LF".includes(ch) &&
    "-J7".includes(lines[r][c + 1]) &&
    !seenStr.includes(JSON.stringify([r, c + 1]))
  ) {
    seen.push([r, c + 1]);
    q.push([r, c + 1]);
  }
}

console.log(seen.length / 2);
