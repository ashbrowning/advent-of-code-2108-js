const { replaceChar } = require('../../utils');

const REPLACEMENT_CHAR = '-';

const solution = input => {
  const wordLength = input[0].length;

  for (let i = 0; i < wordLength; ++i) {
    const copyInput = input.slice().map(word => replaceChar(word, i, REPLACEMENT_CHAR));
    const seenSet = new Set();
    for ( let word of copyInput ) {
      if (seenSet.has(word)) {
        return word.replace(REPLACEMENT_CHAR, '');
      } else {
        seenSet.add(word);
      }
    }
  }
};

module.exports = solution;
