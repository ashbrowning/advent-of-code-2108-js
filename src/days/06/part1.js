
const { getManhattenDistance, sortByNearestToCoord } = require('./utils');

const MAX_DIMENSIONS = 0;
const parseRegex = /(\d*), (\d*)/

const solution = input => {
  let MAX_DIMENSIONS = 0;
  const parsedInput = input.map((str, id) => {
    const [ , xStr, yStr ] = str.match(parseRegex);
    const x = parseInt(xStr);
    const y = parseInt(yStr);

    MAX_DIMENSIONS = x > y ? x : y;

    return {x, y, id };
  });

  const orderedInput = parsedInput.slice();
  sortByNearestToCoord({x: 0, y: 0}, orderedInput);
  const tally = {};
  const grid = [];
  for(let y = 0; y < MAX_DIMENSIONS; ++y) {
    const column = [];
    let skip = 0;
    for(let x = 0; x < MAX_DIMENSIONS; ++x) {
      skip -= 1;
      if (skip <= 0) {
        sortByNearestToCoord({x, y}, orderedInput);
      }
      const [closest, secondClosest] = orderedInput;

      if (skip <= 0) {
        const closestDistance = getManhattenDistance({x, y}, closest);
        const secondClosestDistance = getManhattenDistance({x, y}, secondClosest);
        skip = Math.max(Math.floor(((secondClosestDistance - closestDistance) / 2)), 0);
        if (closestDistance === secondClosestDistance) {
          column[x] = '';
          continue;
        }
      }

      column[x] = closest.id;
      tally[closest.id] = tally[closest.id] ? tally[closest.id] + 1 : 1;
    }
    grid.push(column);
  }

  //Filter output
  const infiniteSet = new Set();
  grid.forEach(row => {
    infiniteSet.add(row[0]);
    infiniteSet.add(row[row.length - 1]);
  });
  grid[0].forEach(e => infiniteSet.add(e));
  grid[grid.length - 1].forEach(e => infiniteSet.add(e));

  const highest = Object.entries(tally).sort((a,b) => b[1] - a[1]).find(entry => !infiniteSet.has(parseInt(entry[0])))
  return highest[1];
};

module.exports = solution;
