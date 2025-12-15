import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseTimestamp } from '../src/microservices/01-timestamp.js';

describe('Microservice 01: Timestamp', () => {
  it('returns valid unix and utc for standard date string', () => {
    const result = parseTimestamp('2015-12-25');
    assert.deepEqual(result, {
      unix: 1451001600000,
      utc: 'Fri, 25 Dec 2015 00:00:00 GMT'
    });
  });

  it('handles unix timestamp string as integer input', () => {
    const result = parseTimestamp('1451001600000');
    assert.deepEqual(result, {
      unix: 1451001600000,
      utc: 'Fri, 25 Dec 2015 00:00:00 GMT'
    });
  });

  it('handles empty parameter by returning current date', () => {
    const before = Date.now();
    const result = parseTimestamp('');
    const after = Date.now();

    assert('unix' in result);
    assert(result.unix >= before && result.unix <= after);
    assert(typeof result.utc === 'string');
  });

  it('returns error object for invalid date parameter', () => {
    const result = parseTimestamp('invalid-date-format');
    assert.deepEqual(result, { error: 'Invalid Date' });
  });
});
