const { claimRegex, GRID_SIZE, Claim, processInput, orderByStartX } = require('./utils');

const solution = input => {
  const claimsById = processInput(input);
  const leftOrdered = orderByStartX(claimsById);
  let activeList = [];
  let overlaps = 0;
  const overlappingClaims = new Set();
  for(let i = 0; i < GRID_SIZE; ++i) {
    //Remove from the active list if xEnd has been hit
    activeList = activeList.reduce((newList, id) => {
      if (claimsById[id].xEnd !== i) newList.push(id);
      return newList;
    }, []);

    //Add the new claims
    while(true) {
      const potentialClaim = claimsById[leftOrdered[0]];
      if (potentialClaim && potentialClaim.x === i) {
        activeList.push(leftOrdered.shift());
      } else {
        break;
      }
    }

    // Got the updated active List, so sort
    const yStartList = activeList.slice().sort((aId, bId) => {
      const a = claimsById[aId];
      const b = claimsById[bId];
      return a.y - b.y;
    });

    const yEndList = activeList.slice().sort((aId, bId) => {
      const a = claimsById[aId];
      const b = claimsById[bId];
      return a.yEnd - b.yEnd;
    });

    let lastIndex = 0;
    let nofClaims = 0;
    const localOverlapIds = new Set();
    while(yStartList.length > 0 || yEndList.length > 0) {
      if(yStartList.length > 0 && claimsById[yStartList[0]].y < claimsById[yEndList[0]].yEnd) {
        const {id, y} = claimsById[yStartList.shift()];
        localOverlapIds.add(id);
        nofClaims += 1;
        if (nofClaims > 2) {
          overlaps += y - lastIndex;
          for(o of localOverlapIds.values()) {
            overlappingClaims.add(o);
          }
        }
        lastIndex = y;
      } else {
        const {id, yEnd} = claimsById[yEndList.shift()];
        if (nofClaims > 1) {
          for(o of localOverlapIds.values()) {
            overlappingClaims.add(o);
          }
          overlaps += yEnd - lastIndex;
        }
        localOverlapIds.delete(id);
        nofClaims -= 1;
        lastIndex = yEnd;
      }
    }
  }
  const numberOfClaims = Object.keys(claimsById).length;
  for(let i = 1; i <= numberOfClaims; ++i ) {
    if(!overlappingClaims.has(`${i}`)) return i;
  }
};

module.exports = solution;
