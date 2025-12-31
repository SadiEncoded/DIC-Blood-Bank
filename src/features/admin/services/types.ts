export type RequestStatus = 'PENDING' | 'APPROVED' | 'FULFILLED' | 'CANCELLED';
export type UrgencyLevel = 'NORMAL' | 'URGENT' | 'CRITICAL';

export interface BloodRequestFilters {
  status?: RequestStatus;
  urgency?: UrgencyLevel;
  bloodType?: string;
  searchTerm?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}

export interface AdminStats {
  pendingRequests: number;
  activeSearches: number;
  criticalNeeds: number;
  verifiedDonors: number;
  totalDonors: number;
}
