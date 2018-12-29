const claimRegex = /^#(\d*) @ (\d*),(\d*): (\d*)x(\d*)$/;
const GRID_SIZE = 1000;

class Claim {
  constructor({ id, x, y, w, h }) {
    this.id = id;
    this.x = +x;
    this.y = +y;
    this.xEnd = this.x + +w;
    this.yEnd = this.y + +h;
  }
}

const processInput = input => {
  return input.map(claim => {
    const [, id, x, y, w, h] = claim.match(claimRegex);
    return new Claim({ id, x, y, w, h });
  }).reduce((byId, claim) => {
    byId[claim.id] = claim;
    return byId;
  }, {});
};

const orderByStartX = claims =>
  Object.values(claims)
    .sort((a, b) => a.x - b.x)
    .map(c => c.id);

module.exports = {
  claimRegex,
  GRID_SIZE,
  Claim,
  processInput,
  orderByStartX
};
