const path = "./test.txt";
const file = Bun.file(path);

const lineText = await file.text();

const lines = lineText.split("\n\n");

let seeds = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((v) => !!v)
  .map((v) => Number(v));

const newSeeds: number[][] = [];

for (let i = 0; i < seeds.length; i += 2) {
  newSeeds.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
}
const blocks = lines.slice(1);
// destination range start, the source range start, and range length

blocks.forEach((block) => {
  const range = block
    .split("\n")
    .splice(1)
    .filter((v) => !!v)
    .map((v) => v.split(" ").map((vv) => Number(vv)));
  const neww: number[] = [];

  seeds.forEach((seed) => {
    const founded = range.some(([dest, src, len]) => {
      if (seed >= src && seed < src + len) {
        neww.push(seed - src + dest);
        return true;
      }
      return false;
    });
    if (!founded) {
      neww.push(seed);
    }
    seeds = neww;
  });
});

console.log(seeds);
