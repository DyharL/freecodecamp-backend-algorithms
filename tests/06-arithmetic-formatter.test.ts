import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { arithmeticArranger } from '../src/algorithms/06-arithmetic-formatter.js';

describe('Algorithm 06: Arithmetic Formatter', () => {
  it('formats standard arithmetic problems vertically', () => {
    const problems = ['32 + 698', '3801 - 2', '45 + 43', '123 + 49'];
    const arranged = arithmeticArranger(problems);
    const expected =
      '   32      3801      45      123\n' +
      '+ 698    -    2    + 43    +  49\n' +
      '-----    ------    ----    -----';
    assert.equal(arranged, expected);
  });

  it('displays answers when showAnswers is true', () => {
    const problems = ['32 + 8', '1 - 3801', '9999 + 9999', '523 - 49'];
    const arranged = arithmeticArranger(problems, true);
    const expected =
      '  32         1      9999      523\n' +
      '+  8    - 3801    + 9999    -  49\n' +
      '----    ------    ------    -----\n' +
      '  40     -3800     19998      474';
    assert.equal(arranged, expected);
  });

  it('validates maximum problems count', () => {
    const result = arithmeticArranger(['1 + 1', '2 + 2', '3 + 3', '4 + 4', '5 + 5', '6 + 6']);
    assert.equal(result, 'Error: Too many problems.');
  });

  it('validates operators strictly', () => {
    const result = arithmeticArranger(['3 * 4']);
    assert.equal(result, "Error: Operator must be '+' or '-'.");
  });

  it('validates digit characters only', () => {
    const result = arithmeticArranger(['24 + 4a']);
    assert.equal(result, 'Error: Numbers must only contain digits.');
  });

  it('validates 4-digit maximum limit', () => {
    const result = arithmeticArranger(['12345 + 4']);
    assert.equal(result, 'Error: Numbers cannot be more than four digits.');
  });
});
