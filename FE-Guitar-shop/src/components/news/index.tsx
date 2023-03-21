import { Card, Col, Image, Row, Space } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const News = () => {
  const arr = [1, 2, 3]

  return (
    <div>
      {arr.map(key => (
        <Card key={key} hoverable style={{ marginBottom: '1rem' }}>
          <Row>
            <Col span={3}>
              <Image
                alt="news-image"
                preview={false}
                src="https://firebasestorage.googleapis.com/v0/b/ndhuy-498b5.appspot.com/o/2efd6b44584243558050bfeb3f36751a.png?alt=media&token=45310f90-38bf-4015-8679-8a46f3ff2eff"
              />
            </Col>
            <Col span={19}>
              <div style={{ marginLeft: '3rem', overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '1rem',
                    color: '#BF081D',
                    fontWeight: 'bold'
                  }}
                >
                  Tự học đàn Guitar tại nhà với 3 bước đơn giản
                </div>
                <Space style={{ color: 'gray' }}>
                  <ClockCircleOutlined />
                  <span>2023-03-12 15:24:30</span>
                </Space>
                <div>
                  Học đàn Guitar là cách tuyệt vời giúp bạn giải trí, tự tin
                  giao lưu và kết nối với bạn bè khắp nơi. Bạn hãy hình dung xem
                  hình ảnh một chàng trai hoặc một cô gái ôm đàn guitar và hát
                  ca trước mọi người thật vui vẻ phải không?
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  )
}

export default News
