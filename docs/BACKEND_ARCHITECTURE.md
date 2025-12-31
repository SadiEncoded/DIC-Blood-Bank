# Backend Architecture Documentation

## Overview

The DIC Blood Bank backend has been refactored to follow FAANG-level enterprise patterns with:
- **Centralized service layer** for all business logic
- **Consistent error handling** across the application
- **Structured logging** for monitoring and debugging
- **Type-safe validation** using Zod schemas
- **Reusable base patterns** for common operations

---

## Architecture Layers

```
┌─────────────────────────────────────┐
│         UI Components               │
│   (React, Forms, Pages)             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Server Actions                 │
│   (Next.js Server Actions)          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Service Layer                  │
│   (Business Logic)                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Database (Supabase)            │
│   (PostgreSQL + RLS)                │
└─────────────────────────────────────┘
```

---

## Core Infrastructure

### 1. Error Handling (`lib/errors/`)

Custom error classes for consistent error responses:

```typescript
import { ValidationError, AuthenticationError, NotFoundError } from '@/lib/errors';

// Usage in services
if (!user) {
  throw new AuthenticationError();
}

if (!data) {
  throw new NotFoundError('Resource');
}
```

**Available Error Classes**:
- `ValidationError` - Invalid input data (400)
- `AuthenticationError` - Not logged in (401)
- `AuthorizationError` - Insufficient permissions (403)
- `NotFoundError` - Resource not found (404)
- `ConflictError` - Duplicate or conflicting data (409)
- `DatabaseError` - Database operation failed (500)
- `InternalError` - Unexpected server error (500)

### 2. Logging (`lib/logger/`)

Structured logging with different levels:

```typescript
import { logger } from '@/lib/logger';

// Log levels
logger.debug('Detailed debug info', { userId: '123' });
logger.info('Operation completed', { count: 5 });
logger.warn('Potential issue detected', { reason: 'timeout' });
logger.error('Operation failed', error, { operation: 'createUser' });

// Operation tracking
const op = logger.startOperation('createBloodRequest');
// ... do work ...
op.end(success);
```

### 3. Validation (`lib/validation/schemas.ts`)

Centralized Zod schemas for all data:

```typescript
import { userSchemas, bloodRequestSchemas } from '@/lib/validation/schemas';

// Validate data
const validated = validateData(userSchemas.signup, formData);

// Safe validation (returns result object)
const result = safeValidateData(bloodRequestSchemas.create, input);
if (!result.success) {
  // Handle validation errors
  console.error(result.errors);
}
```

---

## Service Layer

### Base Service (`services/base.service.ts`)

All services extend `BaseService` for common functionality:

```typescript
export class MyService extends BaseService {
  async myOperation() {
    // Get authenticated user
    const user = await this.getCurrentUser();
    
    // Require admin role
    await this.requireAdmin();
    
    // Execute database query with error handling
    const result = await this.executeQuery('operationName', () =>
      supabase.from('table').select('*')
    );
    
    return result;
  }
}
```

**Base Service Methods**:
- `getSupabase()` - Get Supabase client
- `executeQuery()` - Execute query with error handling
- `getCurrentUser()` - Get authenticated user (throws if not logged in)
- `getOptionalUser()` - Get user or null
- `getUserProfile()` - Get user profile from database
- `requireAdmin()` - Require admin role (throws if not admin)
- `requireOwnership()` - Validate user owns resource

### Available Services

#### 1. Blood Request Service (`services/blood-requests/`)

```typescript
import { bloodRequestService } from '@/services';

// Create blood request
const request = await bloodRequestService.create({
  patient_name: 'John Doe',
  blood_type: 'A+',
  units: 2,
  // ... other fields
});

// Get by tracking ID
const request = await bloodRequestService.getByTrackingId('BRQ-12345');

// List with filters
const requests = await bloodRequestService.list({
  status: 'PENDING',
  blood_type: 'O+',
});

// Update status (admin only)
await bloodRequestService.updateStatus(id, 'APPROVED');
```

#### 2. Donor Service (`services/donors/`)

