const path = "./input.txt";
const file = Bun.file(path);

const lineText = await file.text();

const lines = lineText.split("\n\n");

const seeds = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((v) => !!v);

const blocks = lines.slice(1);

// destination range start, the source range start, and range length
const range: number[][][] = [];

blocks.forEach((block) => {
  const nums = block
    .split("\n")
    .splice(1)
    .filter((v) => !!v)
    .map((v) => v.split(" ").map((vv) => Number(vv)));
  range.push(nums);
});

const locs: number[] = [];
console.log(range);
seeds.forEach((seed) => {
  let src = Number(seed);
  range.forEach((map, i) => {
    map.some((m) => {
      const [dest, source, len] = m;
      const realSource = source + len - 1;
      const realDest = dest + len - 1;

      if (src >= source && src <= realSource) {
        /* console.log(
          `${source} <= ${src} <= ${realSource} -> ${dest} -> ${realDest} -> ${len}`
        ); */
        if (source < dest) {
          src += Math.abs(realSource - realDest);
        } else {
          src -= Math.abs(realSource - realDest);
        }
        return true;
      }
    });
    if (i === 6) {
      locs.push(src);
    }
  });
});

console.log(Math.min(...locs));
