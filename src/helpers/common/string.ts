export function removeExtraSpaces(str: string): string {
  return str.replace(/^\s+|\s(?=\s)|\s$/g, "");
}

export function normalizeString(str: string): string {
  return str.trim().replace(/\s{2,}|(\r?\n)/g, " ");
}
