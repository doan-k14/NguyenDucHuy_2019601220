import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Input, InputNumber, Space } from 'antd'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { ProductService } from '@/services/product'
import { CreatePayload } from '@/types/product'

import CategorySelect from '@/components/utilities/categorySelect'
import ActiveStatus from '@/components/utilities/activeStatus'
import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [categoryID, setCategoryID] = useState<number>(-1)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [price, setPrice] = useState<number | null>(0)
  const [amount, setAmount] = useState<number | null>(0)
  const [status, setStatus] = useState<number>(1)

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      if (categoryID === -1)
        notificationError('Quý khách vui lòng chọn danh mục')
      else {
        const payload: CreatePayload = {
          category_id: categoryID,
          name: name,
          image: imageUrl,
          price: price,
          amount: amount,
          description: description,
          status: status
        }
        if (await ProductService.create(payload))
          notificationSuccess('Tạo mới thành công')
        setTimeout(() => {
          router.push('/users/product')
        }, 2000)
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
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
        <div>Thêm mới sản phẩm</div>
      </div>
      <Form style={{ marginLeft: '1rem' }} layout="vertical" autoComplete="off">
        {/* Category reference */}
        <Form.Item label="Danh mục:">
          <CategorySelect onSelect={setCategoryID} categoryID={categoryID} />
        </Form.Item>
        {/* Product name */}
        <Form.Item
          label="Tên sản phẩm:"
          style={{ width: '50%' }}
          name="product_name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input onChange={e => setName(e.target.value)} />
        </Form.Item>
        {/* Description */}
        <Form.Item label="Mô tả:" style={{ width: '50%' }}>
          <Input.TextArea
            rows={5}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Item>
        {/* Image url */}
        <Form.Item
          name="url"
          rules={[{ required: true, message: 'Vui lòng nhập đường dẫn ảnh' }]}
          label="Đường dẫn ảnh:"
          style={{ width: '50%' }}
        >
          <Input onChange={e => setImageUrl(e.target.value)} />
        </Form.Item>
        {/* Price */}
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
          label="Giá tiền:"
        >
          <InputNumber
            min={0}
            style={{ width: '200px' }}
            onChange={value => setPrice(value)}
          />
        </Form.Item>
        {/* Amount */}
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng sản phẩm' }
          ]}
          label="Số lượng:"
        >
          <InputNumber
            min={0}
            style={{ width: '100px' }}
            onChange={value => setAmount(value)}
          />
        </Form.Item>
        {/* Status */}
        <ActiveStatus onSelect={setStatus} status={status} />

        <Space>
          <Button onClick={() => router.push('/users/category')}>
            Quay lại
          </Button>
          <Button
            style={{ background: '#0080FF', color: 'white' }}
            type="text"
            htmlType="submit"
            onClick={onSubmit}
            loading={loading}
          >
            Thêm mới
          </Button>
        </Space>
      </Form>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
