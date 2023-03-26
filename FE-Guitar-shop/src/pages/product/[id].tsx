import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Col,
  Empty,
  Image,
  Popconfirm,
  Rate,
  Row,
  Space,
  Spin
} from 'antd'
import {
  DollarCircleFilled,
  GiftFilled,
  RocketOutlined,
  RotateRightOutlined,
  SendOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { NextPageWithLayout } from '@/types/next-page'
import { ProductService } from '@/services/product'
import { formatPrice } from '@/helpers/currency'
import { Product } from '@/types/product'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const productID = router.query.id?.toString()
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<Product>()
  const [cart, setCart] = useLocalStorage<Cart[]>('cart', [])

  const onAddToCart = (product: Product) => {
    if (!cart.find(productCart => productCart.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1, total: product.price }])
      notificationSuccess('Thêm vào giỏ hàng thành công!')
    } else {
      const temProducts = cart.map(obj => {
        if (product.id === obj.id)
          return {
            ...obj,
            quantity: (obj.quantity || 1) + 1,
            total: ((obj.quantity || 1) + 1) * obj.price
          }
        return obj
      })
      setCart(temProducts)
      notificationSuccess('Đã tăng 1 số lượng trong giỏ hàng')
    }
  }

  const fetchProductByID = async () => {
    try {
      setLoading(true)
      const response = await ProductService.show(parseInt(productID || '0'))
      if (response) setProduct(response)
    } catch {
      notificationError('Không tìm thấy sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productID) fetchProductByID()
  }, [router])

  return (
    <>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">chi tiết sản phẩm #{productID}</h2>
      <Row style={{ background: 'white', marginBottom: '4rem' }}>
        <Col span={16} offset={4}>
          {/* Products */}
          <Spin spinning={loading}>
            <div
              style={{
                color: '#00264D',
                marginTop: '3rem'
              }}
            >
              {product ? (
                <Row>
                  <Col span={10}>
                    <Image
                      alt="product"
                      src={product.image}
                      preview={false}
                      style={{
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: '#E5E5E5'
                      }}
                    />
                  </Col>
                  <Col span={14}>
                    <div style={{ marginLeft: '2rem' }}>
                      <div>
                        <span style={{ fontSize: '2rem' }}>{product.name}</span>{' '}
                        <span style={{ fontWeight: 'bold', color: '#D72027' }}>
                          {product.amount > 0 ? '(Còn hàng)' : '(Hết hàng)'}
                        </span>
                      </div>
                      <Space>
                        <Rate defaultValue={3} />
                        <span> Đánh giá: 3/5 (Tổng: 100)</span>
                      </Space>
                      <div>
                        <Space>
                          <DollarCircleFilled
                            style={{ color: '#FFA800', fontSize: '1rem' }}
                          />
                          Giá bán:
                        </Space>
                        <span
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#BF081D'
                          }}
                        >
                          {' '}
                          {formatPrice(product.price)} đ
                        </span>
                      </div>
                      <div>
                        <div
                          style={{
                            gap: '0.5rem',
                            display: 'flex',
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          <GiftFilled
                            style={{ color: '#D72027', fontSize: '1rem' }}
                          />
                          Quà tặng kèm thêm:{' '}
                        </div>
                        <div> - {product.bonus}</div>
                      </div>
                      <div>
                        <Space
                          style={{
                            marginTop: '0.5rem',
                            marginBottom: '0.2rem'
                          }}
                        >
                          <SendOutlined style={{ fontSize: '1rem' }} />
                          Thông số:{' '}
                        </Space>
                        <div>
                          {' '}
                          - <b>Xuất xứ:</b> {product.origin}
                        </div>
                        <div>
                          {' '}
                          - <b>Hãng:</b> {product.brand}
                        </div>
                        {product.style && (
                          <>
                            <div>
                              {' '}
                              - <b>Kiểu dáng:</b> {product.style}
                            </div>
                            <div>
                              {' '}
                              - <b>Chất liệu:</b> {product.material}
                            </div>
                            <div>
                              {' '}
                              - <b>Loại sơn:</b> {product.paint}
                            </div>
                            <div>
                              {' '}
                              - <b>Dây đàn:</b> {product.string_name}
                            </div>
                          </>
                        )}
                      </div>
                      <Space
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          marginTop: '0.5rem',
                          marginBottom: '0.2rem',
                          color: '#FFA800'
                        }}
                      >
                        <RocketOutlined />
                        Đổi trả thoải mái trong 3 ngày đầu tiên nhận hàng
                      </Space>
                      <Space
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: '#FFA800',
                          marginBottom: '1rem'
                        }}
                      >
                        <RotateRightOutlined />
                        Hoàn tiền 100% nếu khách hàng phát hiện hàng giả, hàng
                        nhái
                      </Space>
                      <div>
                        <Button
                          style={{ color: 'white', background: '#0080FF' }}
                          onClick={() => onAddToCart(product)}
                        >
                          <ShoppingCartOutlined />
                          Thêm vào giỏ hàng
                        </Button>
                      </div>
                      <div
                        style={{
                          marginTop: '0.5rem',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <Popconfirm
                          title="Cảnh báo"
                          description={
                            <div>
                              Hành động này sẽ xóa hết giỏ hàng của bạn trước
                              <br />
                              đó, bạn có chắc muốn đặt mua sản phẩm này?
                            </div>
                          }
                          onConfirm={() => {
                            setCart([
                              { ...product, quantity: 1, total: product.price }
                            ])
                            router.push('/customers/cart')
                          }}
                          okText="Đồng ý"
                          cancelText="Đóng"
                        >
                          <Button
                            style={{ color: 'white', background: '#D72027' }}
                          >
                            <RocketOutlined />
                            Mua ngay
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Empty />
              )}
            </div>
          </Spin>
        </Col>
      </Row>
      <BottomContent />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
