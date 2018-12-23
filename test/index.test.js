const launcher = require("../tools/launcher");

const answers = [
  [522, 73364]
];

describe("Advent of Code 2018 JS", () => {
  for (let i = 0; i < answers.length; ++i) {
    describe(`Day ${i+1}`, () => {
      it('should give the correct answers for part 1', () => {
        expect(launcher(i+1, 1)).toBe(answers[i][0]);
      });
      it('should give the correct answers for part 2', () => {
        expect(launcher(i+1, 2)).toBe(answers[i][1]);
      });
    });
  }
});
