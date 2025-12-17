import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractFileMetadata } from '../src/microservices/05-file-metadata.js';

describe('Microservice 05: File Metadata', () => {
  it('extracts filename, mimetype and byte size', () => {
    const result = extractFileMetadata('avatar.png', 'image/png', 204850);
    assert.deepEqual(result, {
      name: 'avatar.png',
      type: 'image/png',
      size: 204850
    });
  });

  it('handles missing file gracefully', () => {
    const result = extractFileMetadata(null);
    assert.deepEqual(result, { error: 'No file uploaded' });
  });
});
