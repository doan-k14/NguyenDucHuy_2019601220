import {
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
  UserResponse
} from '@/types/auth'

import { client } from './client'
import { UserInfo } from '@/types/user'

export const AuthService = {
  register(payload: RegisterPayload): Promise<UserResponse> {
    return client.post('/user/register', { ...payload })
  },
  login(payload: LoginPayload): Promise<UserInfo[]> {
    return client.post('/user/login', { ...payload })
  },
  changePassword(payload: ChangePasswordPayload) {
    return client.post('/user/change-password', { ...payload })
  }
}
