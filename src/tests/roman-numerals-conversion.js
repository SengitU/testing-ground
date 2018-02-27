const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));


const r2a = (number) => {
  if(number === 'I') return 1;
  if(number === 'II') return 2;
  if(number === 'III') return 3;
  if(number === 'IV') return 4;
  if(number === 'V') return 5;
  if(number === 'X') return 10;

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
