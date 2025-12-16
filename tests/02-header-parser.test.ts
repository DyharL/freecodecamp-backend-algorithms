import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseHeaders } from '../src/microservices/02-header-parser.js';

describe('Microservice 02: Request Header Parser', () => {
  it('extracts IP, language, and software from headers', () => {
    const result = parseHeaders({
      ip: '192.168.1.1',
      forwardedFor: '203.0.113.195, 70.41.3.18',
      acceptLanguage: 'en-US,en;q=0.9,fr;q=0.8',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
    });

    assert.equal(result.ipaddress, '203.0.113.195');
    assert.equal(result.language, 'en-US,en;q=0.9,fr;q=0.8');
    assert.equal(result.software, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
  });

  it('falls back to socket IP when forwarded-for is absent', () => {
    const result = parseHeaders({
      ip: '::ffff:127.0.0.1',
      forwardedFor: null,
      acceptLanguage: null,
      userAgent: null
    });

    assert.equal(result.ipaddress, '127.0.0.1');
    assert.equal(result.language, 'en-US,en;q=0.5');
    assert.equal(result.software, 'Mozilla/5.0');
  });
});
