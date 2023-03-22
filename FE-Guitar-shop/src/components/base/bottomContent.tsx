import { Col, Image, Row } from 'antd'

import News from '../news'

const BottomContent = () => {
  return (
    <>
      {/* Static banner */}
      <Row>
        <Image alt="middle-banner" preview={false} src="/images/slide3.jpg" />
      </Row>
      {/* News */}
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col span={16} offset={4} style={{ padding: '0 1rem' }}>
          <div
            style={{
              color: '#00264D'
            }}
          >
            <h2 className="homepage-title">Tin tức</h2>
            <News />
          </div>
        </Col>
      </Row>
      {/* Brand */}
      <h2 className="homepage-title">Nhãn hàng</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image alt="brands" src="/images/footer-banner.jpg" preview={false} />
      </div>
    </>
  )
}

export default BottomContent
