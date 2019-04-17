
const { getManhattenDistance, parse, sortByNearestToCoord } = require('./utils');

const MAX_DIMENSIONS = 10;
const parseRegex = /(\d*), (\d*)/

const solution = input => {
  let MAX_DIMENSIONS = 0;
  const parsedInput = input.map((str, id) => {
    const [ , xStr, yStr ] = str.match(parseRegex);
    const x = parseInt(xStr);
    const y = parseInt(yStr);
    if (x > MAX_DIMENSIONS) {
      MAX_DIMENSIONS = x;
    }
    if (y > MAX_DIMENSIONS) {
      MAX_DIMENSIONS = y;
    }
    return {x, y, id };
  });


  // const currentCoord = {x: 0, y: 0};
  const orderedInput = parsedInput.slice();
  sortByNearestToCoord({x: 0, y: 0}, orderedInput);
  const tally = {};
  const grid = [];

  for(let y = 0; y < MAX_DIMENSIONS; ++y) {
    const column = [];
    for(let x = 0; x < MAX_DIMENSIONS; ++x) {
      sortByNearestToCoord({x, y}, orderedInput);
      const [closest, secondClosest] = orderedInput;
      const closestDistance = getManhattenDistance({x, y}, closest);
      const secondClosestDistance = getManhattenDistance({x, y}, secondClosest);
      // console.log('difference', closestDistance - secondClosestDistance);
      if (closestDistance === secondClosestDistance) {
        column[x] = '';
      } else {
        column[x] = closest.id;
        tally[closest.id] = tally[closest.id] ? tally[closest.id] + 1 : 1;
      }
    }
    grid.push(column);
  }

  // grid.forEach(g => console.log(g));

  //Filter output
  const infiniteSet = new Set();
  grid.forEach(row => {
    infiniteSet.add(row[0]);
    infiniteSet.add(row[row.length - 1]);
  });
  grid[0].forEach(e => infiniteSet.add(e));
  grid[grid.length - 1].forEach(e => infiniteSet.add(e));

  const entries = Object.entries(tally);
  entries.sort((a,b) => b[1] - a[1]);
  const highest = entries.find(entry => !infiniteSet.has(parseInt(entry[0])));

  return highest[1];
};

module.exports = solution;



// optimise - distance difference between two closest points, diff/2 -1