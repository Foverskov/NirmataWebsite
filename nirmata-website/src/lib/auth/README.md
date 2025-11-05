# Authentication & Authorization System

This module provides token-based authentication and authorization for the upload page functionality.

## Overview

The authentication system consists of several components:

1. **Token Storage** (`tokens.ts`) - Manages token lifecycle and metadata
2. **Token Generation** (`generateUploadToken.ts`) - Creates secure tokens with expiration
3. **Token Validation** (`validateUploadToken.ts`) - Validates and authorizes token usage
4. **Audit Logging** (`auditLog.ts`) - Tracks all authentication and upload events
5. **Middleware** (`../../middleware.ts`) - Protects routes and enforces rate limiting

## Quick Start

### Generating a Token

```typescript
import { generateUploadToken } from '@/lib/auth';

// Generate a token valid for 24 hours with 10 upload limit
const result = generateUploadToken({
  expiresIn: 24 * 60 * 60 * 1000, // 24 hours
  maxUploads: 10,
  associatedUser: 'user@example.com',
  metadata: {
    purpose: 'EPK submission',
  }
});

console.log(`Token: ${result.token}`);
console.log(`Expires: ${result.expiresAt}`);
console.log(`Share URL: https://yoursite.com/upload?token=${result.token}`);
```

### Validating a Token

```typescript
import { validateUploadToken } from '@/lib/auth';

// Validate token with IP tracking
const result = validateUploadToken('your-token-here', {
  ipAddress: '192.168.1.1',
  incrementUsage: true, // Count this as an upload
});

if (result.valid) {
  console.log('Token is valid!');
  console.log('Remaining uploads:', 
    result.tokenData!.maxUploads - result.tokenData!.currentUploads
  );
} else {
  console.log('Invalid:', result.reason);
}
```

### Checking Token Status

```typescript
import { 
  isTokenValid, 
  getRemainingUploads, 
  getValidationDetails 
} from '@/lib/auth';

// Quick validation check
if (isTokenValid('token')) {
  console.log('Token is valid');
}

// Get remaining uploads
const remaining = getRemainingUploads('token');
console.log(`Uploads remaining: ${remaining}`);

// Get detailed status
const details = getValidationDetails('token');
console.log('Token details:', details);
```

### Using Audit Logs

```typescript
import { auditLog, logUploadSuccess, logUploadFailure } from '@/lib/auth';

// Log a successful upload
logUploadSuccess({
  token: 'abc123',
  ipAddress: '192.168.1.1',
  userId: 'user@example.com',
  fileName: 'song.mp3',
  fileSize: 5242880, // 5MB
});

// Log a failed upload
logUploadFailure({
  token: 'abc123',
  ipAddress: '192.168.1.1',
  errorMessage: 'File too large',
});

// Query logs
const failedUploads = auditLog.getFailedAttempts(50);
const tokenLogs = auditLog.getByToken('abc123');
const stats = auditLog.getStats();
```

### Revoking Tokens

```typescript
import { revokeToken, deleteToken } from '@/lib/auth';

// Revoke a token (soft delete - keeps in storage)
revokeToken('abc123');

