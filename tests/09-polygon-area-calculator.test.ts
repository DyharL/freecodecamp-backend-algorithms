import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Rectangle, Square } from '../src/algorithms/09-polygon-area-calculator.js';

describe('Algorithm 09: Polygon Area Calculator', () => {
  it('calculates rectangle dimensions and tiling fits', () => {
    const rect = new Rectangle(10, 5);
    assert.equal(rect.get_area(), 50);
    assert.equal(rect.get_perimeter(), 30);
    assert.equal(rect.get_diagonal(), (10 ** 2 + 5 ** 2) ** 0.5);
    assert.equal(rect.toString(), 'Rectangle(width=10, height=5)');

    const smallRect = new Rectangle(4, 2);
    assert.equal(rect.get_amount_inside(smallRect), 4);
  });

  it('handles square subclass and synchronized sides', () => {
    const sq = new Square(5);
    assert.equal(sq.get_area(), 25);
    assert.equal(sq.get_diagonal(), (5 ** 2 + 5 ** 2) ** 0.5);
    assert.equal(sq.toString(), 'Square(side=5)');

    sq.set_side(4);
    assert.equal(sq.get_area(), 16);
    assert.equal(sq.toString(), 'Square(side=4)');
  });

  it('generates ASCII picture representation', () => {
    const rect = new Rectangle(3, 2);
    assert.equal(rect.get_picture(), '***\n***\n');

    const bigRect = new Rectangle(51, 10);
    assert.equal(bigRect.get_picture(), 'Too big for picture.');
  });
});
