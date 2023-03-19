import { Badge, Button, Card, Space } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { formatPrice } from '@/helpers/currency'

const { Meta } = Card

const NewProducts = () => {
  const description = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: '#D72027', fontSize: '1rem', fontWeight: 'bold' }}>
        {formatPrice(2500000)}
      </span>
      <Button size="small" title="Sản phẩm yêu thích">
        <HeartOutlined style={{ color: '#FF1935' }} />
      </Button>
    </div>
  )

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div
      style={{
        marginBottom: '2rem',
        overflowX: 'scroll',
        background: '#F0F0F0'
      }}
    >
      <Space>
        {arr.map(key => (
          <Badge.Ribbon
            key={key}
            text="New"
            color="volcano"
            style={{ display: 'flex' }}
          >
            <Card
              size="small"
              hoverable
              style={{ width: 220 }}
              cover={
                <img
                  alt="example"
                  src="https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/manticsaga/gt1-gcbk/dan_guitar_acoustic_gt1bkx500x500x4.jpg"
                />
              }
            >
              <Meta
                title="Acoustic Mantic GT-1GCBK"
                description={description}
              />
            </Card>
          </Badge.Ribbon>
        ))}
      </Space>
    </div>
  )
}

export default NewProducts
