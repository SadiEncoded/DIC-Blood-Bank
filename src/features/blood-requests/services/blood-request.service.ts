/**
 * Blood Request Service
 * Handles all blood request operations
 */

import { logger } from '@/lib/logger';
import { BaseService } from '@/lib/services/base.service';
import { bloodRequestSchemas, validateData } from '@/lib/validation/schemas';
import { mapBloodTypeToDB, mapUrgencyToDB } from '@/utils/db-mapping';
import { z } from 'zod';

type CreateBloodRequestInput = z.infer<typeof bloodRequestSchemas.create>;
type UpdateBloodRequestInput = z.infer<typeof bloodRequestSchemas.update>;
type FilterBloodRequestInput = z.infer<typeof bloodRequestSchemas.filter>;

export class BloodRequestService extends BaseService {
  /**
   * Create a new blood request
   */
  async create(input: CreateBloodRequestInput) {
    // Validate input
    const validated = validateData(bloodRequestSchemas.create, input);

    // Require authentication
    const user = await this.getCurrentUser();

    logger.info('Creating blood request', {
      userId: user.id,
      bloodType: validated.blood_type,
      urgency: validated.urgency,
    });

    // Map to database format
    const dbData = {
      patient_name: validated.patient_name,
      blood_type: mapBloodTypeToDB(validated.blood_type),
      units: validated.units,
      hospital: validated.hospital,
      location: validated.location,
      contact_name: validated.contact_name,
      contact_phone: validated.contact_phone,
      urgency: mapUrgencyToDB(validated.urgency),
      needed_by: validated.needed_by,
      notes: validated.notes,
      status: 'PENDING' as const,
    };

    // Execute database operation
    const supabase = await this.getSupabase();
    const result = await this.executeQuery('createBloodRequest', async () =>
      await supabase
        .from('blood_requests')
        .insert(dbData)
        .select()
        .single()
    );

    if (result) {
      logger.info('Blood request created successfully', {
        requestId: (result as any).id,
        trackingId: (result as any).tracking_id,
      });
    }

    return result;
  }

  /**
   * Get blood request by ID
   */
  async getById(id: string) {
    logger.debug('Fetching blood request', { requestId: id });

    const supabase = await this.getSupabase();
    return this.executeQuery('getBloodRequest', async () =>
      await supabase
        .from('blood_requests')
        .select('*')
        .eq('id', id)
        .single()
    );
  }

  /**
   * Get blood request by tracking ID
   */
  async getByTrackingId(trackingId: string) {
    logger.debug('Fetching blood request by tracking ID', { trackingId });

    const supabase = await this.getSupabase();
    return this.executeQuery('getBloodRequestByTrackingId', async () =>
      await supabase
        .from('blood_requests')
        .select('*')
        .eq('tracking_id', trackingId)
        .single()
    );
  }

  /**
   * List blood requests with optional filters
   */
  async list(filters?: FilterBloodRequestInput) {
    const validated = filters
      ? validateData(bloodRequestSchemas.filter, filters)
      : {};

    logger.debug('Listing blood requests', { filters: validated });

    const supabase = await this.getSupabase();
    let query = supabase
      .from('blood_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (validated.status) {
      query = query.eq('status', validated.status);
    }
    if (validated.blood_type) {
      query = query.eq('blood_type', mapBloodTypeToDB(validated.blood_type));
    }
    if (validated.urgency) {
      query = query.eq('urgency', mapUrgencyToDB(validated.urgency));
    }
    if (validated.location) {
      query = query.ilike('location', `%${validated.location}%`);
    }

    return this.executeQuery('listBloodRequests', async () => await query);
  }

  /**
   * Get user's own blood requests
   */
  async getMyRequests() {
    const user = await this.getCurrentUser();

    logger.debug('Fetching user blood requests', { userId: user.id });

    // Note: The database schema currently doesn't have a requester_id column.
    // This is a placeholder for when the linkage is added.
    return [];
  }

  /**
   * Update blood request status (admin only)
   */
  async updateStatus(id: string, status: string) {
    await this.requireAdmin();

    logger.info('Updating blood request status', { requestId: id, status });

    const supabase = await this.getSupabase();
    const res = await this.executeQuery('updateBloodRequestStatus', async () =>
      await supabase
        .from('blood_requests')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()
    );

    // If fulfilled, record life saved
    if (res && status === 'FULFILLED') {
        const req = res as any;
        await this.recordLifeSaved({
            request_id: req.id,
            patient_name: req.patient_name,
            blood_type: req.blood_type,
            location: req.location,
            hospital: req.hospital,
            units: req.units
        });
    }

    return res;
  }

