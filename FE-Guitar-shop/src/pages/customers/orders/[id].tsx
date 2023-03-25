import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Table, notification } from 'antd'
import { OrderDetailResponse } from '@/types/order'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { OrderService } from '@/services/order'

import { orderDetailColumns } from '@/components/products/columnsConfig'
import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const orderID = router.query.id
  const [orderDetail, setOrderDetail] = useState<OrderDetailResponse[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const response = await OrderService.getOrderDetailByID({
        order_id: orderID
      })
      if (response) setOrderDetail(response)
    } catch {
      notification.destroy()
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderID) fetchOrderDetails()
  }, [router])

  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Chi tiết đơn hàng #{orderID}</h2>
      <div
        style={{
          marginBottom: '2rem',
          marginLeft: '4rem',
          marginRight: '4rem'
        }}
      >
        <Table
          columns={orderDetailColumns}
          dataSource={orderDetail}
          pagination={false}
          rowKey="id"
          loading={loading}
        />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            style={{
              marginBottom: '4rem',
              marginTop: '4rem',
              marginRight: '6rem',
              background: '#D72027',
              color: 'white'
            }}
            onClick={() => router.push('/customers/orders')}
          >
            Quay lại
          </Button>
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
