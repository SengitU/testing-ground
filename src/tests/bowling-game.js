const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

class Game {
  constructor() {
    this.score = 0;
    this.frame = 1;
  }


  roll(newScore) {
    this.score = newScore;
  }

  totalScore() {
    return this.score;
  }

  getFrame() {
    return this.frame;
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

  it("should return frame number 1 before any rolls", () => {
    const game = new Game();
    const frame = game.getFrame();
    expect(frame).to.equals(1);
  });

  it("should return 5 if user rolled 3, 2", () => {
    const game = new Game();
    game.roll(3);
    game.roll(2);
    const score = game.totalScore();
    expect(score).to.equals(5);
  });



});
