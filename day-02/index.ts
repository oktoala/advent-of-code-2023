const path = "./input.txt";
const file = await Bun.file(path);

type Cube = {
  red?: number;
  green?: number;
  blue?: number;
};

type Data = Record<string, Cube[]>;

const power: number[] = [];

const lineText = await file.text();

const lines = lineText.split("\n").filter((v) => !!v);

lines.forEach((line, i) => {
  const id = line.match(/\d+/g)?.[0];

  const data: Cube = {};

  const listSections = line.substring(line.indexOf(":") + 1);

  const sections = listSections.split(";");
  sections.forEach((section) => {
    const cubes = section.split(",");

    cubes.forEach((cube) => {
      const normal = cube.normalize();

      const d = normal.split(" ").filter((v) => !!v);
      const count = Number(d[0]);
      const color = d[1];

      if (!data[color] || (data[color] && data[color] < count)) {
        data[color] = count;
      }
    });
  });
  power.push(data.red * data.green * data.blue);
});

const answer = power.reduce((a, b) => a + b, 0);
console.log(answer);
