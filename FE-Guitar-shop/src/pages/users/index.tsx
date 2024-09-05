import { ReactElement, useEffect, useState } from 'react'
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
const Line = dynamic(
  () => import('@ant-design/charts').then(mod => mod.Line),
  { ssr: false }
)

const Page: NextPageWithLayout = () => {
  const [columnChartData, setColumnChartData] = useState<any[]>([])
  const [lineChartData, setLineChartData] = useState<any[]>([])

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
        setLineChartData(result)
      }

      const columnChartRes = await OrderService.getColumnChart()
      if (columnChartRes) {
        let res = columnChartRes.data
        let result: any[] = []
        const keys = Object.keys(res)
        keys.map((key: any) => {
          result.push({
            type: key,
            sales: parseInt(res[key])
          })
        })
        setColumnChartData(result)
      }
    } catch {
      notification.destroy()
      notificationError('Có lỗi xảy ra')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const columnChart = {
    data: columnChartData,
    xField: 'type',
    yField: 'sales',
    colorField: 'type',
    barWidthRatio: 0.8,
    meta: {
      type: { alias: 'Category' },
      value: { alias: 'Value' }
    }
  }

  const lineChart = {
    data: lineChartData,
    xField: 'type',
    yField: 'sales',
    smooth: true,  // Vẽ biểu đồ đường cong
    point: {
      size: 3,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
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
      {/* Line Chart */}
      <Line {...lineChart} />
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
        <div>Thống kê các đơn hàng chưa hoàn thành trong 12 tháng</div>
      </div>
      {/* Column Chart */}
      <Column {...columnChart} />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
