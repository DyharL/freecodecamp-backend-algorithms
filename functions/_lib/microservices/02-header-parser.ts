/**
 * freeCodeCamp Backend Microservice 02: Request Header Parser
 * Extracts client IP address, accepted language, and client software/OS from incoming HTTP headers.
 */

export interface HeaderParserResult {
  ipaddress: string;
  language: string;
  software: string;
}

export interface RequestHeaderInput {
  ip?: string | null;
  forwardedFor?: string | null;
  acceptLanguage?: string | null;
  userAgent?: string | null;
}

export function parseHeaders(input: RequestHeaderInput): HeaderParserResult {
  // Extract client IP address (prefer x-forwarded-for if behind reverse proxy / CDN)
  let ip = '127.0.0.1';
  if (input.forwardedFor && input.forwardedFor.trim() !== '') {
    ip = input.forwardedFor.split(',')[0].trim();
  } else if (input.ip && input.ip.trim() !== '') {
    ip = input.ip.trim();
  }

  // Strip IPv6-mapped IPv4 prefix if present (e.g., ::ffff:127.0.0.1)
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }

  const language = input.acceptLanguage?.trim() || 'en-US,en;q=0.5';
  const software = input.userAgent?.trim() || 'Mozilla/5.0';

  return {
    ipaddress: ip,
    language,
    software
  };
}
