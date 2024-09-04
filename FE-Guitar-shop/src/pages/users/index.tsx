import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { NextPageWithLayout } from '@/types/next-page'

import User from '@/components/layouts/user'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { notificationError } from '@/helpers/notification'
import { OrderService } from '@/services/order'

const Column = dynamic(
  () => import('@ant-design/charts').then(mod => mod.Column),
  { ssr: false }
)

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [chartData, setChartData] = useState<any[]>([])

  const fetchOrders = async () => {
    try {
      const response = await OrderService.getChart()
      if (response) {
        let res = response.data
        let result: any[] = []
        const keys = Object.keys(res)
        keys.map((key: any) => {
          result.push({
            type: key,
            sales: parseInt(res[key])
          })
        })
        setChartData(result)
      }
    } catch {
      notification.destroy()
      notificationError('Có lỗi xảy ra')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const chart = {
    data: chartData,
    xField: 'type',
    yField: 'sales',
    colorField: 'type',
    barWidthRatio: 0.8,
    meta: {
      type: { alias: 'Category' },
      value: { alias: 'Value' }
    }
  }

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
        <div>Thống kê doanh số 12 tháng gần nhất</div>
      </div>
      {/* Chart */}
      <Column {...chart} />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
