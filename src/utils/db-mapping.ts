export type BloodTypeDB = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export function mapBloodTypeToDB(type: string): BloodTypeDB {
  const map: Record<string, BloodTypeDB> = {
    'A+': 'A+',
    'A-': 'A-',
    'B+': 'B+',
    'B-': 'B-',
    'AB+': 'AB+',
    'AB-': 'AB-',
    'O+': 'O+',
    'O-': 'O-',
  };
  return map[type] || 'O+';
}

export function mapDBToBloodType(type: string): string {
  return type; // They are the same now in the DB enum
}

export function mapUrgencyToDB(urgency: string): string {
  const map: Record<string, string> = {
    'normal': 'NORMAL',
    'urgent': 'URGENT',
    'critical': 'CRITICAL',
  };
  return map[urgency?.toLowerCase()] || 'NORMAL';
}
