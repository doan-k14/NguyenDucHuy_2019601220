import { useEffect, useState } from 'react'

import { Button, Col, Empty, Input, Row } from 'antd'
import { formatPrice } from '@/helpers/currency'
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
        <Col span={1} style={{ textAlign: 'center' }}>
          STT
        </Col>
        <Col span={7} style={{ textAlign: 'center' }}>
          Sản phẩm
        </Col>
        <Col span={4}>Giá</Col>
        <Col span={4}>Số lượng mua</Col>
        <Col span={4}>Thành tiền</Col>
        <Col span={2} style={{ textAlign: 'center' }}>
          Thao tác
        </Col>
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
      <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Col span={6} offset={11}>
          <Input placeholder="Nhập mã giảm giá" />
        </Col>
        <Col span={6}>
          <Button style={{ background: '#D72027', color: 'white' }}>
            Áp dụng
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={11}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Tổng tiền:
          </span>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#D72027',
              marginLeft: '0.8rem'
            }}
          >
            {formatPrice(getTotalPrice())}
          </span>
          <span style={{ color: '#D72027', fontWeight: 'bold' }}> VND</span>
        </Col>
      </Row>
    </div>
  )
}

export default Cart
