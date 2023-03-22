import { useRouter } from 'next/router'

import { Button, Form, Input, Radio, Space } from 'antd'

const UserInfo = () => {
  const router = useRouter()

  return (
    <div style={{ marginLeft: '5rem' }}>
      <div>Thông tin người mua hàng</div>
      <Form
        style={{
          background: '#fff',
          paddingTop: '2rem',
          paddingRight: '2rem',
          borderRadius: '6px'
        }}
        //   onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Họ tên:"
          name="full_name"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input style={{ width: '50%' }} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ:"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại:"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input style={{ width: '30%' }} />
        </Form.Item>
        <Form.Item
          label="Email:"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input style={{ width: '40%' }} />
        </Form.Item>
        <Form.Item label="Ghi chú:" name="note">
          <Input.TextArea rows={5} />
        </Form.Item>
        <div style={{ marginBottom: '1rem' }}>
          <Radio checked>Thanh toán khi nhận hàng - COD</Radio>
        </div>
        <Space>
          <Button style={{ background: '#FF1935', color: 'white' }}>
            Hoàn tất mua hàng
          </Button>
          <Button
            style={{ background: '#0080FF', color: 'white' }}
            onClick={() => router.push('/')}
          >
            Tiếp tục mua hàng
          </Button>
        </Space>
      </Form>
    </div>
  )
}

export default UserInfo
