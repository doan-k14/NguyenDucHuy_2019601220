import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { OrderDetailItem, OrderPayload } from '@/types/order'
import { NextPageWithLayout } from '@/types/next-page'
import { CartFormResult } from '@/types/cart'
import { OrderService } from '@/services/order'
import { Col, Row } from 'antd'
import { Discount } from '@/types/discount'
import useLocalStorage from '@/hooks/localStorage'

import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import UserInfo from '@/components/cart/userInfo'
import Landing from '@/components/layouts/landing'
import Cart from '@/components/cart'
import { ProductService } from '@/services/product'
import { UpdatePayload } from '@/types/product'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [products, setProducts] = useState<Cart[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [discount, setDiscount] = useState<Discount>()
  const cart = useLocalStorage<Cart[]>('cart', [])

  useEffect(() => {
    document.body.scrollTop = 600
    setProducts(cart[0])
  }, [])

  useEffect(() => {
    let total = 0
    let productQuantity = 0
    products.map(product => {
      total += product.total
      productQuantity += product.quantity || 1
    })
    if (discount) setTotalPrice(total * discount.value)
    else setTotalPrice(total)
    setQuantity(productQuantity)
  }, [products, discount])

  const onOrder = async (user: CartFormResult) => {
    try {
      setLoading(true)
      const orderPayload: OrderPayload = {
        ...user,
        total_price: totalPrice,
        quantity: quantity,
        status: 1
      }
      if (await OrderService.createOrder(orderPayload)) {
        const latestOrder = await OrderService.getLatestOrder()
        const orderDetailPayload = () => {
          const tempDetail: OrderDetailItem[] = []
          products.map(product => {
            tempDetail.push({
              order_id: latestOrder.id,
              product_id: product.id,
              quantity: product.quantity || 1
            })
          })
          return tempDetail
        }

        if (
          await OrderService.createOrderDetail({
            products: orderDetailPayload()
          })
        ) {
          await onChangeAmount(latestOrder.id)
          cart[1]([])
          notificationSuccess('Đặt hàng thành công')
          router.push('/customers/order-success')
        }
      }
    } catch {
      notificationError('Đặt hàng thất bại')
    } finally {
      setLoading(false)
    }
  }
  const onChangeAmount = async (id: number) => {
    try {
      // Lấy chi tiết đơn hàng qua id
      const response = await OrderService.showDetail(id)
      // Cập nhật số hàng tồn
      if (response) {
        response.forEach(orderDetail => {
          fetchProductAmount(orderDetail.product_id, orderDetail.quantity)
        })
      }
    } catch {
      notificationError('Trừ hàng tồn thất bại')
    }
  }

const fetchProductAmount = async (id: number, quantity: number) => {
    try {
      const response = await ProductService.show(id)
      if (response) {
        updateProductAmount(
          id,
          response.amount - quantity,
          (response.sold || 0)
        )
      }
    } catch {
      notificationError('Không tìm thấy sản phẩm')
    }
  }

  const updateProductAmount = async (
    productID: number,
    amount: number,
    sold: number
  ) => {
    try {
      const payload: UpdatePayload = {
        amount: amount,
        sold: sold
      }
      await ProductService.update(productID, payload)
    } catch {
      notificationError('Cập nhật số lượng thất bại')
    }
  }

  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Giỏ hàng</h2>
      <Row style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 20, offset: 2 }}
          span={24}
          offset={0}
          style={{ padding: '0 1rem' }}
        >
          <Row>
            <Col span={10}>
              <UserInfo onSubmit={onOrder} loading={loading} />
            </Col>
            <Col span={14}>
              <Cart
                discount={discount}
                onChangeProducts={products => setProducts(products)}
                onDiscount={setDiscount}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <BottomContent />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