// Delete a token completely
deleteToken('abc123');
```

## Token Lifecycle

1. **Generation** - Token is created with expiration and upload limits
2. **Storage** - Token metadata is stored in-memory (TokenStore)
3. **Validation** - Each request validates the token
4. **Usage Tracking** - Upload count is incremented on each use
5. **Expiration** - Tokens automatically expire after the specified duration
6. **Cleanup** - Expired tokens are periodically removed from storage

## Token Structure

```typescript
interface UploadTokenMetadata {
  token: string;              // Unique identifier
  createdAt: Date;            // When token was created
  expiresAt: Date;            // When token expires
  maxUploads: number;         // Maximum uploads allowed
  currentUploads: number;     // Current upload count
  associatedUser?: string;    // User identifier
  metadata?: Record<...>;     // Custom metadata
  revoked: boolean;           // Revocation status
  lastUsedBy?: string[];      // IP addresses that used this token
}
```

## Middleware Protection

The middleware automatically protects `/upload` and `/api/upload` routes:

- Validates tokens from query parameters or headers
- Enforces rate limiting (60 requests per minute per IP)
- Tracks IP addresses for audit trail
- Returns appropriate error responses

### Token Extraction

Tokens can be provided via:
1. Query parameter: `?token=abc123`
2. Authorization header: `Authorization: Bearer abc123`
3. Custom header: `X-Upload-Token: abc123`

## Rate Limiting

The system enforces rate limiting to prevent abuse:

- **Limit**: 60 requests per minute per IP address
- **Window**: 1 minute (60,000ms)
- **Response**: 429 Too Many Requests with `Retry-After` header

## Security Features

1. **Cryptographically Secure Tokens** - Uses `crypto.randomUUID()` or `crypto.getRandomValues()`
2. **Expiration Enforcement** - Tokens automatically expire
3. **Usage Limits** - Maximum upload count per token
4. **IP Tracking** - Audit trail of IP addresses
5. **Rate Limiting** - Prevents brute force and abuse
6. **Audit Logging** - Complete event history
7. **Token Revocation** - Ability to invalidate tokens

## Production Considerations

### Current Implementation (Development)
- In-memory token storage
- In-memory audit logs
- No persistence across restarts

### Production Recommendations
1. **Replace TokenStore with Database** - Use PostgreSQL, MongoDB, or Redis
2. **Persist Audit Logs** - Store logs in database or external service (e.g., Elasticsearch, CloudWatch)
3. **Distributed Rate Limiting** - Use Redis for rate limiting across multiple servers
4. **Token Encryption** - Consider encrypting sensitive token metadata
5. **Webhook Notifications** - Alert on suspicious activity
6. **Regular Cleanup** - Implement scheduled job to clean expired tokens

### Migration Path

```typescript
// Example: Database-backed token store
import { PrismaClient } from '@prisma/client';

class DatabaseTokenStore {
  private prisma = new PrismaClient();
  
  async set(tokenData: UploadTokenMetadata): Promise<void> {
    await this.prisma.uploadToken.create({
      data: tokenData,
    });
  }
  
  async get(token: string): Promise<UploadTokenMetadata | undefined> {
    return await this.prisma.uploadToken.findUnique({
      where: { token },
    });
  }
  
  // ... other methods
}
```

## API Reference

See individual module files for detailed API documentation:

- `generateUploadToken.ts` - Token generation functions
- `validateUploadToken.ts` - Token validation functions
- `auditLog.ts` - Audit logging functions
- `tokens.ts` - Token storage implementation

## Examples

### Admin Dashboard Example

```typescript
import { listActiveTokens, auditLog } from '@/lib/auth';

// Get all active tokens
const activeTokens = listActiveTokens();

// Get statistics
const stats = auditLog.getStats();

// Display dashboard
console.log(`Active Tokens: ${activeTokens.length}`);
console.log(`Total Uploads: ${stats.successful}`);
console.log(`Failed Attempts: ${stats.failed}`);
```

### Token Link Generator

```typescript
import { generateUploadToken } from '@/lib/auth';

function createUploadLink(userEmail: string): string {
  const result = generateUploadToken({
    expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxUploads: 50,
    associatedUser: userEmail,
  });
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return `${baseUrl}/upload?token=${result.token}`;
}

const link = createUploadLink('artist@example.com');
console.log('Share this link:', link);
```

## Testing

```typescript
import { 
  generateUploadToken, 
  validateUploadToken,
  isTokenValid,
} from '@/lib/auth';

// Test token lifecycle
const { token } = generateUploadToken({
  expiresIn: 1000, // 1 second
  maxUploads: 1,
});

console.assert(isTokenValid(token) === true, 'Token should be valid');

// Test expiration
await new Promise(resolve => setTimeout(resolve, 1100));
console.assert(isTokenValid(token) === false, 'Token should be expired');

// Test upload limit
const { token: limitedToken } = generateUploadToken({
  maxUploads: 1,
});

validateUploadToken(limitedToken, { incrementUsage: true });
console.assert(isTokenValid(limitedToken) === false, 'Token should reach limit');
```

## Support

For questions or issues with the authentication system, please refer to:
- This README for usage examples
- Source code comments for implementation details
- Project documentation for integration guides
