const path = "./input.txt";
const file = await Bun.file(path);

type Cube = {
  red?: number;
  green?: number;
  blue?: number;
};

type Data = Record<string, Cube[]>;

const limit = {
  red: 12,
  green: 13,
  blue: 14,
};

const possibleID: number[] = [];

const lineText = await file.text();

const lines = lineText.split("\n").filter((v) => !!v);

lines.forEach((line, i) => {
  let passed = true;
  const id = line.match(/\d+/g)?.[0];

  const listSections = line.substring(line.indexOf(":") + 1);

  const sections = listSections.split(";");
  sections.forEach((section) => {
    const cubes = section.split(",");

    cubes.forEach((cube) => {
      const normal = cube.normalize();

      const d = normal.split(" ").filter((v) => !!v);
      const count = Number(d[0]);
      const color = d[1];

      if (count > limit[color]) {
        passed = false;
        return;
      }
    });
  });
  if (passed) {
    possibleID.push(Number(id));
  }
});

const answer = possibleID.reduce((a, b) => a + b, 0);
console.log(answer);
