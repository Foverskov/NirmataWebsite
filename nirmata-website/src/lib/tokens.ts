/**
 * Token Storage and Management System
 * Manages upload tokens with expiration, usage limits, and metadata
 */

export interface UploadTokenMetadata {
  /** Unique token identifier */
  token: string;
  
  /** When the token was created */
  createdAt: Date;
  
  /** When the token expires */
  expiresAt: Date;
  
  /** Maximum number of uploads allowed with this token */
  maxUploads: number;
  
  /** Current number of uploads performed with this token */
  currentUploads: number;
  
  /** User ID or identifier associated with this token */
  associatedUser?: string;
  
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  
  /** Whether the token has been revoked */
  revoked: boolean;
  
  /** IP addresses that last used this token (for audit trail) */
  lastUsedBy?: string[];
}

/**
 * In-memory token store
 * 
 * ⚠️ PRODUCTION WARNING:
 * This in-memory implementation will lose all tokens on server restart.
 * For production deployments:
 * 1. Replace with Redis for distributed caching
 * 2. Use a database (PostgreSQL, MongoDB) for persistence
 * 3. Implement token synchronization across multiple server instances
 * 
 * See README.md for migration examples
 */
class TokenStore {
  private tokens: Map<string, UploadTokenMetadata>;
  
  constructor() {
    this.tokens = new Map();
  }
  
  /**
   * Store a new token
   */
  set(tokenData: UploadTokenMetadata): void {
    this.tokens.set(tokenData.token, tokenData);
  }
  
  /**
   * Retrieve a token by its identifier
   */
  get(token: string): UploadTokenMetadata | undefined {
    return this.tokens.get(token);
  }
  
  /**
   * Delete a token
   */
  delete(token: string): boolean {
    return this.tokens.delete(token);
  }
  
  /**
   * Check if a token exists
   */
  has(token: string): boolean {
    return this.tokens.has(token);
  }
  
  /**
   * Get all tokens (for admin purposes)
   */
  getAll(): UploadTokenMetadata[] {
    return Array.from(this.tokens.values());
  }
  
  /**
   * Get active (non-expired, non-revoked) tokens
   */
  getActive(): UploadTokenMetadata[] {
    const now = new Date();
    return this.getAll().filter(
      token => !token.revoked && token.expiresAt > now
    );
  }
  
  /**
   * Clean up expired tokens
   */
  cleanup(): number {
    const now = new Date();
    let removed = 0;
    
    for (const [token, data] of this.tokens.entries()) {
      if (data.expiresAt < now) {
        this.tokens.delete(token);
        removed++;
      }
    }
    
    return removed;
  }
  
  /**
   * Revoke a token
   */
  revoke(token: string): boolean {
    const tokenData = this.tokens.get(token);
    if (tokenData) {
      tokenData.revoked = true;
      return true;
    }
    return false;
  }
  
  /**
   * Increment the upload count for a token
   */
  incrementUploads(token: string): boolean {
    const tokenData = this.tokens.get(token);
    if (tokenData) {
      tokenData.currentUploads++;
      return true;
    }
    return false;
  }
  
  /**
   * Track IP address usage
   */
  trackUsage(token: string, ipAddress: string): boolean {
    const tokenData = this.tokens.get(token);
    if (tokenData) {
      if (!tokenData.lastUsedBy) {
        tokenData.lastUsedBy = [];
      }
      if (!tokenData.lastUsedBy.includes(ipAddress)) {
        tokenData.lastUsedBy.push(ipAddress);
      }
      return true;
    }
    return false;
  }
}

// Singleton instance
const tokenStore = new TokenStore();

// Cleanup expired tokens every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const removed = tokenStore.cleanup();
    if (removed > 0) {
      console.log(`[TokenStore] Cleaned up ${removed} expired tokens`);
    }
  }, 60 * 60 * 1000); // 1 hour
}

export default tokenStore;
