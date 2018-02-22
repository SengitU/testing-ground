const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

class Game {
  constructor() {
    this.score = 0;
  }


  roll(newScore) {
    this.score = newScore;
  }

  totalScore() {
    return this.score;
  }
}


describe("Bowling Game", () => {
  it("should return 0 if player can not hit any", () => {
      const game = new Game();
      const score = game.totalScore();

      expect(score).to.equals(0);
  });

  it("should return 3 if player hits 3", () => {
      const game = new Game();
      game.roll(3);
      const score = game.totalScore();

      expect(score).to.equals(3);
  });

  xit("should return frame number 1 before any rolls", () => {
      expect(frame).to.equals(1);
  });



});
