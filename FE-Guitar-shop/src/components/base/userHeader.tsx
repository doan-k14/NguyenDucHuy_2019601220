import React, { useEffect, useState } from 'react'

import { Avatar, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import UserDropdown from './userDropdown'
import { useRouter } from 'next/router'
import useLocalStorage from '@/hooks/localStorage'
import { UserInfo } from '@/types/user'

const UserDesktop = () => {
  const router = useRouter()
  const user = useLocalStorage<UserInfo>('user', null)
  const [username, setUsername] = useState<string | null>(null)
  
  useEffect(() => {
    const sessionUsername = window.sessionStorage.getItem('username')
    if (!user[0] && !sessionUsername) router.push('/auth/login')
    else setUsername(sessionUsername || user[0]?.username)
  }, [])

  return (
    <div
      style={{ display: 'flex', justifyContent: 'end', marginRight: '15px' }}
    >
      <Popover content={<UserDropdown username={username} />} trigger="click">
        <div style={{ cursor: 'pointer' }}>
          <span>Xin chào, {username}!</span>
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
