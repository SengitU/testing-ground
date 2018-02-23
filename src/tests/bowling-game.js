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

  isSpare(frame) {
    return frame.score.length > 1 && frame.score[0] + frame.score[1] === 10;
  }

  isStrike(frame) {
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
    if(this.currentFrame === 9) return;
    if(currentFrame.score.length > 1 || this.isStrike(currentFrame)) {
      this.endFrame();
    }
  }

  calculateStrikes(strikes, frame) {
    let score = 0;
    strikes.forEach(strike => {
      frame.score.forEach(frameScore => {
        if(strike.remaining > 0) {
          score += frameScore;
          strike.remaining--;
        }
      });
    });
    return score;
  }

  clearEmptyStrikes(strikes) {
    return strikes.reduce((acc, strike) => strike.remaining > 0 ? [...acc, strike] : acc , [])
  }

  totalScore() {
    let score = 0;
    let spare = 0;
    let strikes = [];

    this.frame.forEach((frame, index) => {
      if(spare !== 0) {
        score += frame.score[0];
      }

      score += this.calculateStrikes(strikes, frame);

      score += frame.score.reduce((total, score) => total += score, 0);

      if(this.isSpare(frame)) spare++;
      if(this.isStrike(frame)) strikes.push({frame: index, remaining: 2});
    });

    strikes = this.clearEmptyStrikes(strikes);
    return score;
  }

  getFrame() {
    return this.currentFrame + 1;
  }
}


describe("Bowling Game", () => {

  const rolls = (game, ...scores) => scores.forEach( score => game.roll(score));

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

  it("should increase the number of frames after one spare and 4 rolls", () => {
    const game = new Game();

    rolls(game, 8, 2);
    rolls(game, 7, 2);
    rolls(game, 1, 1);
    rolls(game, 1);

    const frame = game.getFrame();

    expect(frame).to.equals(4);
  });

  it('should return 21 if player hit scored 21 without spare or strike',() => {
    const game = new Game();

    rolls(game, 3, 2);
    rolls(game, 7, 2);
    rolls(game, 6, 1);

    expect(game.totalScore()).to.equals(21);
  })

  it('should return 18 if user makes a spare, afterwards rolls 2 and 4',() => {
    const game = new Game();

    rolls(game, 7, 3);
    rolls(game, 2, 4);

    expect(game.totalScore()).to.equals(18);
  })

  it('should return 20 if user makes a strike, followed by 2, 3 rolls',() => {
    const game = new Game();

    rolls(game, 10);
    rolls(game, 2, 3);

    expect(game.totalScore()).to.equals(20);
  })

  it('should return 60 for three consecutive strikes',() => {
    const game = new Game();

    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);

    expect(game.totalScore()).to.equals(60);
  })

  xit('should return 300 for a perfect game',() => {
    const game = new Game();

    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);

    expect(game.totalScore()).to.equals(300);
  })

  it('should return frame number 10 for 12 strike',() => {
    const game = new Game();

    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);
    rolls(game, 10);

    expect(game.getFrame()).to.equals(10);
  })





});
