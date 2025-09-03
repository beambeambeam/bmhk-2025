export function formatDate(date: Date | string | number | undefined, opts: Intl.DateTimeFormatOptions = {}) {
  if (!date) return ""

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date))
  } catch {
    return ""
  }
}

export function mapPrefixToThai(prefix?: string | null) {
  if (!prefix) return ""
  const upper = prefix.toUpperCase()
  if (upper === "MR") return "นาย"
  if (upper === "MS") return "นางสาว"
  if (upper === "MRS") return "นาง"
  return prefix
}
