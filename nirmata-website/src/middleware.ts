/**
 * Next.js Middleware for Upload Route Protection
 * Validates tokens and enforces rate limiting for upload routes
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateUploadToken } from './lib/auth/validateUploadToken';

// Rate limiting: Track requests per IP
// ⚠️ PRODUCTION WARNING:
// This in-memory rate limiting will not work correctly in multi-instance deployments.
// For production, use Redis with a library like 'ioredis' or 'rate-limiter-flexible'
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per minute

/**
 * Check if an IP address has exceeded rate limits
 */
function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  // Clean up expired entries
  if (record && record.resetAt < now) {
    rateLimitMap.delete(ip);
  }
  
  // Get or create rate limit record
  const currentRecord = rateLimitMap.get(ip);
  
  if (!currentRecord) {
    // First request from this IP
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }
  
  // Check if limit exceeded
  if (currentRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((currentRecord.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  // Increment counter
  currentRecord.count++;
  return { allowed: true };
}

/**
 * Extract token from request (query parameter or header)
 */
function extractToken(request: NextRequest): string | null {
  // Try query parameter first
  const tokenFromQuery = request.nextUrl.searchParams.get('token');
  if (tokenFromQuery) {
    return tokenFromQuery;
  }
  
  // Try Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Try custom header
  const tokenHeader = request.headers.get('x-upload-token');
  if (tokenHeader) {
    return tokenHeader;
  }
  
  return null;
}

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  // Try various headers in order of preference
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a placeholder
  return 'unknown';
}

/**
 * Middleware function to protect upload routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only apply middleware to upload routes
  if (!pathname.startsWith('/upload') && !pathname.startsWith('/api/upload')) {
    return NextResponse.next();
  }
  
  // Get client IP for rate limiting and audit
  const clientIp = getClientIp(request);
  
  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIp);
  if (!rateLimitResult.allowed) {
    return new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimitResult.retryAfter || 60),
        },
      }
    );
  }
  
  // Extract token
  const token = extractToken(request);
  
  if (!token) {
    // For page routes, show error with instructions
    if (pathname.startsWith('/upload') && !pathname.startsWith('/api/')) {
      // Redirect to error page or allow through for client-side validation
      // The page itself should validate the token and show appropriate UI
      const response = NextResponse.next();
      response.headers.set('x-token-required', 'true');
      return response;
    }
    
    // For API routes, return 401
    return new NextResponse(
      JSON.stringify({
        error: 'Unauthorized',
        message: 'Valid upload token required',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  // Validate token (without incrementing usage - that happens on actual upload)
  const validationResult = validateUploadToken(token, {
    ipAddress: clientIp,
    incrementUsage: false,
  });
  
  if (!validationResult.valid) {
    // Log the failed attempt
    console.warn(`[Middleware] Token validation failed for ${clientIp}: ${validationResult.reason}`);
    
    return new NextResponse(
      JSON.stringify({
        error: 'Invalid token',
        message: validationResult.reason || 'Token validation failed',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  // Log successful validation
  console.log(`[Middleware] Token validated for ${clientIp}`);
  
  // Add token data to request headers for downstream use
  const response = NextResponse.next();
  response.headers.set('x-token-validated', 'true');
  response.headers.set('x-token-user', validationResult.tokenData?.associatedUser || '');
  
  return response;
}

/**
 * Configure which routes this middleware applies to
 */
export const config = {
  matcher: [
    '/upload/:path*',
    '/api/upload/:path*',
  ],
};
