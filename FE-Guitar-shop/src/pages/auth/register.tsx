import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Button, Form, Input, Space } from 'antd'
import { NextPageWithLayout } from '@/types/next-page'
import { RegisterPayload } from '@/types/auth'
import { AuthService } from '@/services/auth'
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'

import Landing from '@/components/layouts/landing'

const Register: NextPageWithLayout = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const user = useSessionStorage<UserInfo>('user', null)

  const onSubmit = async (payload: RegisterPayload) => {
    try {
      setLoading(true)
      if (await AuthService.register(payload)) {
        notificationSuccess('Đăng ký thành công!')
        const newUser = await AuthService.newUser()
        if (newUser) {
          user[1](newUser)
          window.location.replace('/')
        }
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}
    >
      <div
        style={{
          width: '25%'
        }}
      >
        <h2 className="homepage-title">Đăng ký tài khoản</h2>
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onSubmit}
        >
          <Form.Item
            label="Họ và tên"
            name="full_name"
            rules={[{ required: true, message: `Vui lòng nhập họ tên` }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: `Vui lòng nhập email`, type: 'email' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: `Vui lòng nhập tài khoản` }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: `Vui lòng nhập mật khẩu` }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            hasFeedback
            name="confirm"
            rules={[
              { required: true, message: `Vui lòng nhập xác nhận mật khẩu` },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Xác nhận mật khẩu không trùng khớp!')
                  )
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              style={{ background: '#D72027', color: 'white', width: '100%' }}
              htmlType="submit"
              loading={loading}
            >
              Đăng ký
            </Button>
          </div>
          <Space
            style={{
              marginTop: '0.5rem'
            }}
          >
            Bạn đã có tài khoản?
            <a onClick={() => router.push('/auth/login')}>Đăng nhập tại đây</a>
          </Space>
        </Form>
      </div>
    </div>
  )
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Register
