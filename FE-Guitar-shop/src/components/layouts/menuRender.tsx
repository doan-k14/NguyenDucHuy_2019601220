import {
  AreaChartOutlined,
  FolderOpenOutlined,
  GiftOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  UserOutlined
} from '@ant-design/icons'
import { MenuProps } from 'antd'

export const userMenu: MenuProps['items'] = [
  {
    type: 'group',
    label: 'Quản lý',
    children: [
      {
        key: '/user',
        icon: <AreaChartOutlined />,
        label: 'Dashboard'
      },
      {
        key: '/users/category',
        icon: <FolderOpenOutlined />,
        label: 'Danh mục'
      },
      {
        key: '/users/product',
        icon: <GiftOutlined />,
        label: 'Sản phẩm'
      },
      {
        key: '/users/order',
        icon: <PhoneOutlined />,
        label: 'Đơn hàng'
      }
    ]
  },
  {
    type: 'group',
    label: 'Thông tin',
    children: [
      {
        key: '/user/instructions',
        icon: <UserOutlined />,
        label: 'Hướng dẫn nạp tiền'
      },
      {
        key: '/user/transaction',
        icon: <QuestionCircleOutlined />,
        label: 'Lịch sử giao dịch'
      }
    ]
  }
]
