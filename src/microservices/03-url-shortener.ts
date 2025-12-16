/**
 * freeCodeCamp Backend Microservice 03: URL Shortener
 * Validates web URLs, verifies DNS host resolution, and creates short redirects.
 */

import dns from 'node:dns/promises';

export interface ShortUrlResult {
  original_url: string;
  short_url: number;
}

export interface ShortUrlError {
  error: string;
}

export class UrlShortenerService {
  private urlDatabase: Map<number, string> = new Map();
  private reverseLookup: Map<string, number> = new Map();
  private counter: number = 1;

  constructor() {
    // Seed initial demo link
    this.saveUrl('https://freecodecamp.org');
  }

  public async shortenUrl(rawUrl?: string | null): Promise<ShortUrlResult | ShortUrlError> {
    if (!rawUrl || typeof rawUrl !== 'string') {
      return { error: 'invalid url' };
    }

    const trimmed = rawUrl.trim();

    // Must be valid HTTP/HTTPS URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(trimmed);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return { error: 'invalid url' };
      }
    } catch {
      return { error: 'invalid url' };
    }

    // Check if already in cache
    if (this.reverseLookup.has(trimmed)) {
      const existingId = this.reverseLookup.get(trimmed)!;
      return { original_url: trimmed, short_url: existingId };
    }

    // Perform DNS verification on the hostname
    try {
      await dns.lookup(parsedUrl.hostname);
    } catch {
      // If DNS lookup fails, return invalid url
      return { error: 'invalid url' };
    }

    const id = this.saveUrl(trimmed);
    return { original_url: trimmed, short_url: id };
  }

  public getUrl(shortUrlId: number | string): string | null {
    const id = typeof shortUrlId === 'string' ? parseInt(shortUrlId, 10) : shortUrlId;
    if (isNaN(id) || !this.urlDatabase.has(id)) {
      return null;
    }
    return this.urlDatabase.get(id) || null;
  }

  private saveUrl(url: string): number {
    const id = this.counter++;
    this.urlDatabase.set(id, url);
    this.reverseLookup.set(url, id);
    return id;
  }
}
