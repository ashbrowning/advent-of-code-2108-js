const findFirstDuplicateFrequency = input => {
  const deltas = input.map(i => +i);
  const trackSet = new Set();
  let frequency = 0;
  while (true) {
    for(let i = 0; i < input.length; ++i){
      frequency += deltas[i];
      if (trackSet.has(frequency)) return frequency;
      trackSet.add(frequency);
    }
  }
};

module.exports = findFirstDuplicateFrequency;
