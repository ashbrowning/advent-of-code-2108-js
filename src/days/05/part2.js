
const { isTriggered, react} = require('./utils');

const solution = input => {
  const asciiOffset = 65;
  const resultMap = {};
  for ( let i = 0; i < 26; ++i ) {
    const char = String.fromCharCode(i + asciiOffset);
    const regex = new RegExp(char, 'gi');
    resultMap[char] = react(input[0].replace(regex, ''))
  }

  const entryMap = Object.entries(resultMap);
  const lowestResult = entryMap.reduce((memo, result) => {
    return result[1] > memo[1] ? memo : result;
  }, entryMap[0]);

  return lowestResult[1];
};

module.exports = solution;
