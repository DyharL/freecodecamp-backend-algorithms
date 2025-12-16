import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { UrlShortenerService } from '../src/microservices/03-url-shortener.js';

describe('Microservice 03: URL Shortener', () => {
  it('shortens valid web URL and creates redirect id', async () => {
    const service = new UrlShortenerService();
    const result = await service.shortenUrl('https://freecodecamp.org');

    assert('short_url' in result);
    assert.equal(result.original_url, 'https://freecodecamp.org');
    assert.equal(typeof result.short_url, 'number');

    const redirect = service.getUrl(result.short_url);
    assert.equal(redirect, 'https://freecodecamp.org');
  });

  it('rejects invalid URL without HTTP protocol', async () => {
    const service = new UrlShortenerService();
    const result = await service.shortenUrl('ftp://invalid-domain.com');
    assert.deepEqual(result, { error: 'invalid url' });
  });

  it('rejects malformed string', async () => {
    const service = new UrlShortenerService();
    const result = await service.shortenUrl('not-a-valid-url');
    assert.deepEqual(result, { error: 'invalid url' });
  });
});
