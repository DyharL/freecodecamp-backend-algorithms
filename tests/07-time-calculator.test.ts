import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { addTime } from '../src/algorithms/07-time-calculator.js';

describe('Algorithm 07: Time Calculator', () => {
  it('adds duration within same day', () => {
    assert.equal(addTime('3:00 PM', '3:10'), '6:10 PM');
    assert.equal(addTime('11:30 AM', '2:32'), '2:02 PM');
  });

  it('handles next day rollover correctly', () => {
    assert.equal(addTime('11:43 PM', '0:20'), '12:03 AM (next day)');
    assert.equal(addTime('10:10 PM', '3:30'), '1:40 AM (next day)');
  });

  it('handles multiple days rollover', () => {
    assert.equal(addTime('6:30 PM', '205:12'), '7:42 AM (9 days later)');
  });

  it('tracks day of the week case-insensitively', () => {
    assert.equal(addTime('11:40 AM', '0:25'), '12:05 PM');
    assert.equal(addTime('3:30 PM', '2:12', 'Monday'), '5:42 PM, Monday');
    assert.equal(addTime('2:59 AM', '24:00', 'saturDay'), '2:59 AM, Sunday (next day)');
    assert.equal(addTime('11:59 PM', '24:05', 'Wednesday'), '12:04 AM, Friday (2 days later)');
  });
});
