# Semi-Public Upload Page Implementation Plan

## Project Overview
- **Objective**: Create a semi-publicly accessible upload page for authenticated users (via token/link)
- **Framework**: Next.js 15.3.3 with TypeScript and Tailwind CSS
- **Technology**: UploadThing (initially), with migration to custom storage planned
- **Current Status**: Planning phase

---

## Task Breakdown for Parallel Execution

### **TASK 1: Environment Setup & Dependencies**
**Assignee**: Backend/Infrastructure Agent  
**Priority**: HIGH (Must complete first)  
**Estimated Time**: 30-45 minutes

#### Subtasks:
1. **Install UploadThing packages**
   - Add `uploadthing` and `@uploadthing/react` to `package.json`
   - Install peer dependencies as needed
   - Verify compatibility with Next.js 15.3.3

2. **Create environment configuration**
   - Add `.env.local` template with:
     - `UPLOADTHING_TOKEN` (API key)
     - `UPLOADTHING_SECRET` (API secret)
     - `NEXT_PUBLIC_UPLOADTHING_URL` (public URL configuration)
     - Custom storage endpoint placeholder for future migration
   - Document all required environment variables in README

3. **Update Next.js configuration**
   - Add UploadThing middleware configuration to `next.config.ts`
   - Configure CORS policies for file uploads
   - Set up file size limits in headers (align with project security policies)

4. **Add TypeScript types**
   - Create `src/types/upload.ts` with:
     - `UploadFile` interface
     - `UploadSession` interface
     - `UploadToken` interface (for semi-public access)

---

### **TASK 2: Authentication & Authorization Layer**
**Assignee**: Backend/Auth Agent  
**Priority**: HIGH  
**Estimated Time**: 45-60 minutes

#### Subtasks:
1. **Create token/link authentication system**
   - Design token generation mechanism:
     - Generate unique tokens with expiration
     - Store token metadata (creation date, expiry, max uploads, associated user)
   - Create in-memory or file-based token store (`src/lib/tokens.ts`)
   - Document token lifecycle (generation, validation, revocation)

2. **Implement middleware for protected routes**
   - Create `src/middleware.ts` to validate upload page access
   - Implement query parameter validation (e.g., `?token=xyz123`)
   - Add rate limiting configuration (prevent abuse)
   - Handle token expiration gracefully

3. **Create authorization utilities**
   - `src/lib/auth/validateUploadToken.ts` - Token validation logic
   - `src/lib/auth/generateUploadToken.ts` - Token generation logic
   - Support both URL-based tokens and session-based auth (extensible)

4. **Add logging & audit trail**
   - Log all upload attempts (success/failure)
   - Track which token initiated each upload
   - Create audit interface for future monitoring

---

### **TASK 3: API Routes & Backend Logic**
**Assignee**: Backend/API Agent  
**Priority**: HIGH  
**Estimated Time**: 60-90 minutes

#### Subtasks:
1. **Create UploadThing API route handler**
   - `src/app/api/uploadthing/route.ts`
   - Configure allowed file types (audio: mp3, wav, flac; images: jpg, png, webp)
   - Set file size limits (e.g., 500MB for audio, 10MB for images)
   - Implement virus scanning hook (optional, can be added later)

2. **Build upload session endpoints**
   - `POST /api/upload/session` - Create upload session with token validation
   - `GET /api/upload/session/[sessionId]` - Get session status
   - `POST /api/upload/session/[sessionId]/complete` - Mark upload complete
   - Each endpoint validates token from middleware

3. **Implement file metadata storage**
   - `POST /api/upload/metadata` - Store file metadata (name, size, type, hash)
   - `GET /api/upload/files?token=xyz` - List files uploaded via token
   - Create storage interface: `src/lib/storage/interface.ts`
   - Implement placeholder storage adapter for UploadThing

4. **Add error handling & response standardization**
   - Create standardized API response format
   - Implement error codes for different failure scenarios
   - Add request validation using Zod or similar

---

### **TASK 4: Frontend - Upload Page UI/UX**
**Assignee**: Frontend/UI Agent  
**Priority**: MEDIUM  
**Estimated Time**: 75-90 minutes

#### Subtasks:
1. **Create upload page layout**
   - Route: `/upload` or `/submit` (configurable)
   - Create `src/app/upload/page.tsx`
   - Create `src/app/upload/layout.tsx` (if needed for nested routing)
   - Design responsive layout for desktop/mobile

