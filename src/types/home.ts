export interface HomeHeroProps {
  name: string
  greeting: string
}

export interface UpNextCardProps {
  id: number
  title: string
  date: string
  time: string
  room: string
  floor: string
}

export interface RoomCardProps {
  slug: string
  image: string | null
  name: string
  floor: string
  capacity: string
  facilities: string
}
