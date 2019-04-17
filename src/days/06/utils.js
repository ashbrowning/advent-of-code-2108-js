const getManhattenDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const parseRegex = /(\d*), (\d*)/

const parse = input => input.map((str, id) => {
    const [ , x, y ] = str.match(parseRegex);
    return {x: parseInt(x), y: parseInt(y), id };
  });

const sortByNearestToCoord = (coord, list) => {
  list.sort((a, b) => getManhattenDistance(coord, a) - getManhattenDistance(coord, b));
};

module.exports = {
  getManhattenDistance,
  parse,
  sortByNearestToCoord
};
