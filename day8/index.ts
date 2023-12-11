const path = "./input.txt";
const file = Bun.file(path);

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

let foundZ = false;

let step = 0;
let map = "AAA";
while (!foundZ) {
  instructions.some((ins) => {
    map = objectEls[map][ins];

    step += 1;

    console.log(map);

    if (map === "ZZZ") {
      foundZ = true;
      return true;
    }
  });
}

console.log(step);
