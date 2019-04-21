
const { parse, sortByFurthestToCoord, getManhattenDistance } = require('./utils');

const MAX_DISTANCE = 10000;

const isSafe = ({ x, y, coords }) => {
  let totalDistance = 0;
  for( let i = 0; i < coords.length; ++i ) {
    totalDistance += getManhattenDistance({x, y}, coords[i]);
  }
  return totalDistance;
}

const solution = input => {
  const { parsedInput: coords, MAX_DIMENSIONS } = parse(input);
  const numberOfCoords = parsedInput.length;

  sortByFurthestToCoord({x: 0, y: 0}, parsedInput);
  let safeCoordTotal = 0;

  for(let y = 0; y < MAX_DIMENSIONS; ++y) {
    let skip = 0;
    for(let x = 0; x < MAX_DIMENSIONS; ++x) {
      sortByFurthestToCoord({x, y}, parsedInput);
      const totalDistance = isSafe({ x, y, coords });

      if (totalDistance < MAX_DISTANCE) {
        safeCoordTotal += 1;
        continue;
      }
      x += Math.max(Math.floor((totalDistance - MAX_DISTANCE) / numberOfCoords), 0);
    }
  }
  return safeCoordTotal;
};

module.exports = solution;
