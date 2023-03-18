import { EnvironmentFilled, PhoneFilled, MailFilled } from '@ant-design/icons'
import { Col, Row, Space } from 'antd'

const Footer = () => {
  const date = new Date().getFullYear()
  const colStyle = {
    marginBottom: '5px',
    lineHeight: '1.5'
  }
  const h3Style = {
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '20px',
    marginBottom: '10px'
  }

  return (
    <Row style={{ background: '#0080ff' }}>
      <Col
        xxl={{ span: 14, offset: 5 }}
        xl={{ span: 16, offset: 4 }}
        lg={{ span: 18, offset: 3 }}
        span={24}
        offset={0}
        style={{ padding: '0 1rem' }}
      >
        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            letterSpacing: '-0.025em',
            color: 'white'
          }}
        >
          <Col>
            <h3 style={h3Style}>GUITAR SHOP ELDEN SONG</h3>
            <div style={colStyle}>
              <Space>
                <EnvironmentFilled />
              </Space>
              <strong style={{ fontWeight: 'bolder', paddingLeft: '3px' }}>
                Trụ sở :
              </strong>{' '}
              Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội
            </div>
            <h3 style={h3Style}>HỖ TRỢ</h3>
            <div style={colStyle}>
              <Space>
                <PhoneFilled />
              </Space>
              <strong
                style={{
                  fontWeight: 'bolder',
                  textTransform: 'uppercase',
                  paddingLeft: '3px'
                }}
              >
                hotline:
              </strong>{' '}
              0362274026
            </div>
            <div style={colStyle}>
              <Space>
                <MailFilled />
              </Space>
              <strong
                style={{
                  fontWeight: 'bolder',
                  textTransform: 'uppercase',
                  paddingLeft: '3px'
                }}
              >
                Email :
              </strong>{' '}
              duc4422@gmail.com
            </div>
          </Col>
          <Col>
            <h3 style={h3Style}>FANPAGE FACEBOOK</h3>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F100068644043318%2Fprofessional_dashboard%2F&tabs=timeline&width=330&height=330&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=261233472276059"
              width="330"
              height="130"
              style={{ border: 'none', overflow: 'hidden' }}
            ></iframe>
          </Col>
        </Row>
        <p
          style={{
            margin: 0,
            padding: '15px 0',
            lineHeight: 1.7,
            color: 'white'
          }}
        >
          &copy; Copyright {date}. Bản quyền thuộc về Guitar shop Elden Song
        </p>
      </Col>
    </Row>
  )
}

export default Footer
