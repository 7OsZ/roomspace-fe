export interface Facility {
  id: number
  name: string
  icon?: string | null
}

export interface Room {
  id: number
  name: string
  slug: string
  code: string
  location: string
  capacity: number
  description: string | null
  image: string | null
  is_active: boolean
  is_under_maintenance: boolean
  facilities: Facility[]
}
