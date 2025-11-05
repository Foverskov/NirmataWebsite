# Authentication System Implementation

## Overview

This document describes the authentication and authorization system implemented for the upload page functionality. The system provides token-based access control for semi-public file uploads.

## Architecture

The authentication system consists of four main components:

```
┌─────────────────────────────────────────────────────────────┐
│                        Middleware                            │
│  - Route Protection                                          │
│  - Token Extraction                                          │
│  - Rate Limiting                                             │
└─────────────┬───────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Token Validation                           │
│  - Existence Check                                           │
│  - Expiration Check                                          │
│  - Usage Limit Check                                         │
│  - Revocation Check                                          │
└─────────────┬───────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Token Storage                            │
│  - In-memory store (dev)                                     │
│  - Token metadata                                            │
│  - Lifecycle management                                      │
└─────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Audit Logging                            │
│  - Event tracking                                            │
│  - IP tracking                                               │
│  - Statistics                                                │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. Token Storage (`src/lib/tokens.ts`)

**Purpose**: Manages token lifecycle and metadata

**Key Features**:
- In-memory Map-based storage
- Automatic cleanup of expired tokens
- CRUD operations for token management
- Token metadata tracking

**Data Structure**:
```typescript
interface UploadTokenMetadata {
  token: string;              // Unique identifier
  createdAt: Date;            // Creation timestamp
  expiresAt: Date;            // Expiration timestamp
  maxUploads: number;         // Upload limit
  currentUploads: number;     // Current count
  associatedUser?: string;    // User identifier
  metadata?: Record<...>;     // Custom data
  revoked: boolean;           // Revocation status
  lastUsedBy?: string[];      // IP addresses
}
```

### 2. Token Generation (`src/lib/auth/generateUploadToken.ts`)

**Purpose**: Creates secure, unique tokens for authorization

**Key Features**:
- Cryptographically secure token generation
- Configurable expiration (default: 7 days)
- Configurable upload limits (default: 50 uploads)
- User association
- Custom metadata support

**Usage**:
```typescript
import { generateUploadToken } from '@/lib/auth';

const { token, expiresAt } = generateUploadToken({
  expiresIn: 24 * 60 * 60 * 1000, // 24 hours
  maxUploads: 10,
  associatedUser: 'user@example.com',
});
```

### 3. Token Validation (`src/lib/auth/validateUploadToken.ts`)

**Purpose**: Validates tokens and enforces access control

**Key Features**:
- Multi-stage validation (existence, expiration, revocation, limits)
- IP tracking for audit trail
- Optional usage increment
- Detailed validation results

**Usage**:
```typescript
import { validateUploadToken } from '@/lib/auth';

const result = validateUploadToken('token', {
  ipAddress: '192.168.1.1',
  incrementUsage: true,
});

