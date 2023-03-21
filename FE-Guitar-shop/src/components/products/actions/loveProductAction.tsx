import { notificationError, notificationSuccess } from '@/helpers/notification'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space } from 'antd'
import { Product } from '@/types/product'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

type Props = {
  loveProduct: Product
}

const LoveProductActions = (props: Props) => {
  const { loveProduct } = props
  const [products, setProducts] = useLocalStorage<Product[]>(
    'love-products',
    []
  )
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', [])

  const onAddToCart = (product: Product) => {
    if (!cart.find(productCart => productCart.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1, total: product.price }])
      notificationSuccess('Thêm vào giỏ hàng thành công!')
    } else {
      notificationError('Sản phẩm này đã có trong giỏ hàng')
    }
  }

  const onDelete = (loveProduct: Product) => {
    setProducts(products.filter(product => product.id !== loveProduct.id))
    notificationSuccess('Xóa sản phẩm yêu thích thành công!')
  }

  return (
    <Space>
      <Button
        type="text"
        size="small"
        style={{ color: '#1677FF' }}
        onClick={() => onAddToCart(loveProduct)}
      >
        <ShoppingCartOutlined />
      </Button>
      <Popconfirm
        title="Thông báo"
        description="Bạn có chắc muốn xóa sản phẩm này?"
        onConfirm={() => onDelete(loveProduct)}
        okText="Đồng ý"
        cancelText="Đóng"
        placement="left"
      >
        <Button type="text" size="small" style={{ color: 'red' }}>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </Space>
  )
}

export default LoveProductActions
