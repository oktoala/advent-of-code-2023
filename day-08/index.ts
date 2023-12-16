const path = "./input.txt";
const file = Bun.file(path);

const lcm = (...arr: number[]) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

const lineText = await file.text();
const instructions = lineText
  .split("\n\n")[0]
  .split("")
  .map((v) => (v === "L" ? 0 : 1));

const elements = lineText
  .split("\n\n")[1]
  .split("\n")
  .filter((v) => !!v)
  .map((v) =>
    v
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(" = ")
      .map((vvv) => vvv.split(", "))
  );

const objectEls: Record<string, string[]> = {};

elements.forEach((el) => {
  const key = el[0][0];
  const value = el[1];
  objectEls[key] = value;
});

let mapA = Object.keys(objectEls).filter((v) => v.split("")[2] === "A");

const cicle: number[] | undefined[] = mapA.map(() => 0);

const zz: string[] = mapA.map(() => "");

let foundZ = false;

let step = 0;
while (!foundZ) {
  instructions.some((ins) => {
    mapA = mapA.map((m) => objectEls[m][ins]);

    step += 1;

    mapA.forEach((m, i) => {
      if (m.split("")[2] === "Z" && zz[i] !== m) {
        zz[i] = m;
        cicle[i] = step;
        console.log(m);
      }
    });

    let notEndZ = cicle.some((v) => v < 1);

    if (!notEndZ) {
      foundZ = true;
      return foundZ;
    }
  });
}

console.log(cicle);
console.log(zz);
const answer = lcm(...cicle);
console.log(answer);
