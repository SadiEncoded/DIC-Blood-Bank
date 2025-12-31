'use server';

import { reportService } from './report.service';

export async function submitReport(targetId: string, reason: string, details?: string) {
  try {
    await reportService.submitReport(targetId, reason, details);
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error submitting report:', error);
    return { success: false, error: error.message };
  }
}

export async function getReports(limit = 50) {
  try {
    const data = await reportService.getReports(limit);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateReportStatus(reportId: string, status: 'PENDING' | 'RESOLVED' | 'DISMISSED') {
  try {
    await reportService.updateReportStatus(reportId, status);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
