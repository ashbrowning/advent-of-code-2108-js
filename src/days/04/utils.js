const dateRegex = /\[(.*)\]/;
const lineRegex = /\[.*:(\d\d)\] (Guard|falls|wakes) #?(\d*)/;


class Guard {
  constructor(id) {
    this.id = id;
    this.totalTimeAsleep = 0;
    this.start = [];
    this.end = [];
  }

  addNap(start, end) {
    this.start.push(start);
    this.end.push(end)
    this.totalTimeAsleep += end - start;
  }

  getSleepiestMinute() {
    const startSorted = this.start.sort((a,b) => a - b);
    const endSorted = this.end.sort((a,b) => a - b);
    let sessionCount = 0;
    let sessionStart = 0;
    let highestSessionCount = 0;
    let highestSessionStart = 0;
    while(startSorted.length && endSorted.length) {
      if(startSorted[0] < endSorted[0]) {
        sessionStart = startSorted.shift();
        sessionCount += 1;
        if (highestSessionCount < sessionCount) {
          highestSessionCount = highestSessionCount < sessionCount ? sessionCount : highestSessionCount;
          highestSessionStart = sessionStart;
        }
      } else if (startSorted[0] > endSorted[0]) {
        endSorted.shift();
        sessionCount -= 1;
      } else {
        startSorted.shift();
        endSorted.shift();
      }
    }

    return {id: this.id, highestSessionStart, highestSessionCount};
  }
};


module.exports = {
  Guard,
  dateRegex,
  lineRegex
}
