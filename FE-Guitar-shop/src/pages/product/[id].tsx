import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Col, Empty, Image, Rate, Row, Space, Spin } from 'antd'
import { RocketOutlined, RotateRightOutlined } from '@ant-design/icons'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { ProductService } from '@/services/product'
import { Product } from '@/types/product'

import Landing from '@/components/layouts/landing'
import News from '@/components/news'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const productID = router.query.id
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<Product>()

  const fetchProductByID = async () => {
    try {
      setLoading(true)
      const response = await ProductService.show(productID)
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
                        <span style={{ fontSize: '1rem' }}>Giá bán:</span>
                        <span
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#BF081D'
                          }}
                        >
                          {' '}
                          {product.price} đ
                        </span>
                      </div>
                      <div style={{ fontSize: '1rem' }}>
                        <div>Quà tặng: </div>
                        <div> - {product.bonus}</div>
                      </div>
                      <Space style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        <RocketOutlined />
                        Đổi trả thoải mái trong 3 ngày đầu tiên nhận hàng
                      </Space>
                      <Space style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        <RotateRightOutlined />
                        Hoàn tiền 100% nếu khách hàng phát hiện hàng giả, hàng
                        nhái
                      </Space>
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
      {/* Middle banner */}
      <Row>
        <Image preview={false} src="/images/slide3.jpg" />
      </Row>
      {/* News */}
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col span={14} offset={5} style={{ padding: '0 1rem' }}>
          <div
            style={{
              color: '#00264D'
            }}
          >
            <h2 className="homepage-title">Tin tức</h2>
            <News />
          </div>
        </Col>
      </Row>
      {/* Brand */}
      <h2 className="homepage-title">Nhãn hàng</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image src="/images/footer-banner.jpg" preview={false} />
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
