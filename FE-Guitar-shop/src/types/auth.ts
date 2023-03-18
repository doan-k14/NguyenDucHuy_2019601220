import { UserInfo } from "./user"

export type LoginPayload = {
  username: string
  password: string
}

export type RegisterPayload = {
  full_name: string
  username: string
  password: string
  email: string
  phone: number
  address: string
}

export type UserResponse = {
  user: UserInfo
}

export type UserResponseWithAccessToken = {
  user: UserInfo
  access_token: string
}
