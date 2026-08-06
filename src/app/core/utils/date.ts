/** Formats a Date as a local yyyy-MM-dd string (not UTC — `toISOString` would shift near midnight). */
export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** 'Today' / 'Tomorrow' for the two near dates, otherwise a short weekday + date. */
export function formatRelativeDay(iso: string): string {
  const today = toIsoDate(new Date());
  const tomorrow = toIsoDate(addDays(new Date(), 1));

  if (iso === today) {
    return 'Today';
  }
  if (iso === tomorrow) {
    return 'Tomorrow';
  }
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}
