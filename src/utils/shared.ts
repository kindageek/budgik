import type { MonthName } from 'types/types';

export function numWithCommas(num: number): string {
  return num
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export function sum(arr?: number[]) {
  return arr ? arr.reduce((sum, value) => sum + value, 0) : 0;
}

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getMonthFromDate(date: string | Date) {
  return new Date(date).toLocaleString("default", {
    month: "long",
  }) as MonthName;
}
