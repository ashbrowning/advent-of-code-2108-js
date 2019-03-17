const { compareAsc } = require('date-fns');
const { dateRegex, lineRegex, Guard } = require('./utils');

const solution = input => {
  const sortedInput = input.sort((a, b) => {
    const [ , aStr ] = a.match(dateRegex);
    const [ , bStr ] = b.match(dateRegex);
    return compareAsc(new Date(aStr), new Date(bStr));
  });

  let currentGuard;
  let sleepStart = -1;
  const guards = {};
  sortedInput.forEach(line => {
    const [, minute, event, guardId ] = line.match(lineRegex);

      switch (event) {
        case 'Guard':
          if (!guards[guardId]) {
            guards[guardId] = new Guard(parseInt(guardId, 10));
          }
          currentGuard = guards[guardId];
          break;
        case 'falls':
          sleepStart = parseInt(minute, 10);
          break;
        case 'wakes':
          currentGuard.addNap(sleepStart, parseInt(minute, 10));
          break;
      }
  });

  const sleepiestGuard = Object.values(guards)
    .reduce((memo, guard) => {
      const sleepGuard = guard.getSleepiestMinute();
      return memo.highestSessionCount < sleepGuard.highestSessionCount ? sleepGuard : memo;
    }, { highestSessionCount: 0 })

  return sleepiestGuard.highestSessionStart * sleepiestGuard.id;
};

module.exports = solution;
