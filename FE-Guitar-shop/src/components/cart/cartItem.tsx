import { useEffect, useState } from 'react'

import { Button, Col, Image, InputNumber, Popover, Row } from 'antd'
import { formatPrice } from '@/helpers/currency'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'
import CartAction from './cartAction'

import { getDetail } from '../products/getDetail'

type Props = {
  product: Cart
  keyItem: number
  products: Cart[]
  onDelete: (id: number) => void
  onChangeTotal: (id: number, quantity: number) => void
}

const CartItem = (props: Props) => {
  const { product, keyItem, products, onDelete, onChangeTotal } = props
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', [])
  const [totalPrice, setTotalPrice] = useState<number>(product.price)

  const updateQuantity = (value: number | null) => {
    const tempProducts = products.map(obj => {
      if (product.id === obj.id)
        return { ...obj, quantity: value, total: (value || 1) * obj.price }
      return obj
    })
    setCart(tempProducts)
  }

  useEffect(() => {
    cart.map(item => {
      if (item.id === product.id) setTotalPrice(item.total)
    })
  }, [])

  return (
    <Row
      style={{
        marginTop: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Col span={1}>{keyItem}</Col>
      <Col span={5}>
        <Popover content={getDetail(product)} trigger="hover">
          <Button type="text" style={{ fontWeight: 'bold' }}>
            {product.name}
          </Button>
        </Popover>
      </Col>
      <Col span={3}>
        <Image alt="product" width={100} src={product.image} />
      </Col>
      <Col span={5}>
        <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
          {formatPrice(product.price)}
        </div>
      </Col>
      <Col span={3}>
        <InputNumber
          defaultValue={product.quantity || 1}
          min={1}
          max={product.amount}
          onChange={value => {
            updateQuantity(value)
            onChangeTotal(product.id, value || 1)
            setTotalPrice((value || 1) * product.price)
          }}
        />
      </Col>
      <Col span={5}>
        <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
          {formatPrice(totalPrice)}
        </div>
      </Col>
      <Col span={2}>
        <CartAction product={product} onChange={onDelete} />
      </Col>
    </Row>
  )
}

export default CartItem
