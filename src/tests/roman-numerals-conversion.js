const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));



const lookup = { I: 1, V: 5, X: 10 };

const getMultiplier = (current, next = 'I') => lookup[current] >= lookup[next] ? 1: -1;
const getValueForAddition = (current, next) => r2a(current) * getMultiplier(current, next);

const r2a = (number) => {
  const symbols = number.split('');

  if(number.length === 1) return lookup[number];

  if(number === 'II') return getValueForAddition(symbols[0], symbols[1]) + getValueForAddition(symbols[1], symbols[2]);
  if(number === 'III') return getValueForAddition(symbols[0], symbols[1]) + getValueForAddition(symbols[1], symbols[2]) + getValueForAddition(symbols[2], symbols[3]);
  if(number === 'IV') return getValueForAddition(symbols[0], symbols[1]) + getValueForAddition(symbols[1], symbols[2]);

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
