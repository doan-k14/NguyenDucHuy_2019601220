import { ReactElement } from 'react'

import { Carousel, Col, Image, Row } from 'antd'
import { NextPageWithLayout } from '@/types/next-page'

import NewProducts from '@/components/products/newProducts'
import Landing from '@/components/layouts/landing'
import News from '@/components/news'

const Page: NextPageWithLayout = () => {
  const banners = [
    {
      id: 1,
      src: '/images/slide3.jpg'
    },
    {
      id: 2,
      src: '/images/slide2.jpg'
    },
    {
      id: 3,
      src: '/images/slide1.jpg'
    }
  ]

  return (
    <>
      {/* Banner */}
      <Row>
        <Col span={18} offset={3}>
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
            <NewProducts />
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
            <h2 className="homepage-title">Sản phẩm Hot</h2>
            <NewProducts />
          </div>
        </Col>
      </Row>
      {/* Static banner */}
      <Row>
        <Image preview={false} src="images/slide3.jpg" />
      </Row>
      {/* News */}
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col span={18} offset={3} style={{ padding: '0 1rem' }}>
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
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
