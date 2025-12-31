import { BaseService } from '@/lib/services/base.service';

export class ReportService extends BaseService {
  /**
   * Submit a report (flag) for a user
   */
  async submitReport(targetId: string, reason: string, details?: string) {
    const user = await this.getCurrentUser();
    const supabase = await this.getSupabase();

    // Prevent self-reporting
    if (user.id === targetId) {
        throw new Error("You cannot report yourself.");
    }

    const { error } = await supabase
      .from('user_reports')
      .insert({
        reporter_id: user.id,
        target_id: targetId,
        reason,
        details,
      });

    if (error) throw error;
    return { success: true };
  }
  /**
   * Get reports (Admin only)
   */
  async getReports(limit = 50) {
    await this.requireAdmin();
    const supabase = await this.getSupabase();
    
    const { data, error } = await supabase
      .from('user_reports')
      .select(`
        *,
        reporter:reporter_id(full_name),
        target:target_id(full_name)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  /**
   * Update report status (Admin only)
   */
  async updateReportStatus(reportId: string, status: 'PENDING' | 'RESOLVED' | 'DISMISSED') {
    await this.requireAdmin();
    const supabase = await this.getSupabase();

    const { error } = await supabase
      .from('user_reports')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', reportId);

    if (error) throw error;
    return { success: true };
  }
}

export const reportService = new ReportService();
