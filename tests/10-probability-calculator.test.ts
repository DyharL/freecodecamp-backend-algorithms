import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Hat, experiment } from '../src/algorithms/10-probability-calculator.js';

describe('Algorithm 10: Probability Calculator', () => {
  it('initializes hat and performs random ball drawing', () => {
    const hat = new Hat({ red: 3, blue: 2 });
    assert.equal(hat.contents.length, 5);

    const drawn = hat.draw(2);
    assert.equal(drawn.length, 2);
    assert.equal(hat.contents.length, 3);

    const remaining = hat.draw(10);
    assert.equal(remaining.length, 3);
    assert.equal(hat.contents.length, 0);
  });

  it('runs Monte Carlo experiment and returns probability within expected statistical range', () => {
    const hat = new Hat({ blue: 4, red: 2, green: 6 });
    const probability = experiment(
      hat,
      { blue: 2, red: 1 },
      4,
      1000
    );

    // Probability for drawing at least 2 blue and 1 red from 4 draws is approx 0.11 - 0.23
    assert(probability > 0.05 && probability < 0.35);
  });
});
