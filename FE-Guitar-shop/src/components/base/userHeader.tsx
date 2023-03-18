import React from 'react'

import { Avatar, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import UserDropdown from './userDropdown'

const UserDesktop = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'end', marginRight: '15px' }}
    >
      <Popover content={<UserDropdown />} trigger="click">
        <div style={{ cursor: 'pointer' }}>
          <span>Xin chào, Huy</span>
          <Avatar
            style={{ marginLeft: '5px' }}
            shape="circle"
            icon={<UserOutlined />}
          />
        </div>
      </Popover>
    </div>
  )
}

export default UserDesktop
