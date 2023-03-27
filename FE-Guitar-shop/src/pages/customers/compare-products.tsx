import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Col, Image, Popconfirm, Row } from 'antd'
import { CloseCircleFilled, RocketOutlined } from '@ant-design/icons'
import { NextPageWithLayout } from '@/types/next-page'
import { formatPrice } from '@/helpers/currency'
import { Product } from '@/types/product'
import { Cart } from '@/types/cart'
import useLocalStorage from '@/hooks/localStorage'

import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const cart = useLocalStorage<Cart[]>('cart', [])
  const [compareProducts, setCompareProducts] = useLocalStorage<Product[]>(
    'compare',
    []
  )

  const onDelete = (product: Product) => {
    const tempProducts = compareProducts.filter(item => item.id !== product.id)
    setProducts(tempProducts)
    setCompareProducts(tempProducts)
  }

  useEffect(() => {
    setProducts(compareProducts)
  }, [])

  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">So sánh sản phẩm</h2>
      <Row
        style={{ display: 'flex', justifyContent: 'center', margin: '4rem' }}
      >
        {products.length > 0 &&
          products.map(product => (
            <Col
              key={product.id}
              span={6}
              style={{
                lineHeight: '2rem',
                textAlign: 'center',
                alignContent: 'space-between',
                display: 'grid'
              }}
            >
              <div>
                <div>
                  <Image width={200} preview={false} src={product.image} />
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {product.name}
                </div>
                <div
                  style={{
                    color: '#D72027',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '2rem'
                  }}
                >
                  {formatPrice(product.price)} đ
                </div>
                <div>
                  <b>Thương hiệu: </b>
                  {product.brand}
                </div>
                <div>
                  <b>Quà tặng kèm: </b>
                  {product.bonus}
                </div>
                <div>
                  <b>Xuất xứ: </b>
                  {product.origin}
                </div>
                <div>
                  <b>Kiểu dáng: </b>
                  {product.style}
                </div>
                <div>
                  <b>Nguyên liệu: </b>
                  {product.material}
                </div>
                <div>
                  <b>Kiểu sơn: </b>
                  {product.paint}
                </div>
                <div>
                  <b>Dây đàn: </b>
                  {product.string_name}
                </div>
                <div>
                  <b>Đã bán: </b>
                  {product.sold || 0}
                </div>
              </div>
              <div>
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
                    cart[1]([{ ...product, quantity: 1, total: product.price }])
                    router.push('/customers/cart')
                  }}
                  okText="Đồng ý"
                  cancelText="Đóng"
                >
                  <Button style={{ color: 'white', background: '#D72027' }}>
                    <RocketOutlined />
                    Mua ngay
                  </Button>
                </Popconfirm>
                <div style={{ marginTop: '0.5rem' }}>
                  <Button
                    style={{ color: 'red' }}
                    onClick={() => onDelete(product)}
                  >
                    <CloseCircleFilled />
                    Xóa
                  </Button>
                </div>
              </div>
            </Col>
          ))}
      </Row>
      {/* News and middle banner */}
      <BottomContent />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
