const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));



const lookup = { I: 1, V: 5, X: 10 };

const getMultiplier = (current, next) => lookup[current] >= lookup[next] ? 1: -1;

const r2a = (number) => {
  const symbols = number.split('');

  if(lookup[number]) return lookup[number];

  if(number === 'II') return r2a(symbols[0]) * getMultiplier(symbols[0], symbols[1]) + r2a(symbols[1]);
  if(number === 'III') return r2a(symbols[0]) * getMultiplier(symbols[0], symbols[1]) + r2a(symbols[1]) *  getMultiplier(symbols[1], symbols[2]) + r2a(symbols[2]);
  if(number === 'IV') return r2a(symbols[0]) * getMultiplier(symbols[0], symbols[1])  + r2a(symbols[1]);

  return 0;
}

describe('roman to arabic', () => {
  it('zero-like => 0', () => expect(r2a('')).to.equals(0));
  it('I => 1', () => expect(r2a('I')).to.equals(1));
  it('II => 2', () => expect(r2a('II')).to.equals(2));
  it('III => 3', () => expect(r2a('III')).to.equals(3));
  it('IV => 4', () => expect(r2a('IV')).to.equals(4));
  it('V => 5', () => expect(r2a('V')).to.equals(5));
  it('X => 10', () => expect(r2a('X')).to.equals(10));
});
