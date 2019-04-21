
const { parse, sortByFurthestToCoord, getManhattenDistance } = require('./utils');

const MAX_DISTANCE = 10000;

const isSafe = ({ x, y, coords }) => {
  let totalDistance = 0;
  for( let i = 0; i < coords.length; ++i ) {
    totalDistance += getManhattenDistance({x, y}, coords[i]);
    if (totalDistance >= MAX_DISTANCE) {
      return false;
    }
  }
  return true;
}

const solution = input => {
  const { parsedInput, MAX_DIMENSIONS } = parse(input);

  sortByFurthestToCoord({x: 0, y: 0}, parsedInput);
  let safeCoordTotal = 0;

  for(let y = 0; y < MAX_DIMENSIONS; ++y) {
    let skip = 0;
    for(let x = 0; x < MAX_DIMENSIONS; ++x) {
      sortByFurthestToCoord({x, y}, parsedInput);

      // const [furthest, secondFurthest] = parsedInput;

      // const furthestDistance = getManhattenDistance({x, y}, furthest);

      safeCoordTotal += isSafe({x, y, coords: parsedInput }) ? 1 : 0;


      // const secondFurthestDistance = getManhattenDistance({x, y}, secondFurthest);
      // skip = Math.max(Math.floor(((furthestDistance - secondFurthestDistance) / 2)), 0);
      // if (furthestDistance === secondFurthestDistance) {
      //   column[x] = '';
      //   continue;
      // }

    }
  }
  return safeCoordTotal;
};

module.exports = solution;
