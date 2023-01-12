export function transformTagArray(tags: string[]): string[] {
  return Array.from(new Set(tags.map((tag) => tag.toLowerCase())));
}
