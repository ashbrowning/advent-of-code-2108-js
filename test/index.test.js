const launcher = require("../tools/launcher");

const answers = [
  [522, 73364],
  [7936, 'lnfqdscwjyteorambzuchrgpx'],
  [110891, 297],
  [115167, 32070],
  [10598, 5312],
  [4215, ]
];

describe("Advent of Code 2018 JS", () => {
  for (let i = 0; i < answers.length; ++i) {
    describe(`Day ${i+1}`, () => {
      it('should give the correct answers for part 1', () => {
        expect(launcher(i+1, 1, false)).toBe(answers[i][0]);
      });
      it('should give the correct answers for part 2', () => {
        expect(launcher(i+1, 2, false)).toBe(answers[i][1]);
      });
    });
  }
});
