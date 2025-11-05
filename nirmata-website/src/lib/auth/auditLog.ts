/**
 * Audit Trail and Logging System
 * Tracks all upload attempts and token usage for monitoring and security
 */

export interface AuditLogEntry {
  /** Unique identifier for this log entry */
  id: string;
  
  /** Timestamp of the event */
  timestamp: Date;
  
  /** Type of event */
  eventType: 'upload_attempt' | 'upload_success' | 'upload_failure' | 'token_validation' | 'token_generation' | 'token_revocation';
  
  /** Token used (if applicable) */
  token?: string;
  
  /** IP address of the client */
  ipAddress?: string;
  
  /** User identifier (if available) */
  userId?: string;
  
  /** Additional event details */
  details: Record<string, unknown>;
  
  /** Whether the action was successful */
  success: boolean;
  
  /** Error message (if failed) */
  errorMessage?: string;
}

/**
 * In-memory audit log storage
 * 
 * ⚠️ PRODUCTION WARNING:
 * This in-memory implementation will lose all logs on server restart.
 * For production deployments:
 * 1. Use a database (PostgreSQL, MongoDB) for persistent storage
 * 2. Consider external logging services (CloudWatch, Elasticsearch, Datadog)
 * 3. Implement log rotation and archival policies
 * 4. Set up alerting for security events
 */
class AuditLog {
  private logs: AuditLogEntry[];
  private maxSize: number;
  
  constructor(maxSize: number = 10000) {
    this.logs = [];
    this.maxSize = maxSize;
  }
  
  /**
   * Add a new log entry
   */
  log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const logEntry: AuditLogEntry = {
      ...entry,
      id: this.generateId(),
      timestamp: new Date(),
    };
    
    this.logs.push(logEntry);
    
    // Keep only the most recent entries
    if (this.logs.length > this.maxSize) {
      this.logs = this.logs.slice(-this.maxSize);
    }
    
    // Also log to console for immediate visibility
    this.logToConsole(logEntry);
  }
  
  /**
   * Log upload attempt
   */
  logUploadAttempt(params: {
    token?: string;
    ipAddress?: string;
    userId?: string;
    fileName?: string;
    fileSize?: number;
    success: boolean;
    errorMessage?: string;
  }): void {
    this.log({
      eventType: params.success ? 'upload_success' : 'upload_failure',
      token: params.token,
      ipAddress: params.ipAddress,
      userId: params.userId,
      success: params.success,
      errorMessage: params.errorMessage,
      details: {
        fileName: params.fileName,
        fileSize: params.fileSize,
      },
    });
  }
  
  /**
   * Log token validation
   */
  logTokenValidation(params: {
    token: string;
    ipAddress?: string;
    success: boolean;
    reason?: string;
  }): void {
    this.log({
      eventType: 'token_validation',
      token: params.token,
      ipAddress: params.ipAddress,
      success: params.success,
      errorMessage: params.success ? undefined : params.reason,
      details: {},
    });
  }
  
  /**
   * Log token generation
   */
  logTokenGeneration(params: {
    token: string;
    userId?: string;
    expiresAt: Date;
    maxUploads: number;
  }): void {
    this.log({
      eventType: 'token_generation',
      token: params.token,
      userId: params.userId,
      success: true,
      details: {
        expiresAt: params.expiresAt,
        maxUploads: params.maxUploads,
      },
    });
  }
  
  /**
   * Log token revocation
   */
  logTokenRevocation(params: {
    token: string;
    userId?: string;
    reason?: string;
  }): void {
    this.log({
      eventType: 'token_revocation',
      token: params.token,
      userId: params.userId,
      success: true,
      details: {
        reason: params.reason,
      },
    });
  }
  
  /**
   * Get all logs
   */
  getAll(): AuditLogEntry[] {
    return [...this.logs];
  }
  
  /**
   * Get logs filtered by criteria
   */
  query(filter: {
    eventType?: AuditLogEntry['eventType'];
    token?: string;
    ipAddress?: string;
    userId?: string;
    success?: boolean;
    startDate?: Date;
    endDate?: Date;
  }): AuditLogEntry[] {
    return this.logs.filter(log => {
      if (filter.eventType && log.eventType !== filter.eventType) {
        return false;
      }
      if (filter.token && log.token !== filter.token) {
        return false;
      }
      if (filter.ipAddress && log.ipAddress !== filter.ipAddress) {
        return false;
      }
      if (filter.userId && log.userId !== filter.userId) {
        return false;
      }
      if (filter.success !== undefined && log.success !== filter.success) {
        return false;
      }
      if (filter.startDate && log.timestamp < filter.startDate) {
        return false;
      }
      if (filter.endDate && log.timestamp > filter.endDate) {
        return false;
      }
      return true;
    });
  }
  
  /**
   * Get logs for a specific token
   */
  getByToken(token: string): AuditLogEntry[] {
    return this.query({ token });
  }
  
  /**
   * Get logs for a specific IP address
   */
  getByIp(ipAddress: string): AuditLogEntry[] {
    return this.query({ ipAddress });
  }
  
  /**
   * Get recent failed attempts
   */
  getFailedAttempts(limit: number = 100): AuditLogEntry[] {
    return this.logs
      .filter(log => !log.success)
      .slice(-limit);
  }
  
  /**
   * Get statistics
   */
  getStats(): {
    total: number;
    successful: number;
    failed: number;
    byEventType: Record<string, number>;
  } {
    const stats = {
      total: this.logs.length,
      successful: 0,
      failed: 0,
      byEventType: {} as Record<string, number>,
    };
    
    for (const log of this.logs) {
      if (log.success) {
        stats.successful++;
      } else {
        stats.failed++;
      }
      
      stats.byEventType[log.eventType] = (stats.byEventType[log.eventType] || 0) + 1;
    }
    
    return stats;
  }
  
  /**
   * Clear old logs
   */
  clear(olderThan?: Date): number {
    if (!olderThan) {
      const count = this.logs.length;
      this.logs = [];
      return count;
    }
    
    const originalLength = this.logs.length;
    this.logs = this.logs.filter(log => log.timestamp >= olderThan);
    return originalLength - this.logs.length;
  }
  
  /**
   * Generate a unique ID for log entries
   */
  private generateId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback using timestamp and random component
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
  
  /**
   * Log to console for immediate visibility
   */
  private logToConsole(entry: AuditLogEntry): void {
    const level = entry.success ? 'info' : 'warn';
    const icon = entry.success ? '✓' : '✗';
    
    console[level](
      `[AuditLog] ${icon} ${entry.eventType} - Token: ${entry.token?.substring(0, 8)}... IP: ${entry.ipAddress || 'N/A'} ${entry.errorMessage ? `Error: ${entry.errorMessage}` : ''}`
    );
  }
}

// Singleton instance
const auditLog = new AuditLog();

export default auditLog;

/**
 * Helper functions for common logging operations
 */

export function logUploadSuccess(params: {
  token: string;
  ipAddress?: string;
  userId?: string;
  fileName: string;
  fileSize: number;
}): void {
  auditLog.logUploadAttempt({
    ...params,
    success: true,
  });
}

export function logUploadFailure(params: {
  token: string;
  ipAddress?: string;
  userId?: string;
  fileName?: string;
  fileSize?: number;
  errorMessage: string;
}): void {
  auditLog.logUploadAttempt({
    ...params,
    success: false,
  });
}
