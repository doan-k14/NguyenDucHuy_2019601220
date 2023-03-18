export type UserInfo = {
  id: number
  username: string
  password: string
  full_name: string
  phone: number
  email: string
  address: string
  role: boolean
  created_at: string
  updated_at: string
}

export type User = {
  isLoggedIn: boolean
  info?: UserInfo
}
