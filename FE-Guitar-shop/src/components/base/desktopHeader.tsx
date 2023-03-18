import { useRouter } from 'next/router'

import {
  Button,
  Col,
  Image,
  Menu,
  MenuProps,
  Popconfirm,
  Popover,
  Row,
  Space
} from 'antd'
import {
  AreaChartOutlined,
  HeartFilled,
  HomeFilled,
  LogoutOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import useLocalStorage from '@/hooks/localStorage'
import { UserInfo } from '@/types/user'
import { useEffect, useState } from 'react'

const DesktopHeader = () => {
  const router = useRouter()
  const items: MenuProps['items'] = [
    {
      itemIcon: (
        <HomeFilled
          style={{
            fontSize: '1.25rem',
            lineHeight: '1.75rem'
          }}
        />
      ),
      key: '/'
    },
    {
      label: 'Hướng dẫn',
      key: '/guide'
    },
    {
      label: 'Điều khoản',
      key: '/rules'
    },
    {
      label: 'Liên hệ',
      key: '/contact'
    }
  ]

  const [user, setUser] = useLocalStorage<UserInfo | null>('user', null)
  const [username, setUsername] = useState<string | null>(null)

  const onLogout = () => {
    setUser(null)
    setUsername(null)
    router.push('/auth/login')
  }

  const popContent = (
    <div>
      <div>
        <Button
          type="text"
          style={{ marginBottom: '0.5rem', color: '#0080FF' }}
          onClick={() => router.push('/users')}
        >
          <AreaChartOutlined />
          Đến trang quản lý
        </Button>
      </div>
      <Popconfirm
        title="Bạn có chắc muốn đăng xuất?"
        onConfirm={onLogout}
        okText="Xác nhận"
        cancelText="Đóng"
      >
        <Button type="text" style={{ width: '100%', color: '#0080FF' }}>
          <LogoutOutlined />
          Đăng xuất
        </Button>
      </Popconfirm>
    </div>
  )

  useEffect(() => {
    const sessionUsername = window.sessionStorage.getItem('username')
    setUsername(sessionUsername || user?.username || null)
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          background: 'white',
          paddingLeft: '10rem',
          paddingRight: '10rem'
        }}
      >
        <Image
          preview={false}
          src="https://firebasestorage.googleapis.com/v0/b/ndhuy-498b5.appspot.com/o/2efd6b44584243558050bfeb3f36751a.png?alt=media&token=45310f90-38bf-4015-8679-8a46f3ff2eff"
          height="10rem"
        />
        <Image
          preview={false}
          src="https://images.cdn4.stockunlimited.net/preview1300/music-banner_1826190.jpg"
          height="10rem"
        />
      </div>
      <div>
        {/* Menu */}
        <div style={{ background: '#0080FF' }}>
          <Row>
            <Col
              xxl={{ span: 14, offset: 5 }}
              xl={{ span: 18, offset: 3 }}
              lg={{ span: 20, offset: 2 }}
              span={24}
              offset={0}
              style={{
                padding: '0 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Menu
                // onClick={onClick}
                mode="horizontal"
                items={items}
                style={{
                  background: '#0080FF',
                  color: 'white',
                  display: 'flex',
                  textTransform: 'uppercase',
                  alignItems: 'center'
                }}
              />
              <Space>
                <Button size="small" title="Sản phẩm yêu thích">
                  <HeartFilled style={{ color: '#FF1935' }} />
                </Button>
                <Button size="small" title="Giỏ hàng">
                  <ShoppingCartOutlined style={{ color: '#0080FF' }} />
                </Button>
                {username ? (
                  <Popover
                    content={popContent}
                    placement="bottom"
                    trigger="click"
                  >
                    <Button type="text" style={{ color: 'white' }}>
                      Xin chào, {username}!
                    </Button>
                  </Popover>
                ) : (
                  <Button onClick={() => router.push('/auth/login')}>
                    Đăng nhập
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default DesktopHeader
