const path = "./test.txt";
const file = Bun.file(path);

const lineText = await file.text();

const galaxies: number[] = [];
let i = 1;
const rows = lineText.split("\n").filter((v) => !!v);

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

// Expand Row
const rowExpand = Array.from({ length: rows[0].length }, () => ".");
rowNoGal.forEach((v, i) => {
  r.splice(v + i, 0, rowExpand);
});

// Expand Col

r = r.map((c, i) => {
  colNoGal.forEach((cc, ii) => {
    c.splice(cc + ii, 0, ".");
  });

  return c;
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

      const s = Math.abs(Number(row) - i) + Math.abs(Number(col) - ii);

      pairs[`${vv}-${v}`] = s;
    });

    route.push([v, `${i}:${ii}`]);
  });
});

const answer = Object.keys(pairs).reduce((a, b) => a + pairs[b], 0);
console.log(answer);
