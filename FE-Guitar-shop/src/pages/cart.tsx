import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/types/next-page'
import { Col, Row } from 'antd'

import BottomContent from '@/components/base/bottomContent'
import UserInfo from '@/components/cart/userInfo'
import Landing from '@/components/layouts/landing'
import Cart from '@/components/cart'

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <h2 className="homepage-title">Giỏ hàng</h2>
      <div style={{ padding: '0 1rem' }}>
        {/* Products */}
        <div
          style={{
            color: '#00264D',
            justifyContent: 'center',
            margin: '3rem'
          }}
        >
          <Row>
            <Col span={12}>
              <UserInfo />
            </Col>
            <Col span={12}>
              <Cart />
            </Col>
          </Row>
        </div>
      </div>
      <BottomContent />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
