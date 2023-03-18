import React, { ReactElement, useState } from 'react'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Button, Form, Input } from 'antd'
import { NextPageWithLayout } from '@/types/next-page'
import { AuthService } from '@/services/auth'

import Landing from '@/components/layouts/landing'

const Register: NextPageWithLayout = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<number>(0)
  const [address, setAddress] = useState<string>('')

  const onSubmit = async () => {
    try {
      setLoading(true)
      const payload = {
        full_name: name,
        username: username,
        password: password,
        email: email,
        phone: phone,
        address: address
      }
      if (await AuthService.register(payload))
        notificationSuccess('Đăng ký thành công!')
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
        justifyContent: 'center'
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
        >
          <Form.Item
            label="Họ và tên"
            name="full_name"
            rules={[{ required: true, message: `Vui lòng nhập họ tên` }]}
          >
            <Input onBlur={e => setName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Điện thoại"
            name="phone_number"
            rules={[{ required: true, message: `Vui lòng nhập số điện thoại` }]}
          >
            <Input onBlur={e => setPhone(parseInt(e.target.value))} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: `Vui lòng nhập email`, type: 'email' }
            ]}
          >
            <Input onBlur={e => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: `Vui lòng nhập địa chỉ` }]}
          >
            <Input onBlur={e => setAddress(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: `Vui lòng nhập tài khoản` }]}
          >
            <Input onBlur={e => setUsername(e.target.value)} />
          </Form.Item>

          {/* Move password... input out of loop -> password can be shown in loop */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: `Vui lòng nhập mật khẩu` }]}
          >
            <Input.Password onBlur={e => setPassword(e.target.value)} />
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
              style={{ background: '#0080FF', color: 'white' }}
              htmlType="submit"
              loading={loading}
              onClick={onSubmit}
            >
              Đăng ký
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <a>Bạn đã có tài khoản? Đăng nhập tại đây</a>
          </div>
        </Form>
      </div>
    </div>
  )
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Register