2. **Build upload component**
   - `src/app/upload/components/UploadZone.tsx`
     - Drag-and-drop file upload interface
     - File type validation on client-side
     - File size validation feedback
   - `src/app/upload/components/UploadProgress.tsx`
     - Real-time upload progress display
     - Multiple file upload support
     - Cancellation capability

3. **Create form & validation**
   - `src/app/upload/components/UploadForm.tsx`
     - User information collection (name, email, description, etc.)
     - File metadata input
     - Form validation (client + server-side)

4. **Build post-upload UI**
   - `src/app/upload/components/UploadSuccess.tsx`
     - Confirmation message
     - Download link for uploaded files
     - Upload summary (file names, sizes, timestamps)
   - `src/app/upload/components/UploadError.tsx`
     - Error message display
     - Retry mechanism
     - Support contact information

5. **Style & theming**
   - Use Tailwind CSS (already in project)
   - Match existing Nirmata branding
   - Reference existing components in `src/components/` for consistency
   - Ensure accessibility (WCAG 2.1 AA compliance)

6. **Add loading states & animations**
   - Skeleton loaders during file processing
   - Progress indicators
   - Toast notifications for success/error

---

### **TASK 5: Storage Abstraction Layer**
**Assignee**: Backend/Storage Agent  
**Priority**: MEDIUM  
**Estimated Time**: 45-60 minutes

#### Subtasks:
1. **Design storage interface**
   - `src/lib/storage/StorageAdapter.ts` - Abstract interface
   - Methods needed:
     - `upload(file, metadata)` - Upload and return file ID
     - `download(fileId)` - Retrieve file
     - `delete(fileId)` - Remove file
     - `list(filter?)` - List files with filtering
     - `getMetadata(fileId)` - Get file metadata

2. **Implement UploadThing adapter**
   - `src/lib/storage/uploadthingAdapter.ts`
   - Wraps UploadThing API calls
   - Maps internal file IDs to UploadThing file IDs
   - Handles file metadata persistence

3. **Create file metadata database**
   - `src/lib/storage/metadata.ts`
   - Store: `{ fileId, originalName, uploadToken, uploadedAt, fileSize, fileType, userEmail, description }`
   - Use JSON file storage or placeholder for database integration

4. **Document storage migration path**
   - Create `STORAGE_MIGRATION.md`
   - Outline steps to replace UploadThing with custom storage
   - Ensure adapter pattern allows easy swapping

---

### **TASK 6: Security & Validation**
**Assignee**: Security/QA Agent  
**Priority**: HIGH  
**Estimated Time**: 60-75 minutes

#### Subtasks:
1. **Implement file validation**
   - File type verification (magic bytes, not just extension)
   - File size enforcement server-side
   - Malicious filename sanitization
   - Create `src/lib/validation/fileValidation.ts`

2. **Add CSRF & XSS protection**
   - Ensure CSRF tokens on form submissions
   - Sanitize user input in metadata fields
   - Use Next.js built-in security headers
   - Review and update `next.config.ts` if needed

3. **Rate limiting & abuse prevention**
   - Implement rate limiting per token
   - Track upload frequency per token
   - Add configurable thresholds (e.g., 10 uploads per hour)
   - Create `src/lib/security/rateLimiter.ts`

4. **Implement request signing & verification**
   - Add HMAC signatures to API requests
   - Verify signatures server-side
   - Document for future custom storage implementation

5. **Create security documentation**
   - Document all security measures
   - List known limitations
   - Provide security best practices for deployment

---

### **TASK 7: Testing & Documentation**
**Assignee**: QA/Documentation Agent  
**Priority**: MEDIUM  
**Estimated Time**: 90-120 minutes

#### Subtasks:
1. **Create unit tests**
   - Test token generation & validation
   - Test file validation logic
   - Test authorization checks
   - Test API endpoints (happy path + error cases)
   - Save to `src/tests/` directory

2. **Create integration tests**
   - Test full upload flow with real UploadThing calls
   - Test error handling across components
   - Test middleware behavior

3. **Create E2E tests** (optional, can be deferred)
   - Test complete user journey: token generation → upload → success

4. **Write API documentation**
   - Document all endpoints in `UPLOAD_API.md`
   - Include request/response examples
   - Include error codes and troubleshooting

5. **Write user documentation**
   - How to generate upload tokens
   - How to share links with users
   - How to track uploaded files
   - FAQ and troubleshooting

6. **Create deployment guide**
   - Environment setup instructions
   - UploadThing configuration steps
   - Post-deployment checklist

---

