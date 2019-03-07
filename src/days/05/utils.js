const isTriggered = (firstLetter, secondLetter) => firstLetter !== secondLetter && firstLetter.toLowerCase() === secondLetter.toLowerCase()

const react = inputStr => {
  const input = inputStr.split('');
  const stack = [];

  input.forEach(letter => {
    const prev = stack[stack.length -1];

    if (!!stack.length && isTriggered(prev, letter)) {
      stack.pop();
    } else {
      stack.push(letter);
    }

  });

  return stack.length;
};

module.exports = {
  isTriggered,
  react
};
