const path = "./test.txt";
const file = Bun.file(path);

const lineText = await file.text();

const lines = lineText
  .split("\n")
  .filter((v) => !!v)
  .map((v) => {
    const vv = v.split(" ");

    return vv;
  });

const count = (char: string, nums: number[]) => {
  if (char === "") {
    return nums.length === 0 ? 1 : 0;
  }

  if (nums.length === 0) {
    return char.includes("#") ? 0 : 1;
  }

  let result = 0;

  if (".?".includes(char[0])) {
    console.log(".?");
    result += count(char.substring(1), nums);
  }

  if ("#?".includes(char[0])) {
    if (
      nums[0] <= char.length &&
      !char.substring(0, nums[0]) &&
      (nums[0] === char.length || char[nums[0]] !== "#")
    ) {
      result += count(char.substring(nums[0] + 1), nums.splice(1));
    }
  }

  return result;
};

let total = 0;

lines.forEach((line) => {
  const [springs, coors] = line;

  const nums = coors.split(",").map((v) => Number(v));
  total += count(springs, nums);
});

console.log(total);
