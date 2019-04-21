const getManhattenDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const parseRegex = /(\d*), (\d*)/

const parse = input => {
  let MAX_DIMENSIONS = 0;
  const parsedInput = input.map((str, id) => {
    const [ , xStr, yStr ] = str.match(parseRegex);
    const x = parseInt(xStr);
    const y = parseInt(yStr);

    MAX_DIMENSIONS = x > y ? x : y;

    return {x, y, id };
  });

  return { parsedInput, MAX_DIMENSIONS };
};

const sortByNearestToCoord = (coord, list) => {
  list.sort((a, b) => getManhattenDistance(coord, a) - getManhattenDistance(coord, b));
};

const sortByFurthestToCoord = (coord, list) => {
  list.sort((a, b) => getManhattenDistance(coord, b) - getManhattenDistance(coord, a));
};

module.exports = {
  getManhattenDistance,
  parse,
  sortByNearestToCoord,
  sortByFurthestToCoord
};
