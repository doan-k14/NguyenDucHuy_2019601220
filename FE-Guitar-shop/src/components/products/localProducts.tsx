import { Button, Image, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Product } from '@/types/product'
import useLocalStorage from '@/hooks/localStorage'

const LocalProducts = () => {
  const [products, setProducts] = useLocalStorage<Product[]>(
    'love-products',
    []
  )

  const onDelete = (loveProduct: Product) => {
    setProducts(products.filter(product => product.id !== loveProduct.id))
  }

  return (
    <div style={{ maxHeight: '20rem', overflowY: 'scroll' }}>
      {products.map(product => (
        <div
          key={product.id}
          style={{
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Space>
            <div style={{ width: '70px' }}>
              <Image preview={false} src={product.image} />
            </div>
            <div style={{ fontWeight: 'bold' }}>
              <div style={{ fontSize: '1rem' }}>{product.name}</div>
              <div style={{ color: '#D72027' }}>{product.price}</div>
            </div>
          </Space>
          <Button
            type="text"
            size="large"
            style={{ color: 'red' }}
            onClick={() => onDelete(product)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default LocalProducts
