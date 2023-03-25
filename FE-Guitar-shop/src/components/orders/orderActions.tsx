import { useRouter } from 'next/router'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { CloseCircleFilled, EyeOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space } from 'antd'
import { OrderService } from '@/services/order'
import { Order } from '@/types/order'

type Props = {
  order: Order
}

const OrderActions = (props: Props) => {
  const { order } = props
  const router = useRouter()

  const onTerminate = async () => {
    try {
      if (order.status === 1) {
        if (await OrderService.updateStatus(order.id, { status: 0 }))
          notificationSuccess('Hủy đơn hàng thành công')
      } else {
        notificationError('Chỉ hủy đơn hàng khi đang xử lý')
      }
    } catch {
      notificationError('Hủy đơn thất bại')
    }
  }

  return (
    <div>
      <Space>
        <Button
          type="text"
          size="small"
          style={{ color: '#1677FF' }}
          title="Xem chi tiết"
          onClick={() => router.push(`/customers/orders/${order.id}`)}
        >
          <EyeOutlined />
        </Button>
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc muốn hủy đơn hàng này?"
          onConfirm={onTerminate}
          okText="Đồng ý"
          cancelText="Đóng"
          placement="left"
          disabled={order.status !== 1}
        >
          <Button
            type="text"
            title="Hủy đơn"
            size="small"
            disabled={order.status !== 1}
            style={{ color: 'red' }}
          >
            <CloseCircleFilled />
          </Button>
        </Popconfirm>
      </Space>
    </div>
  )
}

export default OrderActions
