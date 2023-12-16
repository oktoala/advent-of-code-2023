const path = "./input.txt";
const file = Bun.file(path);

const lineText = await file.text();

const galaxies: number[] = [];
let i = 1;
const rows = lineText.split("\n").filter((v) => !!v);

const multiply = 1000000;

const rowNoGal: number[] = [];
const colNoGal: number[] = Array.from({ length: rows.length }, (_, i) => i);

let r = rows.map((v, r) => {
  if (!v.includes("#")) {
    rowNoGal.push(r);
  }
  const u = v.split("");
  let hasNoGal = true;
  return u.map((vv, c) => {
    const vi = vv.replace("#", `${i}`);
    if (vv === "#") {
      const ii = colNoGal.indexOf(c);
      if (ii > -1) {
        colNoGal.splice(ii, 1);
      }

      galaxies.push(i);
      hasNoGal = false;
      i++;
    }

    return vi;
  });
});

const route: string[][] = [];
const pairs: Record<string, number> = {};

r.forEach((c, i) => {
  c.forEach((v, ii) => {
    if (isNaN(Number(v))) {
      return;
    }

    route.forEach((ro) => {
      const [vv, p] = ro;
      const [row, col] = p.split(":");

      let rowPlus = 0;
      rowNoGal.forEach((rng) => {
        if (
          (Number(row) >= i && rng >= i && rng < Number(row)) ||
          (Number(row) <= i && rng <= i && rng >= Number(row))
        ) {
          rowPlus += 1;
        }
      });

      let colPlus = 0;
      colNoGal.forEach((cng) => {
        if (
          (Number(col) >= ii && cng >= ii && cng < Number(col)) ||
          (Number(col) <= ii && cng <= ii && cng >= Number(col))
        ) {
          colPlus += 1;
        }
      });

      rowPlus *= multiply;
      colPlus *= multiply;

      rowPlus = rowPlus <= 1 ? rowPlus : rowPlus - rowPlus / multiply;
      colPlus = colPlus <= 1 ? colPlus : colPlus - colPlus / multiply;

      const s =
        Math.abs(Number(row) - i) +
        rowPlus +
        (Math.abs(Number(col) - ii) + colPlus);

      pairs[`${vv}-${v}`] = s;
    });

    route.push([v, `${i}:${ii}`]);
  });
});

const answer = Object.keys(pairs).reduce((a, b) => a + pairs[b], 0);
// console.log(rowNoGal, colNoGal, route, pairs);
console.log(answer);
