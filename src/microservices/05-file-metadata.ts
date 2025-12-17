/**
 * freeCodeCamp Backend Microservice 05: File Metadata
 * Multipart/form-data upload inspection engine returning file name, MIME type, and byte size.
 */

export interface FileMetadataResult {
  name: string;
  type: string;
  size: number;
}

export interface FileMetadataError {
  error: string;
}

export function extractFileMetadata(
  filename?: string | null,
  mimeType?: string | null,
  byteSize?: number | null
): FileMetadataResult | FileMetadataError {
  if (!filename || filename.trim() === '') {
    return { error: 'No file uploaded' };
  }

  const name = filename.trim();
  const type = mimeType && mimeType.trim() !== '' ? mimeType.trim() : 'application/octet-stream';
  const size = typeof byteSize === 'number' && byteSize >= 0 ? byteSize : 0;

  return {
    name,
    type,
    size
  };
}
