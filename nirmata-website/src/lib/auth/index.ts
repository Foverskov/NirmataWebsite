/**
 * Authentication and Authorization Module
 * Central export point for all auth-related functionality
 */

// Token generation
export {
  generateUploadToken,
  revokeToken,
  deleteToken,
  getTokenInfo,
  listActiveTokens,
  type GenerateTokenOptions,
  type GenerateTokenResult,
} from './generateUploadToken';

// Token validation
export {
  validateUploadToken,
  isTokenValid,
  getRemainingUploads,
  isTokenExpired,
  isTokenRevoked,
  getValidationDetails,
  type ValidationResult,
  type ValidationOptions,
} from './validateUploadToken';

// Audit logging
export {
  default as auditLog,
  logUploadSuccess,
  logUploadFailure,
  type AuditLogEntry,
} from './auditLog';

// Token store
export { default as tokenStore, type UploadTokenMetadata } from '../tokens';
