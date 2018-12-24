const solution = input => {
  let twos = 0;
  let threes = 0;

  input.forEach(word => {
    const {two, three} = countDoublesAndTriples(word);
    twos += two ? 1 : 0;
    threes += three ? 1 : 0;
  });

  return twos * threes;
  //for each line
  //for each character -> put into a map, increasing the count each time seen
};

const countDoublesAndTriples = word => {
  const map = {};
  for(let i = 0; i < word.length; ++i) {
    const letter = word[i];
    map[letter] = map[letter] ? ++map[letter] : 1;
  }
  const values = Object.values(map);
  return {
    two: values.includes(2),
    three: values.includes(3)
  }
//lnfqdsvwjyteogamnzjwhirkpx
};

module.exports = solution;
