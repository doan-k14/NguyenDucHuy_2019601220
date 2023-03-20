import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space } from 'antd'
import { notificationSuccess } from '@/helpers/notification'
import { Product } from '@/types/product'
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

  const onDelete = (loveProduct: Product) => {
    setProducts(products.filter(product => product.id !== loveProduct.id))
    notificationSuccess('Xóa sản phẩm yêu thích thành công!')
  }

  return (
    <Space>
      <Button type="text" size="small" style={{ color: '#1677FF' }}>
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
