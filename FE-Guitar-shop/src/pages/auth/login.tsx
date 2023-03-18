import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import Landing from '@/components/layouts/landing'
import { NextPageWithLayout } from '@/types/next-page'
import { LoginPayload } from '@/types/auth'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { AuthService } from '@/services/auth'
import useLocalStorage from '@/hooks/localStorage'
import { UserInfo } from '@/types/user'

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const userInfo = useLocalStorage<UserInfo>('user', null)
  const [autoLogin, setAutoLogin] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: LoginPayload) => {
    try {
      setLoading(true)
      const response = await AuthService.login(values)
      if (response.length === 0) {
        notificationError('Tài khoản hoặc mật khẩu không đúng')
      } else {
        notificationSuccess('Đăng nhập thành công!')
        if(autoLogin) userInfo[1]({...response[0], password: '******'})
        else window.sessionStorage.setItem('username', response[0].username)
        router.push('/users')
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
        height: '70vh'
      }}
    >
      <div
        style={{
          width: '25%'
        }}
      >
        <h2 className="homepage-title">Đăng nhập</h2>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tài khoản"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Checkbox onClick={() => setAutoLogin(!autoLogin)} style={{ color: '#0080FF', marginBottom: '0.5rem' }}>
            Ghi nhớ đăng nhập
          </Checkbox>

          <Form.Item>
            <Button
              style={{
                background: '#0080FF',
                color: 'white',
                width: '100%',
                marginBottom: '0.5rem'
              }}
              htmlType="submit"
              loading={loading}
            >
              Đăng nhập
            </Button>
            <Button type="link" onClick={() => router.push('/auth/register')}>
              Đăng ký ngay!
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Login
