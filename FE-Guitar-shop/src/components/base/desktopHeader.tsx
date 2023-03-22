import { useEffect, useState } from 'react'
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
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

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
      label: 'Guitar Classic',
      key: '/category/1'
    },
    {
      label: 'Guitar Aucostic',
      key: '/category/2'
    },
    {
      label: 'Ukulele',
      key: '/category/3'
    },
    {
      label: 'Phụ kiện',
      key: '/category/4'
    }
  ]

  const [userLocal, setUserLocal] = useLocalStorage<UserInfo | null>(
    'user',
    null
  )
  const [userSession, setUserSession] = useSessionStorage<UserInfo | null>(
    'user',
    null
  )
  const [user, setUser] = useState<UserInfo | null>(null)

  const onLogout = () => {
    setUserLocal(null)
    setUserSession(null)
    setUser(null)
    router.push('/auth/login')
  }

  const popContent = (
    <div>
      <div>
        <Button
          type="text"
          style={{ marginBottom: '0.5rem', color: '#0080FF' }}
          onClick={() =>
            user?.role === 1 ? router.push('/') : router.push('/customers')
          }
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

  const onClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key || '/')
  }

  useEffect(() => {
    setUser(userSession || userLocal)
  }, [])

  return (
    <>
      <Row>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 20, offset: 2 }}
          span={24}
          offset={0}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Image
            alt="logo"
            preview={false}
            src="https://firebasestorage.googleapis.com/v0/b/ndhuy-498b5.appspot.com/o/2efd6b44584243558050bfeb3f36751a.png?alt=media&token=45310f90-38bf-4015-8679-8a46f3ff2eff"
            height="10rem"
          />
          <Image
            alt="header-banner"
            preview={false}
            src="https://images.cdn4.stockunlimited.net/preview1300/music-banner_1826190.jpg"
            height="10rem"
          />
        </Col>
      </Row>
      <div>
        {/* Menu */}
        <div style={{ background: '#D72027' }}>
          <Row>
            <Col
              xxl={{ span: 14, offset: 5 }}
              xl={{ span: 18, offset: 3 }}
              lg={{ span: 20, offset: 2 }}
              span={24}
              offset={0}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Menu
                onClick={onClick}
                mode="horizontal"
                items={items}
                style={{
                  background: '#D72027',
                  color: 'white',
                  display: 'flex',
                  textTransform: 'uppercase',
                  alignItems: 'center'
                }}
              />
              <Space>
                <Button
                  size="small"
                  title="Sản phẩm yêu thích"
                  onClick={() => router.push('/product/favourite')}
                >
                  <HeartFilled style={{ color: '#FF1935' }} />
                </Button>
                <div style={{ marginRight: '0.5rem' }}>
                  <Button
                    size="small"
                    title="Giỏ hàng"
                    onClick={() => router.push('/cart')}
                  >
                    <ShoppingCartOutlined style={{ color: '#0080FF' }} />
                  </Button>
                </div>
                {user ? (
                  <Popover
                    content={popContent}
                    placement="bottom"
                    trigger="click"
                  >
                    <Button type="text" style={{ color: 'white' }}>
                      Xin chào, {user.full_name}!
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
