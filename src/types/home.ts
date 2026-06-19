export interface HomeHeroProps {
  name: string
  greeting: string
}

export interface UpcomingBookingItem {
  id: number
  title: string
  date: string
  time: string
  room: string
  floor: string
}

export type UpNextCardProps = Omit<UpcomingBookingItem, 'id'>

export interface RecommendedRoomItem {
  id: number
  slug: string
  image: string | null
  name: string
  floor: string
  capacity: string
  facilities: string
}

export type RoomCardProps = Omit<RecommendedRoomItem, 'id'>
