import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Input, InputNumber, Skeleton, Space } from 'antd'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Product, UpdatePayload } from '@/types/product'
import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { ProductService } from '@/services/product'

import User from '@/components/layouts/user'
import ActiveStatus from '@/components/utilities/activeStatus'
import CategorySelect from '@/components/utilities/categorySelect'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const productID = router.query.id
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const [payload, setPayload] = useState<UpdatePayload>({
    category_id: product?.category_id,
    name: product?.name,
    description: product?.description,
    image: product?.image,
    price: product?.price,
    amount: product?.amount,
    status: product?.status
  })

  const fetchProductByID = async () => {
    try {
      setLoading(true)
      const response = await ProductService.show(productID)
      if (response) setProduct(response)
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const onUpdate = async () => {
    try {
      setSubmitLoading(true)
      if (await ProductService.update(productID, payload))
        notificationSuccess('Cập sản phẩm thành công!')
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setSubmitLoading(false)
    }
  }

  useEffect(() => {
    if (productID) fetchProductByID()
  }, [router])

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
        <div>Cập nhật sản phẩm #{product?.id}</div>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <Form
          style={{ marginLeft: '1rem' }}
          layout="vertical"
          autoComplete="off"
        >
          {/* Category reference */}
          <Form.Item label="Danh mục:">
            <CategorySelect
              onSelect={categoryID =>
                setPayload({ ...payload, category_id: categoryID })
              }
              categoryID={payload.category_id || product?.category_id || -1}
            />
          </Form.Item>
          {/* Product name */}
          <Form.Item label="Tên sản phẩm:" style={{ width: '50%' }}>
            <Input
              defaultValue={product?.name}
              onChange={e => setPayload({ ...payload, name: e.target.value })}
            />
          </Form.Item>
          {/* Description */}
          <Form.Item label="Mô tả:" style={{ width: '50%' }}>
            <Input.TextArea
              rows={5}
              defaultValue={product?.description}
              onChange={e =>
                setPayload({ ...payload, description: e.target.value })
              }
            />
          </Form.Item>
          {/* Image url */}
          <Form.Item label="Đường dẫn ảnh:" style={{ width: '50%' }}>
            <Input
              defaultValue={product?.image}
              onChange={e => setPayload({ ...payload, image: e.target.value })}
            />
          </Form.Item>
          {/* Price */}
          <Form.Item label="Giá tiền:">
            <InputNumber
              min={0}
              defaultValue={product?.price}
              style={{ width: '200px' }}
              onChange={value => setPayload({ ...payload, price: value })}
            />
          </Form.Item>
          {/* Amount */}
          <Form.Item label="Số lượng:">
            <InputNumber
              min={0}
              defaultValue={product?.amount}
              style={{ width: '100px' }}
              onChange={value => setPayload({ ...payload, amount: value })}
            />
          </Form.Item>
          {/* Status */}
          <ActiveStatus
            onSelect={status => setPayload({ ...payload, status: status })}
            status={product?.status || 0}
          />

          <Space>
            <Button onClick={() => router.push('/users/product')}>
              Quay lại
            </Button>
            <Button
              style={{ background: '#0080FF', color: 'white' }}
              type="text"
              htmlType="submit"
              onClick={onUpdate}
              loading={submitLoading}
            >
              Cập nhật
            </Button>
          </Space>
        </Form>
      )}
    </div>
  )
}
Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
