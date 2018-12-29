const { claimRegex, GRID_SIZE, Claim, processInput, orderByStartX } = require('./utils');

const solution = input => {
  const claimsById = processInput(input);
  const leftOrdered = orderByStartX(claimsById);
  let activeList = [];
  let overlaps = 0;
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

    let nofClaims = 0;
    let lastIndex = 0;
    while(yStartList.length > 0 || yEndList.length > 0) {
      if(yStartList.length > 0 && claimsById[yStartList[0]].y < claimsById[yEndList[0]].yEnd) {
        const claimYStart = claimsById[yStartList.shift()].y;
        nofClaims += 1;
        if (nofClaims > 2) {
          overlaps += claimYStart - lastIndex;
        }
        lastIndex = claimYStart;
      } else {
        const claimYEnd = claimsById[yEndList.shift()].yEnd;
        nofClaims -= 1;
        if (nofClaims >= 1) {
          overlaps += claimYEnd - lastIndex;
        }
        lastIndex = claimYEnd;
      }
    }
  }
  return overlaps;
};

module.exports = solution;
