/**
 * freeCodeCamp Backend Microservice 01: Timestamp
 * Converts incoming date strings or unix timestamps into normalized ISO & Unix objects.
 */

export interface TimestampResult {
  unix: number;
  utc: string;
}

export interface TimestampError {
  error: string;
}

export function parseTimestamp(dateParam?: string | null): TimestampResult | TimestampError {
  // If no date parameter is supplied, return current timestamp
  if (!dateParam || dateParam.trim() === '') {
    const now = new Date();
    return {
      unix: now.getTime(),
      utc: now.toUTCString()
    };
  }

  const trimmed = dateParam.trim();
  let date: Date;

  // Check if parameter is a pure integer timestamp (e.g. 1451001600000)
  if (/^-?\d+$/.test(trimmed)) {
    date = new Date(parseInt(trimmed, 10));
  } else {
    date = new Date(trimmed);
  }

  if (isNaN(date.getTime())) {
    return { error: 'Invalid Date' };
  }

  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
}
