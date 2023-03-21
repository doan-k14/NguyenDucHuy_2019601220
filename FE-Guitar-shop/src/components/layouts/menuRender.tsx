import {
  AreaChartOutlined,
  BookOutlined,
  FolderOpenOutlined,
  GiftOutlined,
  HeartFilled,
  PhoneOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
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
        key: '/user/ticket',
        icon: <PhoneOutlined />,
        label: 'Hỗ trợ'
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

export const customerMenu: MenuProps['items'] = [
  {
    type: 'group',
    label: 'Quản lý',
    children: [
      {
        key: '/customers',
        icon: <AreaChartOutlined />,
        label: 'Dashboard'
      },
      {
        key: '/customers/cart',
        icon: <ShoppingCartOutlined />,
        label: 'Giỏ hàng'
      },
      {
        key: '/customers/love-products',
        icon: <HeartFilled />,
        label: 'Sản phẩm yêu thích'
      },
      {
        key: '/customers/3',
        icon: <BookOutlined />,
        label: 'Đơn hàng'
      }
    ]
  }
]
