import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Button, Form, Input, Space } from 'antd'
import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { CategoryService } from '@/services/category'
import { CategoryPayload } from '@/types/category'

import ActiveStatus from '@/components/utilities/activeStatus'
import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<number>(1)

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      const payload: CategoryPayload = {
        name: name,
        description: description,
        status: status
      }
      if (await CategoryService.create(payload))
        notificationSuccess('Tạo mới thành công')
      setTimeout(() => {
        router.push('/users/category')
      }, 2000)
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
        <div>Thêm mới danh mục</div>
      </div>
      <Form style={{ marginLeft: '1rem' }} layout="vertical" autoComplete="off">
        {/* Category name */}
        <Form.Item
          label="Tên danh mục:"
          style={{ width: '50%' }}
          name="category_name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
        >
          <Input onChange={e => setName(e.target.value)} />
        </Form.Item>
        {/* Description */}
        <Form.Item label="Mô tả:" style={{ width: '50%' }}>
          <Input.TextArea rows={5} onChange={e => setDescription(e.target.value)} />
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
