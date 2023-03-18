import { defaultPagination, paginationConfig } from '@/configs/pagination'
import { Image, Tag, Table, Popover, Button } from 'antd'
import { categoryStatus } from '@/configs/status'
import { formatPrice } from '@/helpers/currency'
import { ColumnsType } from 'antd/es/table'
import { Product } from '@/types/product'

import ProductActions from './productActions'

type Props = {
  products: Product[] | undefined
  pageSize: number
  total: number
  loading: boolean
  onChange: (page: number, pageSize: number) => void
}

const Products = (props: Props) => {
  const { products, pageSize, total, loading, onChange } = props

  const getProductTime = (product: Product) => {
    const createTime = new Date(product.created_at).toUTCString()
    const updateTime = new Date(product.updated_at).toUTCString()
    return (
      <>
        <div><span style={{fontWeight: 'bold'}}>Ngày tạo:</span> {createTime}</div>
        <div><span style={{fontWeight: 'bold'}}>Ngày cập nhật:</span> {updateTime}</div>
      </>
    )
  }

  const columns: ColumnsType<Product> = [
    {
      title: 'ID',
      render: (_, data) => data.id
    },
    {
      title: 'Tên sản phẩm',
      render: (_, data) => (
        <Popover content={getProductTime(data)} trigger="hover">
          <Button type="text" style={{fontWeight: 'bold'}}>{data.name}</Button>
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={products}
        pagination={{
          ...paginationConfig,
          pageSize: pageSize,
          total: total
        }}
        onChange={pagination =>
          onChange(
            pagination.current || defaultPagination.page,
            pagination.pageSize || defaultPagination.size
          )
        }
        rowKey="id"
        loading={loading}
      />
    </div>
  )
}

export default Products