if (result.valid) {
  // Proceed with upload
} else {
  // Show error: result.reason
}
```

### 4. Middleware (`src/middleware.ts`)

**Purpose**: Protects routes and enforces rate limiting

**Protected Routes**:
- `/upload/*` - Upload page and sub-routes
- `/api/upload/*` - Upload API endpoints

**Key Features**:
- Token extraction from multiple sources:
  - Query parameter: `?token=xyz123`
  - Authorization header: `Bearer xyz123`
  - Custom header: `X-Upload-Token: xyz123`
- Rate limiting: 60 requests/minute per IP
- Graceful error handling
- Request metadata injection

### 5. Audit Logging (`src/lib/auth/auditLog.ts`)

**Purpose**: Tracks all authentication and upload events

**Key Features**:
- Event logging (generation, validation, upload, revocation)
- IP tracking
- Success/failure tracking
- Query interface
- Statistics generation

**Usage**:
```typescript
import { auditLog, logUploadSuccess } from '@/lib/auth';

// Log successful upload
logUploadSuccess({
  token: 'abc123',
  ipAddress: '192.168.1.1',
  userId: 'user@example.com',
  fileName: 'song.mp3',
  fileSize: 5242880,
});

// Query logs
const logs = auditLog.getByToken('abc123');
const stats = auditLog.getStats();
```

## Security Features

### 1. Cryptographically Secure Tokens

Tokens are generated using `crypto.randomUUID()` or `crypto.getRandomValues()`, ensuring unpredictability and uniqueness.

### 2. Token Expiration

All tokens have a configurable expiration time (default: 7 days). Expired tokens are automatically rejected and periodically cleaned up.

### 3. Usage Limits

Each token has a maximum upload count (default: 50). Once the limit is reached, the token is automatically invalidated.

### 4. IP Tracking

All token usage is tracked by IP address, creating an audit trail for security monitoring.

### 5. Rate Limiting

Middleware enforces rate limits (60 requests/minute per IP) to prevent abuse and brute force attacks.

### 6. Token Revocation

Tokens can be manually revoked before expiration, immediately invalidating them.

### 7. Audit Trail

Complete event logging provides visibility into all authentication and upload activities.

## Workflow

### 1. Token Generation Flow

```
Admin/System → generateUploadToken()
              → Store token metadata
              → Return token + expiration
              → Generate shareable link
```

### 2. Upload Request Flow

```
Client → Request /upload?token=xyz
       → Middleware extracts token
       → Middleware validates token
       → Middleware checks rate limit
       → If valid: proceed
       → If invalid: return error
```

### 3. Upload Processing Flow

```
API Endpoint → Validate token
             → Increment usage count
             → Process upload
             → Log success/failure
             → Return result
```

## API Reference

### Generate Token

```typescript
generateUploadToken(options: {
  expiresIn?: number;        // Duration in ms (default: 7 days)
  maxUploads?: number;       // Max uploads (default: 50)
  associatedUser?: string;   // User identifier
  metadata?: Record<...>;    // Custom data
}): {
  token: string;
  expiresAt: Date;
  maxUploads: number;
}
```

### Validate Token

```typescript
validateUploadToken(
  token: string,
  options?: {
    ipAddress?: string;      // Track IP address
    incrementUsage?: boolean; // Count as upload
  }
): {
  valid: boolean;
  reason?: string;
  tokenData?: UploadTokenMetadata;
}
```

### Quick Validation

```typescript
isTokenValid(token: string): boolean
getRemainingUploads(token: string): number
isTokenExpired(token: string): boolean
isTokenRevoked(token: string): boolean
```

### Token Management

```typescript
revokeToken(token: string): boolean
deleteToken(token: string): boolean
getTokenInfo(token: string): UploadTokenMetadata | undefined
listActiveTokens(): UploadTokenMetadata[]
```

### Audit Logging

```typescript
logUploadSuccess(params: {...}): void
logUploadFailure(params: {...}): void
auditLog.getByToken(token: string): AuditLogEntry[]
auditLog.getStats(): Statistics
```

## Production Deployment

### Current Implementation (Development)

✅ Suitable for:
- Local development
- Testing
- Single-server deployments
- Low-traffic scenarios

❌ Limitations:
- Tokens lost on restart
- No multi-instance support
- Limited audit log retention

### Production Recommendations

#### 1. Replace In-Memory Token Store

**Option A: Redis**
```typescript
import Redis from 'ioredis';

class RedisTokenStore {
  private redis = new Redis(process.env.REDIS_URL);
  
  async set(tokenData: UploadTokenMetadata): Promise<void> {
    await this.redis.setex(
      `token:${tokenData.token}`,
      Math.floor((tokenData.expiresAt.getTime() - Date.now()) / 1000),
      JSON.stringify(tokenData)
    );
  }
  
  // ... other methods
}
```

**Option B: Database (PostgreSQL)**
```sql
CREATE TABLE upload_tokens (
  token VARCHAR(64) PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  max_uploads INTEGER NOT NULL,
  current_uploads INTEGER NOT NULL DEFAULT 0,
  associated_user VARCHAR(255),
  metadata JSONB,
  revoked BOOLEAN DEFAULT FALSE,
  last_used_by TEXT[]
);

CREATE INDEX idx_expires_at ON upload_tokens(expires_at);
CREATE INDEX idx_associated_user ON upload_tokens(associated_user);
```

#### 2. Implement Distributed Rate Limiting

Use Redis with `rate-limiter-flexible`:

```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 60, // requests
  duration: 60, // per 60 seconds
});
```

#### 3. Persist Audit Logs

**Option A: Database**
- Use PostgreSQL/MongoDB for structured logging
- Implement log rotation policies
- Set up indexes for efficient queries

**Option B: External Service**
- AWS CloudWatch
- Elasticsearch + Kibana
- Datadog
- Splunk

#### 4. Environment Configuration

```env
# Token Settings
TOKEN_DEFAULT_EXPIRATION=604800000  # 7 days in ms
TOKEN_DEFAULT_MAX_UPLOADS=50
TOKEN_CLEANUP_INTERVAL=3600000      # 1 hour in ms

# Rate Limiting
RATE_LIMIT_WINDOW=60000             # 1 minute in ms
RATE_LIMIT_MAX_REQUESTS=60

# Storage
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://...

# Security
ALLOWED_ORIGINS=https://yourdomain.com
ENABLE_AUDIT_LOGGING=true
```

## Testing

Run the validation script:

```bash
node scripts/test-auth-system.js
```

## Examples

See `src/lib/auth/examples.ts` for 10 practical examples covering:
1. Token generation
2. Token validation
3. Upload processing
4. Status checking
5. Token revocation
6. Audit log queries
7. Admin dashboard
8. Batch operations
9. Quick checks
10. Complete workflow

## Documentation

For detailed usage examples and API documentation:
- `src/lib/auth/README.md` - Comprehensive guide
- `src/lib/auth/examples.ts` - Code examples
- Type definitions in each module

## Support

For questions or issues:
1. Check the README in `src/lib/auth/`
2. Review the examples in `examples.ts`
3. Consult the inline documentation
4. Review this architecture document

## Future Enhancements

Potential improvements for future iterations:

1. **Token Dashboard**
   - Web UI for token management
   - Real-time statistics
   - User management

2. **Advanced Security**
   - Two-factor authentication
   - Webhook notifications
   - Anomaly detection

3. **Performance**
   - Token caching strategies
   - Database query optimization
   - CDN integration

4. **Features**
   - Token renewal
   - Batch token generation
   - Custom token expiration policies
   - Role-based access control

---

**Implementation Date**: November 2025  
**Version**: 1.0.0  
**Status**: Development Ready
