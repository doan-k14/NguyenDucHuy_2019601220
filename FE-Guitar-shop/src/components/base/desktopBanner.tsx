import { Col, Image, Row } from 'antd'

const DesktopBanner = () => {
  return (
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
  )
}

export default DesktopBanner
