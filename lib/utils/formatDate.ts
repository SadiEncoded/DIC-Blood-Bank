export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
