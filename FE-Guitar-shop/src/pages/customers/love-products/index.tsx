import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'

import LocalProducts from '@/components/products/localProducts'
import Customer from '@/components/layouts/customer'

const Page: NextPageWithLayout = () => {
  return (
    <div
      style={{
        margin: '10px 20px',
        background: '#fff',
        padding: '10px 10px',
        borderRadius: '6px'
      }}
    >
      <div
        style={{
          color: '#1677FF',
          margin: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          paddingBottom: '1rem',
          borderBottomColor: '#F5F5F5',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          fontSize: '0.9rem',
          fontFamily: 'sans-serif'
        }}
      >
        <MenuUnfoldOutlined />
        <div>Danh sách yêu thích</div>
      </div>
      <LocalProducts />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Customer>{page}</Customer>
}

export default Page
