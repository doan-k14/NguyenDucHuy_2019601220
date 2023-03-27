import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types/next-page'
import { Avatar, Button } from 'antd'
import { getAvatar } from '@/helpers/user'
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

import Landing from '@/components/layouts/landing'

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const userLocal = useLocalStorage<UserInfo>('user', null)
  const userSession = useSessionStorage<UserInfo>('user', null)
  const [user, setUser] = useState<UserInfo>()

  useEffect(() => {
    if (!userLocal[0] && !userSession[0]) router.push('/')
    else setUser(userLocal[0] || userSession[0])
  }, [userLocal, userSession])

  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        height: '70vh'
      }}
    >
      <div>
        <h2 className="homepage-title">Thông tin người dùng</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Avatar
            style={{ background: '#D72027', verticalAlign: 'middle' }}
            size={100}
          >
            <div style={{ fontSize: '3rem' }}>
              {getAvatar(user?.full_name || 'User')}
            </div>
          </Avatar>
          <div style={{ lineHeight: '1.5rem', fontSize: '1rem' }}>
            <div>
              <b>Tài khoản: </b>
              <span>{user?.username}</span>
            </div>
            <div>
              <b>Họ và tên: </b>
              <span>{user?.full_name}</span>
            </div>
            <div>
              <b>Số điện thoại: </b>
              <span>{user?.phone && '0' + user?.phone}</span>
            </div>
            <div>
              <b>Email: </b>
              <span>{user?.email}</span>
            </div>
            <div>
              <b>Địa chỉ: </b>
              <span>{user?.address}</span>
            </div>
            <div>
              <b>Ngày gia nhập: </b>
              <span>
                {user?.created_at &&
                  new Date(user?.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '2rem',
            textAlign: 'center'
          }}
        >
          <Button
            style={{ color: 'white', background: '#D72027' }}
            onClick={() => router.push('/auth/profile/update')}
          >
            Cập nhật thông tin
          </Button>
        </div>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Login
