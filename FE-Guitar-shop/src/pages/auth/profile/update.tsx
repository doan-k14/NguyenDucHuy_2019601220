import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Button, Form, Input, InputNumber } from 'antd'
import { NextPageWithLayout } from '@/types/next-page'
import { UpdatePayload, UserInfo } from '@/types/user'
import { AuthService } from '@/services/auth'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

import Landing from '@/components/layouts/landing'

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const [userLocal, setUserLocal] = useLocalStorage<UserInfo>('user', null)
  const [userSession, setUserSession] = useSessionStorage<UserInfo>(
    'user',
    null
  )
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (payload: UpdatePayload) => {
    try {
      setLoading(true)
      if (await AuthService.update(userLocal?.id || userSession?.id, payload)) {
        userLocal
          ? setUserLocal({
              ...userLocal,
              address: payload.address,
              email: payload.email,
              full_name: payload.full_name,
              phone: payload.phone
            })
          : setUserSession({
              ...userSession,
              address: payload.address,
              email: payload.email,
              full_name: payload.full_name,
              phone: payload.phone
            })
        notificationSuccess('Cập nhật thành công')
        router.push('/auth/profile')
      }
    } catch {
      notificationError('Cập nhật thất bại')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!userLocal && !userSession) router.push('/')
  }, [userLocal, userSession])

  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem'
      }}
    >
      <div>
        <h2 className="homepage-title">Cập nhật thông tin</h2>
        <Form
          layout="vertical"
          autoComplete="off"
          style={{ width: '30rem' }}
          onFinish={onSubmit}
        >
          {/* Full name */}
          <Form.Item
            label="Họ và tên:"
            name="full_name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            initialValue={userLocal?.full_name || userSession?.full_name}
          >
            <Input />
          </Form.Item>
          {/* Phone */}
          <Form.Item
            label="Điện thoại:"
            name="phone"
            initialValue={userLocal?.phone || userSession?.phone}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          {/* Email */}
          <Form.Item
            label="Email:"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
            initialValue={userLocal?.email || userSession?.email}
          >
            <Input />
          </Form.Item>
          {/* Address */}
          <Form.Item
            label="Địa chỉ:"
            name="address"
            initialValue={userLocal?.address || userSession?.address}
          >
            <Input />
          </Form.Item>
          <div
            style={{
              marginTop: '2rem',
              textAlign: 'center'
            }}
          >
            <Button
              htmlType="submit"
              style={{ color: 'white', background: '#D72027' }}
              loading={loading}
            >
              Cập nhật thông tin
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Login
