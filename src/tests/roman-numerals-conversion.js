const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));


const r2a = (number) => 1

describe('roman to arabic', () => {
  it('I => 1', () => expect(r2a('I')).to.equals(1));
});