  /**
   * Record a life saved in the permanent impact table
   */
  async recordLifeSaved(data: {
      request_id: string;
      patient_name: string;
      blood_type: string;
      location: string;
      hospital: string;
      units: number;
  }) {
    logger.info('Recording life saved', { requestId: data.request_id });
    
    const supabase = await this.getSupabase();
    return this.executeQuery('recordLifeSaved', async () =>
        await supabase.rpc('record_life_saved', {
            p_request_id: data.request_id,
            p_patient_name: data.patient_name,
            p_blood_type: data.blood_type,
            p_units: data.units,
            p_hospital: data.hospital,
            p_location: data.location,
            p_donor_id: null
        })
    );
  }

  /**
   * Update blood request (admin only)
   */
  async update(id: string, input: UpdateBloodRequestInput) {
    await this.requireAdmin();

    const validated = validateData(bloodRequestSchemas.update, input);

    logger.info('Updating blood request', { requestId: id });

    const supabase = await this.getSupabase();
    return this.executeQuery('updateBloodRequest', async () =>
      await supabase
        .from('blood_requests')
        .update({
          ...validated,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Delete blood request (admin only)
   */
  async delete(id: string) {
    await this.requireAdmin();

    logger.warn('Deleting blood request', { requestId: id });

    const supabase = await this.getSupabase();
    return this.executeQuery('deleteBloodRequest', async () =>
      await supabase
        .from('blood_requests')
        .delete()
        .eq('id', id)
        .select()
        .single()
    );
  }

  /**
   * Get global impact count (Total lives saved)
   */
  async getGlobalImpact() {
    const supabase = await this.getSupabase();
    const { count } = await supabase
        .from('lives_saved')
        .select('*', { count: 'exact', head: true });
    
    return count || 0;
  }

  /**
   * Get total number of blood requests ever made
   */
  async getTotalRequestsCount() {
    const supabase = await this.getSupabase();
    const { count } = await supabase
        .from('blood_requests')
        .select('*', { count: 'exact', head: true });
    
    return count || 0;
  }

  /**
   * List all donation verifications (Admin only)
   */
  async listVerifications() {
    await this.requireAdmin();
    const supabase = await this.getAdminSupabase();
    return this.executeQuery('listVerifications', async () =>
      await supabase
        .from('donation_verifications')
        .select(`
          *,
          blood_requests (
            patient_name,
            blood_type,
            tracking_id
          )
        `)
        .order('created_at', { ascending: false })
    );
  }

  /**
   * Submit donation verification proof
   */
  async submitVerification(data: {
    request_id: string;
    donor_id?: string;
    prescription_url: string;
    blood_bag_url: string;
  }) {
    logger.info('Submitting donation verification', { requestId: data.request_id });

    const supabase = await this.getSupabase();
    return this.executeQuery('submitVerification', async () =>
      await supabase
        .from('donation_verifications')
        .insert({
          request_id: data.request_id,
          donor_id: data.donor_id,
          prescription_url: data.prescription_url,
          blood_bag_url: data.blood_bag_url,
          status: 'PENDING'
        })
        .select()
        .single()
    );
  }

  /**
   * Get verification details for a request
   */
  async getVerificationByRequestId(requestId: string) {
    const supabase = await this.getSupabase();
    return this.executeOptionalQuery('getVerificationByRequestId', async () =>
      await supabase
        .from('donation_verifications')
        .select('*')
        .eq('request_id', requestId)
        .single()
    );
  }

  /**
   * Confirm/Approve a donation verification (Admin only)
   */
  async confirmVerification(verificationId: string) {
    await this.requireAdmin();

    logger.info('Confirming donation verification', { verificationId });

    const supabase = await this.getSupabase();
    const result = await this.executeQuery('confirmVerification', async () =>
      await supabase
        .from('donation_verifications')
        .update({
          status: 'APPROVED',
          confirmed_at: new Date().toISOString()
        })
        .eq('id', verificationId)
        .select()
        .single()
    );

    // After confirming verification, update the blood request status to FULFILLED
    if (result) {
        const verification = result as any;
        await this.updateStatus(verification.request_id, 'FULFILLED');
    }

    return result;
  }
}

// Export singleton instance
export const bloodRequestService = new BloodRequestService();
