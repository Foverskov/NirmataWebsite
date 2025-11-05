/**
 * Authentication System Usage Examples
 * Demonstrates common use cases for the token authentication system
 */

import {
  generateUploadToken,
  validateUploadToken,
  isTokenValid,
  getRemainingUploads,
  getValidationDetails,
  revokeToken,
  listActiveTokens,
  auditLog,
  logUploadSuccess,
  logUploadFailure,
  type GenerateTokenOptions,
} from './index';

/**
 * Example 1: Generate a token for a new user
 */
export function example1_GenerateTokenForUser(userEmail: string) {
  console.log('=== Example 1: Generate Token ===');
  
  const result = generateUploadToken({
    expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxUploads: 50,
    associatedUser: userEmail,
    metadata: {
      purpose: 'EPK submission',
      source: 'admin-dashboard',
    },
  });
  
  console.log('Token generated:', result.token);
  console.log('Expires at:', result.expiresAt);
  console.log('Max uploads:', result.maxUploads);
  
  // Generate shareable link
  const uploadLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/upload?token=${result.token}`;
  console.log('Shareable link:', uploadLink);
  
  return result;
}

/**
 * Example 2: Validate a token from a request
 */
export function example2_ValidateToken(token: string, ipAddress: string) {
  console.log('\n=== Example 2: Validate Token ===');
  
  const result = validateUploadToken(token, {
    ipAddress,
    incrementUsage: false, // Don't count as upload yet
  });
  
  if (result.valid) {
    console.log('✓ Token is valid');
    console.log('Associated user:', result.tokenData?.associatedUser);
    console.log('Uploads used:', result.tokenData?.currentUploads);
    console.log('Max uploads:', result.tokenData?.maxUploads);
    console.log('Expires at:', result.tokenData?.expiresAt);
  } else {
    console.log('✗ Token is invalid:', result.reason);
  }
  
  return result;
}

/**
 * Example 3: Process an upload with token
 */
export function example3_ProcessUpload(
  token: string,
  ipAddress: string,
  fileName: string,
  fileSize: number
) {
  console.log('\n=== Example 3: Process Upload ===');
  
  // Validate token and increment usage
  const validation = validateUploadToken(token, {
    ipAddress,
    incrementUsage: true, // Count this as an upload
  });
  
  if (!validation.valid) {
    console.log('Upload rejected:', validation.reason);
    
    // Log failed upload
    logUploadFailure({
      token,
      ipAddress,
      fileName,
      fileSize,
      errorMessage: validation.reason || 'Token validation failed',
    });
    
    return { success: false, error: validation.reason };
  }
  
  // Process the upload...
  console.log('Processing upload:', fileName);
  
  // Log successful upload
  logUploadSuccess({
    token,
    ipAddress,
    userId: validation.tokenData?.associatedUser,
    fileName,
    fileSize,
  });
  
  const remaining = getRemainingUploads(token);
  console.log('Upload successful! Remaining uploads:', remaining);
  
  return { success: true, remaining };
}

/**
 * Example 4: Check token status before upload
 */
export function example4_CheckTokenStatus(token: string) {
  console.log('\n=== Example 4: Check Token Status ===');
  
  const details = getValidationDetails(token);
  
  console.log('Token exists:', details.exists);
  console.log('Is expired:', details.expired);
  console.log('Is revoked:', details.revoked);
  console.log('Limit reached:', details.limitReached);
  console.log('Remaining uploads:', details.remainingUploads);
  console.log('Expires at:', details.expiresAt);
  console.log('Created at:', details.createdAt);
  
  return details;
}

/**
 * Example 5: Revoke a token
 */
export function example5_RevokeToken(token: string, reason: string = 'User request') {
  console.log('\n=== Example 5: Revoke Token ===');
  
  const success = revokeToken(token);
  
  if (success) {
    console.log('✓ Token revoked successfully');
    
    // Log revocation
    auditLog.logTokenRevocation({
      token,
      reason,
    });
  } else {
    console.log('✗ Token not found');
  }
  
  return success;
}

/**
 * Example 6: Query audit logs
 */
export function example6_QueryAuditLogs(token?: string) {
  console.log('\n=== Example 6: Query Audit Logs ===');
  
  if (token) {
    // Get logs for specific token
    const tokenLogs = auditLog.getByToken(token);
    console.log(`Found ${tokenLogs.length} events for token`);
    
    tokenLogs.forEach(log => {
      console.log(`  ${log.timestamp.toISOString()} - ${log.eventType} - Success: ${log.success}`);
    });
  } else {
    // Get overall statistics
    const stats = auditLog.getStats();
    console.log('Total events:', stats.total);
    console.log('Successful:', stats.successful);
    console.log('Failed:', stats.failed);
    console.log('By type:', stats.byEventType);
  }
  
  return auditLog;
}

/**
 * Example 7: Admin dashboard view
 */
export function example7_AdminDashboard() {
  console.log('\n=== Example 7: Admin Dashboard ===');
  
  // Get all active tokens
  const activeTokens = listActiveTokens();
  console.log(`Active tokens: ${activeTokens.length}`);
  
  // Display token information
  activeTokens.forEach((tokenData, index) => {
    console.log(`\nToken ${index + 1}:`);
    console.log('  Token:', tokenData.token.substring(0, 8) + '...');
    console.log('  User:', tokenData.associatedUser || 'N/A');
    console.log('  Created:', tokenData.createdAt.toISOString());
    console.log('  Expires:', tokenData.expiresAt.toISOString());
    console.log('  Uploads:', `${tokenData.currentUploads}/${tokenData.maxUploads}`);
    console.log('  Last used by:', tokenData.lastUsedBy?.join(', ') || 'N/A');
  });
  
  // Get audit statistics
  const stats = auditLog.getStats();
  console.log('\nOverall Statistics:');
  console.log('  Total events:', stats.total);
  console.log('  Successful:', stats.successful);
  console.log('  Failed:', stats.failed);
  
  // Get recent failed attempts
  const failedAttempts = auditLog.getFailedAttempts(10);
  console.log('\nRecent failed attempts:', failedAttempts.length);
  
  return {
    activeTokens,
    stats,
    failedAttempts,
  };
}

/**
 * Example 8: Generate multiple tokens for batch operation
 */
export function example8_BatchGenerateTokens(users: string[], options?: GenerateTokenOptions) {
  console.log('\n=== Example 8: Batch Generate Tokens ===');
  
  const tokens = users.map(user => {
    const result = generateUploadToken({
      ...options,
      associatedUser: user,
    });
    
    console.log(`Token for ${user}: ${result.token.substring(0, 8)}...`);
    return { user, ...result };
  });
  
  console.log(`Generated ${tokens.length} tokens`);
  return tokens;
}

/**
 * Example 9: Quick validation check
 */
export function example9_QuickCheck(token: string) {
  console.log('\n=== Example 9: Quick Check ===');
  
  const valid = isTokenValid(token);
  const remaining = getRemainingUploads(token);
  
  console.log('Valid:', valid);
  console.log('Remaining uploads:', remaining);
  
  return { valid, remaining };
}

/**
 * Example 10: Complete workflow
 */
export async function example10_CompleteWorkflow() {
  console.log('\n=== Example 10: Complete Workflow ===');
  
  // Step 1: Generate token
  const { token } = generateUploadToken({
    expiresIn: 24 * 60 * 60 * 1000, // 24 hours
    maxUploads: 5,
    associatedUser: 'test@example.com',
  });
  console.log('1. Token generated:', token.substring(0, 8) + '...');
  
  // Step 2: Validate token
  const validation = validateUploadToken(token, {
    ipAddress: '192.168.1.1',
  });
  console.log('2. Token validated:', validation.valid);
  
  // Step 3: Simulate multiple uploads
  for (let i = 1; i <= 3; i++) {
    const result = example3_ProcessUpload(
      token,
      '192.168.1.1',
      `file${i}.mp3`,
      1024 * 1024 * 5 // 5MB
    );
    console.log(`3.${i}. Upload ${i}:`, result);
  }
  
  // Step 4: Check remaining uploads
  const remaining = getRemainingUploads(token);
  console.log('4. Remaining uploads:', remaining);
  
  // Step 5: View audit logs
  const logs = auditLog.getByToken(token);
  console.log('5. Audit log entries:', logs.length);
  
  return { token, logs };
}

// Export all examples
const authExamples = {
  example1_GenerateTokenForUser,
  example2_ValidateToken,
  example3_ProcessUpload,
  example4_CheckTokenStatus,
  example5_RevokeToken,
  example6_QueryAuditLogs,
  example7_AdminDashboard,
  example8_BatchGenerateTokens,
  example9_QuickCheck,
  example10_CompleteWorkflow,
};

export default authExamples;
