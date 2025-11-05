/**
 * Token Validation Utility
 * Validates upload tokens and enforces access control rules
 */

import tokenStore, { type UploadTokenMetadata } from '../tokens';

export interface ValidationResult {
  /** Whether the token is valid */
  valid: boolean;
  
  /** Reason for validation failure (if invalid) */
  reason?: string;
  
  /** Token metadata (if valid) */
  tokenData?: UploadTokenMetadata;
}

export interface ValidationOptions {
  /** IP address to track for audit trail */
  ipAddress?: string;
  
  /** Whether to increment upload count on validation */
  incrementUsage?: boolean;
}

/**
 * Validate an upload token
 * 
 * @param token - The token to validate
 * @param options - Validation options
 * @returns Validation result with token data if valid
 * 
 * @example
 * ```typescript
 * const result = validateUploadToken('abc123', {
 *   ipAddress: '192.168.1.1',
 *   incrementUsage: true
 * });
 * 
 * if (result.valid) {
 *   console.log('Token is valid!');
 *   console.log('Uploads remaining:', result.tokenData!.maxUploads - result.tokenData!.currentUploads);
 * } else {
 *   console.log('Invalid token:', result.reason);
 * }
 * ```
 */
export function validateUploadToken(
  token: string,
  options: ValidationOptions = {}
): ValidationResult {
  const { ipAddress, incrementUsage = false } = options;
  
  // Check if token exists
  const tokenData = tokenStore.get(token);
  
  if (!tokenData) {
    return {
      valid: false,
      reason: 'Token not found',
    };
  }
  
  // Check if token is revoked
  if (tokenData.revoked) {
    return {
      valid: false,
      reason: 'Token has been revoked',
    };
  }
  
  // Check if token is expired
  const now = new Date();
  if (tokenData.expiresAt < now) {
    return {
      valid: false,
      reason: 'Token has expired',
    };
  }
  
  // Check if upload limit is reached
  if (tokenData.currentUploads >= tokenData.maxUploads) {
    return {
      valid: false,
      reason: 'Upload limit reached for this token',
    };
  }
  
  // Track IP address if provided
  if (ipAddress) {
    tokenStore.trackUsage(token, ipAddress);
  }
  
  // Increment usage count if requested
  if (incrementUsage) {
    tokenStore.incrementUploads(token);
  }
  
  // Token is valid
  return {
    valid: true,
    tokenData,
  };
}

/**
 * Check if a token is valid without side effects
 * (Does not increment usage or track IP)
 * 
 * @param token - The token to check
 * @returns true if token is valid, false otherwise
 */
export function isTokenValid(token: string): boolean {
  const result = validateUploadToken(token, { incrementUsage: false });
  return result.valid;
}

/**
 * Get remaining uploads for a token
 * 
 * @param token - The token to check
 * @returns Number of uploads remaining, or -1 if token is invalid
 */
export function getRemainingUploads(token: string): number {
  const tokenData = tokenStore.get(token);
  
  if (!tokenData) {
    return -1;
  }
  
  return Math.max(0, tokenData.maxUploads - tokenData.currentUploads);
}

/**
 * Check if a token is expired
 * 
 * @param token - The token to check
 * @returns true if token is expired or doesn't exist, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  const tokenData = tokenStore.get(token);
  
  if (!tokenData) {
    return true;
  }
  
  const now = new Date();
  return tokenData.expiresAt < now;
}

/**
 * Check if a token is revoked
 * 
 * @param token - The token to check
 * @returns true if token is revoked or doesn't exist, false otherwise
 */
export function isTokenRevoked(token: string): boolean {
  const tokenData = tokenStore.get(token);
  
  if (!tokenData) {
    return true;
  }
  
  return tokenData.revoked;
}

/**
 * Get validation details for a token
 * Useful for debugging and admin interfaces
 * 
 * @param token - The token to check
 * @returns Detailed validation information
 */
export function getValidationDetails(token: string): {
  exists: boolean;
  expired: boolean;
  revoked: boolean;
  limitReached: boolean;
  remainingUploads: number;
  expiresAt?: Date;
  createdAt?: Date;
} {
  const tokenData = tokenStore.get(token);
  
  if (!tokenData) {
    return {
      exists: false,
      expired: true,
      revoked: true,
      limitReached: true,
      remainingUploads: 0,
    };
  }
  
  const now = new Date();
  const remainingUploads = Math.max(0, tokenData.maxUploads - tokenData.currentUploads);
  
  return {
    exists: true,
    expired: tokenData.expiresAt < now,
    revoked: tokenData.revoked,
    limitReached: tokenData.currentUploads >= tokenData.maxUploads,
    remainingUploads,
    expiresAt: tokenData.expiresAt,
    createdAt: tokenData.createdAt,
  };
}
