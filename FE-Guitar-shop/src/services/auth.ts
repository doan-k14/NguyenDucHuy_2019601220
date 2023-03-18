import {
  RegisterPayload,
  UserResponse
} from '@/types/auth'

import { client } from './client'

export const AuthService = {
    register(payload: RegisterPayload): Promise<UserResponse> {
    return client.post('/user/register', { ...payload })
  }
}
