const fs = require("fs");
const { differenceInMilliseconds, distanceInWordsStrict, format } = require("date-fns");

module.exports = (dayArg, partArg) => {
  const day = !dayArg.length || dayArg.length === 1 ? `0${dayArg}` : `${dayArg}`;
  const solution = require(`../src/days/${day}/index.js`)[`part${partArg}`];
  const input = fs
    .readFileSync(`${__dirname}/../src/days/${day}/input.txt`, { encoding: "utf8" })
    .split("\n");

  input.pop();

  const startTime = new Date();
  const result = solution(input);
  const duration = differenceInMilliseconds(new Date(), startTime);
  console.log(`Day ${day} Part ${partArg}`);
  console.log("Answer:", result);
  console.log("Runtime:", format(duration, 'mm:ss.SSS'));
  return result;
};
