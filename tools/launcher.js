const fs = require('fs');
const moment = require('moment');

module.exports = (dayArg, partArg) => {
  const solution = require(`./days/${dayArg}/index.js`)[`part_${partArg}`];
  const input = fs.readFileSync(
    `${__dirname}/days/${dayArg}/input.txt`,
    { encoding: 'utf8' }
  ).split('\n');

  input.pop();

  const startMoment = moment();
  const result = solution(input);
  const duration = moment().diff(startMoment);
  console.log('Answer:', result);
  console.log('Runtime:', moment(duration).format('m:s.SSS'));

  return result;
};
