import { ReactElement, useEffect, useRef, useState } from 'react'

import { Carousel, Col, Image, Row } from 'antd'
import { ListPayload, Product } from '@/types/product'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { ProductService } from '@/services/product'
import { banners } from '@/configs/landingBanners'

import NewProducts from '@/components/products/newProducts'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const shouldEffect = useRef(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>()
  const [hotProducts, setHotProducts] = useState<Product[]>()

  const fetchProducts = async (hotProducts: boolean) => {
    try {
      setLoading(true)
      const payload: ListPayload = {
        page: 1,
        pageSize: 10
      }
      const response = await ProductService.getList(
        hotProducts ? { ...payload, sortField: 'sold' } : payload
      )
      if (response) {
        hotProducts
          ? setHotProducts(response.products)
          : setProducts(response.products)
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (shouldEffect.current) {
      fetchProducts(true)
      fetchProducts(false)
    }
    shouldEffect.current = false
  }, [])

  return (
    <>
      {/* Banner */}
      <Row>
        <Col>
          <Carousel autoplay dotPosition="right" effect="fade">
            {banners.map(banner => (
              <div key={banner.id}>
                <Image
                  src={banner.src}
                  preview={false}
                  alt={banner.src}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
      {/* New products */}
      <Row style={{ background: 'white' }}>
        <Col span={18} offset={3} style={{ padding: '0 1rem' }}>
          <div
            style={{
              color: '#00264D'
            }}
          >
            <h2 className="homepage-title">Sản phẩm mới nhất</h2>
            <NewProducts loading={loading} products={products} label="New" />
          </div>
        </Col>
      </Row>
      {/* Hot products */}
      <Row style={{ background: 'white' }}>
        <Col span={18} offset={3} style={{ padding: '0 1rem' }}>
          <div
            style={{
              color: '#00264D'
            }}
          >
            <h2 className="homepage-title">Sản phẩm bán chạy</h2>
            <NewProducts loading={loading} products={hotProducts} label="Hot" />
          </div>
        </Col>
      </Row>
      
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
