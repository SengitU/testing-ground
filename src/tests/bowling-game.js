const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

class Game {
  constructor() {
    this.frame = [];
    this.currentFrame = 0;
  }

  endFrame() {
    this.currentFrame++;
  }

  getCurrentFrame() {
    return this.frame[this.currentFrame];
  }

  isSpare() {
    const frame = this.getCurrentFrame();
    return frame.score.length > 1 && frame.score[0] + frame.score[1] === 10;
  }

  isStrike() {
    const frame = this.getCurrentFrame();
    return frame.score.length === 1 && frame.score[0] === 10;
  }

  createFrame() {
    this.frame[this.currentFrame] = {
      score: []
    }
  }

  isFrameExists() {
    return this.frame[this.currentFrame] !== undefined;
  }

  roll(newScore) {
    if(!this.isFrameExists()) this.createFrame();
    const currentFrame = this.getCurrentFrame();
    currentFrame.score.push(newScore);
    if(this.isSpare()) return;
    if(currentFrame.score.length > 1 || this.isStrike()) {
      this.endFrame();
    }
  }

  totalScore() {
    let score = 0;
    this.frame.forEach(frame => {
      score = frame.score.reduce((total, score) => total += score, 0);
    });
    return score;
  }

  getFrame() {
    return this.currentFrame + 1;
  }
}


describe("Bowling Game", () => {
  it("should return 0 if player did not hit any", () => {
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

  it("should complete the frame after two rolls", () => {
    const game = new Game();
    game.roll(3);
    game.roll(2);
    const frame = game.getFrame();

    expect(frame).to.equals(2);
  });

  it("should complete the frame after spare", () => {
    const game = new Game();
    game.roll(7);
    game.roll(3);
    const frame = game.getFrame();

    expect(frame).to.equals(2);
  });

  it("should complete the frame after strike", () => {
    const game = new Game();
    game.roll(10);
    const frame = game.getFrame();

    expect(frame).to.equals(2);
  });

  xit("should be frame numbers correctly in multiple frames", () => {
    const game = new Game();
    game.roll(8);
    game.roll(2);
    game.roll(7);
    game.roll(7);
    game.roll(1);
    game.roll(1);
    game.roll(1);
    const frame = game.getFrame();

    expect(frame).to.equals(4);
  });








});
