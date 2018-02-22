const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

// Hello ${name}, your deposit is ${amount}:c
// Hello Ugurcan, your deposit is US$ 1.300,00
// Hello Ugurcan, your deposit is 1,300.00 EUR

const addTailForCurrency = (string, param) => {
  const textWithoutCurrencyTag = string.substring(2, string.length);
  return param + " EUR" + textWithoutCurrencyTag;
}

const addTail = (param = '') => param;

const isCurrency = (string) => string && string.startsWith(':c');

const applyTagRule = (string = '', param) => {
  if (isCurrency(string)) {
    return addTailForCurrency(string, param);
  }
  return addTail(param) + string;
}

const i18n = (strings, ...params) => {
  
  if (strings.length > 2) {
    return strings[0] + applyTagRule(strings[1], params[0]) + applyTagRule(strings[2], params[1]);
  }

  return strings[0] + applyTagRule(strings[1], params[0]);
}


describe('i18n', () => {
  it('should return given string without parameters', () => {
    expect(i18n`Hello`).to.equal('Hello');
  });

  it('should return given string together with given untagged parameter', () => {
    const name = "Ugurcan";
    expect(i18n`Hello ${name}`).to.equal("Hello Ugurcan");
  });

  it('should return given string with parsed tag to currency', () => {
    const amount = 1300;
    expect(i18n`Amount ${amount}:c`).to.equal("Amount 1300 EUR");
  });

  it('should return given string with parsed tag to currency and the words after the tag', () => {
    const amount = 1300;
    expect(i18n`Amount ${amount}:c Have a nice day`).to.equal("Amount 1300 EUR Have a nice day");
  });

  it('should return given string with parsed tag to currency and the words after the tag', () => {
    const name = "Ugurcan";
    const amount = 1300;
    expect(i18n`Hello ${name}, you have ${amount}:c Have a nice day`).to.equal("Hello Ugurcan, you have 1300 EUR Have a nice day");
  });

  it('should return given string with parsed tag to currency and the words after the tag', () => {
    const name = "Ugurcan";
    const amount = 1300;
    expect(i18n`Hello ${amount}:c, you have ${name} Have a nice day`).to.equal("Hello 1300 EUR, you have Ugurcan Have a nice day");
  });

  it('should return given string with parsed tag to currency and the words after the tag', () => {
    expect(i18n`Hello ${1}:c, ${2}:c`).to.equal("Hello 1 EUR, 2 EUR");
  });
})