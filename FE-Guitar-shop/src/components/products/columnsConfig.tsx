import { Button, Image, Popover, Tag } from 'antd'
import { categoryStatus } from '@/configs/status'
import { ColumnsType } from 'antd/es/table'
import { formatPrice } from '@/helpers/currency'
import { Product } from '@/types/product'

import { getDetail } from './getDetail'
import ProductActions from './actions/productActions'
import LoveProductActions from './actions/loveProductAction'

export const productColumns: ColumnsType<Product> = [
  {
    title: 'ID',
    render: (_, data) => data.id
  },
  {
    title: 'Tên sản phẩm',
    render: (_, data) => (
      <Popover content={getDetail(data)} trigger="hover">
        <Button type="text" style={{ fontWeight: 'bold' }}>
          {data.name}
        </Button>
      </Popover>
    )
  },
  {
    title: 'Mô tả',
    render: (_, data) => data.description
  },
  {
    title: 'Ảnh',
    render: (_, data) => <Image width={100} src={data.image} />
  },
  {
    title: 'Giá',
    render: (_, data) => (
      <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
        {formatPrice(data.price)}
      </div>
    )
  },
  {
    title: 'Số lượng',
    render: (_, data) => data.amount
  },
  {
    title: 'Trạng thái',
    render: (_, data) => {
      const tag = categoryStatus.find(tag => tag.value === data.status)
      return <Tag color={tag?.color}>{tag?.label}</Tag>
    }
  },
  {
    title: 'Thao tác',
    render: (_, data) => <ProductActions id={data.id} />
  }
]

export const loveProductsColumn: ColumnsType<Product> = [
  {
    title: 'ID',
    render: (_, data) => data.id
  },
  {
    title: 'Tên sản phẩm',
    render: (_, data) => (
      <Popover content={getDetail(data)} trigger="hover">
        <Button type="text" style={{ fontWeight: 'bold' }}>
          {data.name}
        </Button>
      </Popover>
    )
  },
  {
    title: 'Mô tả',
    render: (_, data) => data.description
  },
  {
    title: 'Ảnh',
    render: (_, data) => <Image width={100} src={data.image} />
  },
  {
    title: 'Giá',
    render: (_, data) => (
      <div style={{ color: '#F64F61', fontWeight: 'bold' }}>
        {formatPrice(data.price)}
      </div>
    ),
    sorter: (a, b) => a.price - b.price
  },
  {
    title: 'Số lượng',
    render: (_, data) => data.amount,
    sorter: (a, b) => a.amount - b.amount
  },
  {
    title: 'Trạng thái',
    render: (_, data) => {
      const tag = categoryStatus.find(tag => tag.value === data.status)
      return <Tag color={tag?.color}>{tag?.label}</Tag>
    }
  },
  {
    title: 'Thao tác',
    render: (_, data) => <LoveProductActions loveProduct={data} />
  }
]
