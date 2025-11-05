/**
 * Token Generation Utility
 * Generates secure, unique tokens for upload authorization
 */

import tokenStore, { type UploadTokenMetadata } from '../tokens';

export interface GenerateTokenOptions {
  /** Duration in milliseconds until the token expires */
  expiresIn?: number;
  
  /** Maximum number of uploads allowed with this token */
  maxUploads?: number;
  
  /** User ID or identifier to associate with this token */
  associatedUser?: string;
  
  /** Additional metadata to store with the token */
  metadata?: Record<string, unknown>;
}

export interface GenerateTokenResult {
  /** The generated token */
  token: string;
  
  /** When the token expires */
  expiresAt: Date;
  
  /** Maximum uploads allowed */
  maxUploads: number;
}

/**
 * Generate a cryptographically secure random token
 */
function generateSecureToken(length: number = 32): string {
  // Use crypto.randomBytes in Node.js or crypto.getRandomValues in browser
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    // Use UUID for better uniqueness
    return crypto.randomUUID().replace(/-/g, '');
  }
  
  // Fallback to base64 random string
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  // Use crypto.getRandomValues if available
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      token += chars[randomValues[i] % chars.length];
    }
  } else {
    // Fallback to Math.random (less secure, for testing only)
    for (let i = 0; i < length; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return token;
}

/**
 * Generate a new upload token with specified options
 * 
 * @param options - Token generation options
 * @returns Generated token information
 * 
 * @example
 * ```typescript
 * const result = generateUploadToken({
 *   expiresIn: 24 * 60 * 60 * 1000, // 24 hours
 *   maxUploads: 10,
 *   associatedUser: 'user@example.com'
 * });
 * 
 * console.log(`Token: ${result.token}`);
 * console.log(`Expires at: ${result.expiresAt}`);
 * ```
 */
export function generateUploadToken(
  options: GenerateTokenOptions = {}
): GenerateTokenResult {
  const {
    expiresIn = 7 * 24 * 60 * 60 * 1000, // Default: 7 days
    maxUploads = 50, // Default: 50 uploads
    associatedUser,
    metadata,
  } = options;
  
  // Generate unique token
  let token: string;
  do {
    token = generateSecureToken(32);
  } while (tokenStore.has(token)); // Ensure uniqueness
  
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expiresIn);
  
  // Create token metadata
  const tokenData: UploadTokenMetadata = {
    token,
    createdAt: now,
    expiresAt,
    maxUploads,
    currentUploads: 0,
    associatedUser,
    metadata,
    revoked: false,
  };
  
  // Store the token
  tokenStore.set(tokenData);
  
  return {
    token,
    expiresAt,
    maxUploads,
  };
}

/**
 * Revoke a token (prevent further use)
 * 
 * @param token - The token to revoke
 * @returns true if token was found and revoked, false otherwise
 */
export function revokeToken(token: string): boolean {
  return tokenStore.revoke(token);
}

/**
 * Delete a token completely
 * 
 * @param token - The token to delete
 * @returns true if token was found and deleted, false otherwise
 */
export function deleteToken(token: string): boolean {
  return tokenStore.delete(token);
}

/**
 * Get token information
 * 
 * @param token - The token to look up
 * @returns Token metadata if found, undefined otherwise
 */
export function getTokenInfo(token: string): UploadTokenMetadata | undefined {
  return tokenStore.get(token);
}

/**
 * List all active tokens
 * 
 * @returns Array of active token metadata
 */
export function listActiveTokens(): UploadTokenMetadata[] {
  return tokenStore.getActive();
}
