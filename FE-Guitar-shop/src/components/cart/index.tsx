import { useEffect, useState } from 'react'

import { Col, Empty, Row } from 'antd'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

import CartItem from './cartItem'

const Cart = () => {
  const [products, setProducts] = useState<Cart[]>([])
  const cart = useLocalStorage<Cart[]>('cart', [])

  const onDelete = (productID: number) => {
    setProducts(products.filter(product => product.id !== productID))
  }

  const onChangeTotal = (id: number, quantity: number) => {
    const tempProducts = products.map(obj => {
      if (obj.id === id)
        return { ...obj, quantity: quantity, total: quantity * obj.price }
      return obj
    })
    setProducts(tempProducts)
  }

  const getTotalPrice = () => {
    let total = 0
    products.map(product => (total += product.total))
    return total
  }

  useEffect(() => {
    setProducts(cart[0])
  }, [])

  return (
    <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
      <Row
        style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#888888' }}
      >
        <Col span={1}>STT</Col>
        <Col span={5}>Tên sản phẩm</Col>
        <Col span={3}>Ảnh</Col>
        <Col span={5}>Giá</Col>
        <Col span={3}>Số lượng mua</Col>
        <Col span={5}>Thành tiền</Col>
        <Col span={2}>Thao tác</Col>
      </Row>
      {products.length > 0 ? (
        products.map((product, key) => (
          <div key={key}>
            <CartItem
              keyItem={key + 1}
              product={product}
              products={products}
              onDelete={id => onDelete(id)}
              onChangeTotal={onChangeTotal}
            />
          </div>
        ))
      ) : (
        <Empty description="Không có sản phẩm nào" />
      )}
      <div>{getTotalPrice()}</div>
    </div>
  )
}

export default Cart
