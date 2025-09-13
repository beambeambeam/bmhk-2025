/**
 * Utility functions for CSV export functionality
 */

export interface CSVExportOptions {
  filename?: string
  includeHeaders?: boolean
}

/**
 * Converts an array of objects to CSV format
 */
export function arrayToCSV<T extends Record<string, any>>(data: T[], options: CSVExportOptions = {}): string {
  if (data.length === 0) return ""

  const { includeHeaders = true } = options

  // Get all unique keys from all objects
  const allKeys = Array.from(new Set(data.flatMap((item) => Object.keys(item))))

  // Create CSV content
  const csvRows: string[] = []

  // Add headers if requested
  if (includeHeaders) {
    csvRows.push(allKeys.map(escapeCSVField).join(","))
  }

  // Add data rows
  for (const item of data) {
    const row = allKeys.map((key) => {
      const value = item[key]
      return escapeCSVField(value)
    })
    csvRows.push(row.join(","))
  }

  return csvRows.join("\n")
}

/**
 * Escapes a field value for CSV format
 */
function escapeCSVField(value: any): string {
  if (value === null || value === undefined) {
    return ""
  }

  const stringValue = String(value)

  // If the value contains comma, newline, or double quote, wrap in quotes and escape quotes
  if (stringValue.includes(",") || stringValue.includes("\n") || stringValue.includes('"')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

/**
 * Downloads a CSV string as a file
 */
export function downloadCSV(csvContent: string, filename: string = "export.csv"): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

/**
 * Exports table data to CSV and downloads it
 */
export function exportTableToCSV<T extends Record<string, any>>(
  data: T[],
  options: CSVExportOptions = {}
): void {
  const { filename = "export.csv" } = options
  const csvContent = arrayToCSV(data, options)
  downloadCSV(csvContent, filename)
}
