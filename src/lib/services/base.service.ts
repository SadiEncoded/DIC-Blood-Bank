/**
 * Base Service Class
 * Provides common functionality for all service classes
 */

import {
    AppError,
    AuthenticationError,
    AuthorizationError,
    DatabaseError,
    NotFoundError,
} from '@/lib/errors';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { User } from '@supabase/supabase-js';

export abstract class BaseService {
  /**
   * Get Supabase client instance
   */
  protected async getSupabase() {
    return await createClient();
  }

  /**
   * Get Supabase Admin client instance (uses service role)
   */
  protected async getAdminSupabase() {
    const { createAdminClient } = await import('@/lib/supabase/server');
    return await createAdminClient();
  }

  /**
   * Execute a database query with error handling and logging
   */
  protected async executeQuery<T>(
    operation: string,
    queryFn: () => Promise<{ data: T | null; error: any }>
  ): Promise<T> {
    const op = logger.startOperation(operation);

    try {
      const { data, error } = await queryFn();

      if (error) {
        logger.error(`${operation} failed`, error, { operation });
        throw new DatabaseError(error.message, error);
      }

      if (!data) {
        throw new NotFoundError(operation);
      }

      op.end(true);
      return data;
    } catch (error) {
      op.end(false);
      
      if (error instanceof AppError) {
        throw error;
      }

      logger.error(`Unexpected error in ${operation}`, error as Error);
      throw new DatabaseError('An unexpected database error occurred');
    }
  }

  /**
   * Execute a query that may return null (optional data)
   */
  protected async executeOptionalQuery<T>(
    operation: string,
    queryFn: () => Promise<{ data: T | null; error: any }>
  ): Promise<T | null> {
    const op = logger.startOperation(operation);

    try {
      const { data, error } = await queryFn();

      if (error) {
        logger.error(`${operation} failed`, error, { operation });
        throw new DatabaseError(error.message, error);
      }

      op.end(true, { hasData: !!data });
      return data;
    } catch (error) {
      op.end(false);
      
      if (error instanceof AppError) {
        throw error;
      }

      logger.error(`Unexpected error in ${operation}`, error as Error);
      throw new DatabaseError('An unexpected database error occurred');
    }
  }

  /**
   * Get current authenticated user
   */
  protected async getCurrentUser(): Promise<User> {
    const supabase = await this.getSupabase();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      logger.warn('Authentication required but no user found');
      throw new AuthenticationError();
    }

    return user;
  }

  /**
   * Get user profile from database
   */
  protected async getUserProfile(userId: string) {
    const supabase = await this.getSupabase();
    return this.executeQuery('getUserProfile', async () =>
      await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    );
  }

  /**
   * Require admin role for operation
   */
  protected async requireAdmin() {
    const user = await this.getCurrentUser();
    const profile = await this.getUserProfile(user.id);

    if (!profile || (profile as any).role !== 'admin') {
      logger.warn('Admin access denied - incorrect role', { 
        userId: user.id, 
        profileRole: (profile as any)?.role,
        expectedRole: 'admin' 
      });
      // Logged above, no need for double logging
      throw new AuthorizationError('Admin access required');
    }

    return { user, profile };
  }

  /**
   * Check if user is authenticated (returns null if not)
   */
  protected async getOptionalUser(): Promise<User | null> {
    try {
      return await this.getCurrentUser();
    } catch {
      return null;
    }
  }

  /**
   * Validate that user owns a resource
   */
  protected async requireOwnership(resourceUserId: string, customMessage?: string) {
    const user = await this.getCurrentUser();
    
    if (user.id !== resourceUserId) {
      logger.warn('Ownership validation failed', {
        userId: user.id,
        resourceUserId,
      });
      throw new AuthorizationError(
        customMessage || 'You do not have permission to access this resource'
      );
    }

    return user;
  }
}
