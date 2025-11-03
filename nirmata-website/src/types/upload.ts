/**
 * UploadThing Type Definitions
 * These types support file upload functionality with UploadThing
 */

/**
 * Represents an uploaded file with metadata
 */
export interface UploadFile {
  /** Unique identifier for the uploaded file */
  id: string;
  
  /** Original filename */
  name: string;
  
  /** File size in bytes */
  size: number;
  
  /** MIME type of the file */
  type: string;
  
  /** URL to access the uploaded file */
  url: string;
  
  /** Key/path used to store the file in UploadThing */
  key: string;
  
  /** Timestamp when the file was uploaded */
  uploadedAt: Date;
  
  /** Optional custom metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Represents an upload session with tracking information
 */
export interface UploadSession {
  /** Unique identifier for the upload session */
  sessionId: string;
  
  /** User ID associated with the upload (if authenticated) */
  userId?: string;
  
  /** List of files in this upload session */
  files: UploadFile[];
  
  /** Current status of the upload session */
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  
  /** Timestamp when the session was created */
  createdAt: Date;
  
  /** Timestamp when the session was last updated */
  updatedAt: Date;
  
  /** Error message if the upload failed */
  error?: string;
  
  /** Upload progress percentage (0-100) */
  progress?: number;
}

/**
 * Represents a token for semi-public file access
 * Used to generate temporary or restricted access URLs
 */
export interface UploadToken {
  /** Unique token identifier */
  token: string;
  
  /** File key this token provides access to */
  fileKey: string;
  
  /** Expiration timestamp for the token */
  expiresAt: Date;
  
  /** Access permissions granted by this token */
  permissions: {
    /** Allow read access */
    read: boolean;
    
    /** Allow download */
    download: boolean;
    
    /** Allow sharing */
    share: boolean;
  };
  
  /** Optional usage limit (number of times the token can be used) */
  usageLimit?: number;
  
  /** Current usage count */
  usageCount: number;
  
  /** IP addresses allowed to use this token (if restricted) */
  allowedIPs?: string[];
}

/**
 * Configuration options for file uploads
 */
export interface UploadConfig {
  /** Maximum file size in bytes */
  maxFileSize: number;
  
  /** Allowed file types (MIME types) */
  allowedFileTypes: string[];
  
  /** Maximum number of files per upload */
  maxFiles: number;
  
  /** Whether to require authentication */
  requireAuth: boolean;
}

/**
 * Upload error types for better error handling
 */
export type UploadError = 
  | { type: 'FILE_TOO_LARGE'; maxSize: number; actualSize: number }
  | { type: 'INVALID_FILE_TYPE'; allowedTypes: string[]; actualType: string }
  | { type: 'TOO_MANY_FILES'; maxFiles: number; actualFiles: number }
  | { type: 'UPLOAD_FAILED'; message: string }
  | { type: 'NETWORK_ERROR'; message: string }
  | { type: 'AUTHENTICATION_REQUIRED' }
  | { type: 'PERMISSION_DENIED' };
