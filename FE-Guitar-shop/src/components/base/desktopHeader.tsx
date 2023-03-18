import { Col, Image, Menu, MenuProps, Row } from 'antd'
import { HomeFilled } from '@ant-design/icons'

const DesktopHeader = () => {
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
              style={{ padding: '0 1rem' }}
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
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default DesktopHeader
