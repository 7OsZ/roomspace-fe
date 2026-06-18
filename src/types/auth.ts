export type UserRole = 'employee' | 'admin'

export interface Department {
  id: number
  name: string
}

export interface User {
  id: number
  employee_id: string
  name: string
  email: string
  role: UserRole
  department: Department | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginData {
  user: User
  token: string
  token_type: string
}
