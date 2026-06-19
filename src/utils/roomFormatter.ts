import type { Room } from '@/types/room'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://roomspaceapi.test/api'
const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, '')

export function getRoomFacilitiesText(room: Room): string {
  const facilities = Array.isArray(room.facilities) ? room.facilities : []
  const names = facilities.map((facility) => facility.name).filter(Boolean)

  if (!names.length) {
    return 'No facilities listed'
  }

  if (names.length <= 3) {
    return names.join(' • ')
  }

  return `${names.slice(0, 2).join(' • ')} • +${names.length - 2} more`
}

export function getRoomImageUrl(image: string | null): string {
  if (!image) {
    return ''
  }

  if (image.startsWith('http')) {
    return image
  }

  if (image.startsWith('/storage')) {
    return `${apiOrigin}${image}`
  }

  return `${apiOrigin}/storage/${image}`
}