### **TASK 8: Token Management Dashboard (Optional - Can be Phase 2)**
**Assignee**: Frontend/Admin Agent  
**Priority**: LOW  
**Estimated Time**: 90-120 minutes

#### Subtasks:
1. **Create admin page for token management**
   - Route: `/admin/upload-tokens` (protected)
   - List all active tokens with metadata
   - Generate new tokens
   - Revoke tokens
   - View upload statistics per token

2. **Build token statistics UI**
   - Files uploaded per token
   - Total storage used
   - Upload timestamps

3. **Add batch operations**
   - Bulk token expiration
   - Bulk file deletion

---

## Parallel Execution Strategy

### **Phase 1: Foundation (Run in Parallel)**
- **TASK 1** (Env Setup) - Must complete first, ~30 min
- Wait for Task 1 completion

### **Phase 2: Core Backend (Run in Parallel)**
After Task 1 completes, run simultaneously:
- **TASK 2** (Auth Layer) - 45-60 min
- **TASK 3** (API Routes) - 60-90 min
- **TASK 5** (Storage Layer) - 45-60 min
- **TASK 6** (Security) - 60-75 min

### **Phase 3: Frontend (Run After Phase 2)**
After Phase 2 API routes are ready:
- **TASK 4** (Frontend UI) - 75-90 min

### **Phase 4: Testing & Docs (Run in Parallel with Task 4)**
- **TASK 7** (Testing & Docs) - 90-120 min

### **Phase 5: Optional Enhancements**
- **TASK 8** (Token Dashboard) - Future phase

---

## Success Criteria

- ✅ Upload page accessible via token/link
- ✅ Files successfully uploaded to UploadThing
- ✅ File metadata persisted locally
- ✅ All API endpoints tested and working
- ✅ Security checks passing (no CSRF/XSS vulnerabilities)
- ✅ Rate limiting functional
- ✅ Documentation complete
- ✅ Error handling graceful
- ✅ Mobile responsive UI

---

## File Structure (Expected Output)

```
src/
├── app/
│   ├── upload/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── components/
│   │       ├── UploadZone.tsx
│   │       ├── UploadProgress.tsx
│   │       ├── UploadForm.tsx
│   │       ├── UploadSuccess.tsx
│   │       └── UploadError.tsx
│   ├── api/
│   │   ├── uploadthing/
│   │   │   └── route.ts
│   │   └── upload/
│   │       ├── session/route.ts
│   │       ├── metadata/route.ts
│   │       └── files/route.ts
│   └── middleware.ts
├── lib/
│   ├── auth/
│   │   ├── validateUploadToken.ts
│   │   └── generateUploadToken.ts
│   ├── storage/
│   │   ├── StorageAdapter.ts
│   │   ├── uploadthingAdapter.ts
│   │   └── metadata.ts
│   ├── security/
│   │   └── rateLimiter.ts
│   ├── validation/
│   │   └── fileValidation.ts
│   └── tokens.ts
├── types/
│   └── upload.ts
└── tests/
    ├── auth.test.ts
    ├── fileValidation.test.ts
    └── api.test.ts

Configuration:
├── .env.local (template)
├── next.config.ts (updated)
└── package.json (updated)

Documentation:
├── UPLOAD_API.md
├── UPLOAD_USER_GUIDE.md
└── STORAGE_MIGRATION.md
```

---

## Notes & Considerations

1. **UploadThing vs. Custom Storage**: Currently using UploadThing. Storage adapter pattern makes migration straightforward.
2. **Authentication Method**: Token-based access allows semi-public links. Can be enhanced with JWT or session-based auth later.
3. **Rate Limiting**: Implemented to prevent abuse; thresholds can be adjusted based on requirements.
4. **File Types**: Configure in `src/app/api/uploadthing/route.ts` - recommend audio (mp3, wav, flac) and images (jpg, png, webp) based on Nirmata's music focus.
5. **Error Handling**: Standardized responses for consistency and easier debugging.
6. **Accessibility**: Ensure WCAG compliance for upload form and progress indicators.
7. **Future Enhancements**: Admin dashboard, file previews, batch operations, webhook notifications.

---

## Dependencies to Add

```json
{
  "dependencies": {
    "uploadthing": "^latest",
    "@uploadthing/react": "^latest"
  },
  "devDependencies": {
    "@types/jest": "^latest",
    "jest": "^latest"
  }
}
```

---

## Deployment Considerations

- UploadThing requires API credentials (free tier available)
- Ensure environment variables are set in deployment platform
- Configure CORS for production domain
- Test file upload size limits in production
- Monitor UploadThing quota usage

