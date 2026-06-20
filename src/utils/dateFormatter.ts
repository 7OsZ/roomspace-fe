function parseDateTime(value: string | null | undefined): Date | null {
  if (!value) {
    return null
  }

  const normalizedValue = value.includes('T') ? value : value.replace(' ', 'T')
  const date = new Date(normalizedValue)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date
}

export function formatReadableDate(value: string | null | undefined): string {
  const date = parseDateTime(value)

  if (!date) {
    return '-'
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function formatTime(value: string | null | undefined): string {
  const date = parseDateTime(value)

  if (!date) {
    return '--:--'
  }

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatTimeRange(
  start: string | null | undefined,
  end: string | null | undefined,
): string {
  return `${formatTime(start)} - ${formatTime(end)}`
}