```typescript
import { donorService } from '@/services';

// Search donors
const donors = await donorService.searchDonors('A+', 'Dhaka');

// Update availability
await donorService.updateAvailability(true);

// Get donor stats
const stats = await donorService.getDonorStats(userId);

// Increment donation count (admin only)
await donorService.incrementDonationCount(userId);
```

#### 3. Event Service (`services/events/`)

```typescript
import { eventService } from '@/services';

// Create event (admin only)
const event = await eventService.create({
  title: 'Blood Drive',
  description: '...',
  date: '2025-01-15',
  location: 'Dhaka',
  category: 'Blood Drive',
});

// List active events
const events = await eventService.listActive();

// Get upcoming events
const upcoming = await eventService.getUpcoming(5);

// Toggle active status (admin only)
await eventService.toggleActive(id, false);
```

#### 4. Contact Service (`services/contact/`)

```typescript
import { contactService } from '@/services';

// Submit contact form (rate limited)
await contactService.submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello...',
});

// List messages (admin only)
const messages = await contactService.listAll({ unread: true });

// Mark as read (admin only)
await contactService.markAsRead(id);

// Get unread count (admin only)
const count = await contactService.getUnreadCount();
```

#### 5. User Service (`services/users/`)

```typescript
import { userService } from '@/services';

// Get my profile
const profile = await userService.getMyProfile();

// Update my profile
await userService.updateMyProfile({
  full_name: 'John Doe',
  location: 'Dhaka',
});

// List all users (admin only)
const users = await userService.listAllUsers({ role: 'donor' });

// Update user role (admin only)
await userService.updateUserRole(userId, 'admin');

// Verify donor (admin only)
await userService.verifyDonor(userId, true);
```

---

## Server Actions

Server actions are thin wrappers around services:

```typescript
'use server';

import { bloodRequestService } from '@/services';
import { isAppError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function createBloodRequestAction(formData: unknown) {
  try {
    const result = await bloodRequestService.create(formData as any);
    
    revalidatePath('/donors');
    
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (isAppError(error)) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      };
    }
    
    logger.error('Unexpected error', error as Error);
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}
```

---

## Best Practices

### 1. Always Use Services

❌ **Don't** write database queries in components or server actions:
```typescript
// Bad
const { data } = await supabase.from('profiles').select('*');
```

✅ **Do** use services:
```typescript
// Good
const users = await userService.listAllUsers();
```

### 2. Handle Errors Properly

❌ **Don't** catch and ignore errors:
```typescript
// Bad
try {
  await service.create(data);
} catch {
  // Silent failure
}
```

✅ **Do** handle specific error types:
```typescript
// Good
try {
  await service.create(data);
} catch (error) {
  if (isAppError(error)) {
    return { success: false, error: error.message };
  }
  logger.error('Unexpected error', error as Error);
  throw error;
}
```

### 3. Validate Input Data

❌ **Don't** trust user input:
```typescript
// Bad
await service.create(formData);
```

✅ **Do** validate with schemas:
```typescript
// Good
const validated = validateData(schema, formData);
await service.create(validated);
```

### 4. Log Important Operations

```typescript
logger.info('Creating blood request', { userId, bloodType });
const result = await bloodRequestService.create(data);
logger.info('Blood request created', { requestId: result.id });
```

---

## Deployment Checklist

- [ ] All services use proper error handling
- [ ] All database queries go through services
- [ ] Validation schemas cover all inputs
- [ ] Logging is in place for critical operations
- [ ] Admin operations require `requireAdmin()`
- [ ] User operations require `getCurrentUser()`
- [ ] Rate limiting is configured
- [ ] Environment variables are set
- [ ] Database RLS policies are active
- [ ] Build passes without errors

---

## Future Enhancements

1. **Caching Layer**: Add Redis for frequently accessed data
2. **Rate Limiting**: Implement Redis-based rate limiting
3. **Monitoring**: Integrate Sentry for error tracking
4. **Testing**: Add unit tests for all services
5. **API Documentation**: Generate OpenAPI/Swagger docs
6. **Performance**: Add database query optimization
7. **Security**: Add request signing and CSRF protection

---

## Support

For questions or issues with the backend architecture:
1. Check service documentation in code comments
2. Review error logs in console
3. Verify environment variables are set
4. Check Supabase RLS policies

**Last Updated**: 2025-12-27
**Version**: 1.0.0
