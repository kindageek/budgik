export function numWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toTitleCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0] ?? date.toLocaleDateString();
}

export function removeDuplicates<Type>(arr: Type[]): Type[] {
  const res: Type[] = [];
  for (const item of arr) {
    if (!res.includes(item)) res.push(item);
  }
  return res;
}
