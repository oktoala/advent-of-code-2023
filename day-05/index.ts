const path = "./input.txt";
const file = Bun.file(path);

const lineText = await file.text();

const lines = lineText.split("\n\n");

let seeds = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((v) => !!v)
  .map((v) => Number(v));

let newSeeds: number[][] = [];

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
  const neww: number[][] = [];

  while (newSeeds.length > 0) {
    const m = newSeeds.pop() as number[];
    let [start, end] = m;
    const founded = range.some(([dest, src, len]) => {
      const overlapStart = Math.max(start, src);
      const overlapEnd = Math.min(end, src + len);

      if (overlapStart < overlapEnd) {
        neww.push([overlapStart - src + dest, overlapEnd - src + dest]);
        if (overlapStart > start) {
          newSeeds.push([start, overlapStart]);
        }

        if (end > overlapEnd) {
          newSeeds.push([overlapEnd, end]);
        }
        return true;
      }
    });

    if (!founded) {
      neww.push([start, end]);
    }
  }
  newSeeds = neww;
});

console.log(Math.min(...newSeeds.map((v) => v[0])));
