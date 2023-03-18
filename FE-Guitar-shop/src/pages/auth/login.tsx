import React from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Input } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

import Landing from '@/components/layouts/landing'

const Login = () => {
  const router = useRouter()

  // const [loading, setLoading] = useState<boolean>(false)

  return (
    <Landing>
      <div
        style={{
          background: 'white',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            height: '65vh',
            width: '25%',
            overflowY: 'scroll'
          }}
        >
          <h2 className="homepage-title">Đăng nhập</h2>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            // onFinish={onSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Tài khoản:"
              name="username"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu:"
              name="password"
            >
              <Input.Password />
            </Form.Item>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <a onClick={() => router.push('/auth/register')}>
                <UserAddOutlined style={{ marginRight: '3px' }} />
                Đăng ký tài khoản
              </a>
              <Button
                style={{ background: '#0080FF', color: 'white' }}
                type="text"
                htmlType="submit"
                // loading={loading}
              >
                Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Landing>
  )
}

export default Login
