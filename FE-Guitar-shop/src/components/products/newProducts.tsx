import { Badge, Button, Card, Skeleton, Space } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
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
    if (!loveProducts.find(product => product === loveProduct)) {
      const tempList = loveProducts
      tempList.push(loveProduct)
      setLoveProducts(tempList)
    }
  }

  const description = (product: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span
          style={{ color: '#D72027', fontSize: '1rem', fontWeight: 'bold' }}
        >
          {formatPrice(product.price)}
        </span>
        <Button
          size="small"
          title="Sản phẩm yêu thích"
          onClick={() => onSelectLoveProduct(product)}
        >
          <HeartOutlined style={{ color: '#FF1935' }} />
        </Button>
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
                color="volcano"
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
