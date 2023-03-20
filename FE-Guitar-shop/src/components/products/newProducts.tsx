import { Badge, Button, Card, Skeleton, Space } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { notificationSuccess } from '@/helpers/notification'
import { formatPrice } from '@/helpers/currency'
import { Product } from '@/types/product'
import useLocalStorage from '@/hooks/localStorage'

const { Meta } = Card

type Props = {
  products?: Product[]
  loading: boolean
  label: string
}

const NewProducts = (props: Props) => {
  const { products, loading, label } = props
  const [loveProducts, setLoveProducts] = useLocalStorage<Product[]>(
    'love-products',
    []
  )

  const onSelectLoveProduct = (loveProduct: Product) => {
    if (!loveProducts.find(product => product.id === loveProduct.id)) {
      setLoveProducts([...loveProducts, loveProduct])
      notificationSuccess('Thêm sản phẩm yêu thích thành công!')
    }
  }

  const onDeleteLoveProduct = (loveProduct: Product) => {
    setLoveProducts(
      loveProducts.filter(product => product.id !== loveProduct.id)
    )
    notificationSuccess('Xóa sản phẩm yêu thích thành công!')
  }

  const description = (loveProduct: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span
          style={{ color: '#D72027', fontSize: '1rem', fontWeight: 'bold' }}
        >
          {formatPrice(loveProduct.price)}
        </span>
        {loveProducts.find(product => product.id === loveProduct.id) ? (
          <Button
            size="small"
            title="Đã trong mục ưa thích"
            onClick={() => onDeleteLoveProduct(loveProduct)}
          >
            <HeartFilled style={{ color: '#FF1935' }} />
          </Button>
        ) : (
          <Button
            size="small"
            title="Thêm vào mục ưa thích"
            onClick={() => onSelectLoveProduct(loveProduct)}
          >
            <HeartOutlined style={{ color: '#FF1935' }} />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        marginBottom: '2rem',
        overflowX: 'scroll',
        background: '#F0F0F0'
      }}
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <Space>
          {products &&
            products.map(product => (
              <Badge.Ribbon
                key={product.id}
                text={label}
                color={label === 'Hot' ? 'volcano' : 'green'}
                style={{ display: 'flex' }}
              >
                <Card
                  size="small"
                  hoverable
                  style={{ width: 220 }}
                  cover={<img alt="product" src={product.image} />}
                >
                  <Meta
                    title={product.name}
                    description={description(product)}
                  />
                </Card>
              </Badge.Ribbon>
            ))}
        </Space>
      )}
    </div>
  )
}

export default NewProducts
