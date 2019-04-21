const getManhattenDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const sortByNearestToCoord = (coord, list) => {
  list.sort((a, b) => getManhattenDistance(coord, a) - getManhattenDistance(coord, b));
};

module.exports = {
  getManhattenDistance,
  sortByNearestToCoord
};
