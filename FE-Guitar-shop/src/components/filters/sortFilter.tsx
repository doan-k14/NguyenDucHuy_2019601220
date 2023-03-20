import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Button, Select, Space } from 'antd'

type Props = {
  sortString: string
  onSorting: (sortString: string) => void
  onSortField: (sortField: string) => void
}

const SortFilter = (props: Props) => {
  const { sortString, onSorting, onSortField } = props

  return (
    <Space>
      <Select
        defaultValue="created_at"
        style={{ width: '150px' }}
        options={[
          { value: 'created_at', label: 'Ngày tạo' },
          { value: 'price', label: 'Giá' },
          { value: 'amount', label: 'Số lượng còn' }
        ]}
        status="error"
        onChange={value => onSortField(value)}
      />
      {sortString === 'desc' ? (
        <Button
          style={{ background: '#1677FF', color: 'white' }}
          onClick={() => onSorting('asc')}
        >
          <ArrowDownOutlined />
          Giảm dần
        </Button>
      ) : (
        <Button type="primary" onClick={() => onSorting('desc')}>
          <ArrowUpOutlined />
          Tăng dần
        </Button>
      )}
    </Space>
  )
}

export default SortFilter
