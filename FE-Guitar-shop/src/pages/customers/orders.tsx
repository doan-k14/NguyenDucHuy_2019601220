import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/types/next-page'
import { Col, Row } from 'antd'

import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Danh sách đơn hàng</h2>
      <Row>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 18, offset: 3 }}
          span={24}
          offset={0}
          style={{ padding: '0 1rem' }}
        >
          <div
            style={{
              color: '#00264D',
              paddingTop: '3rem',
              paddingBottom: '3rem',
              fontSize: '1rem',
              fontFamily: 'cursive'
            }}
          ></div>
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
