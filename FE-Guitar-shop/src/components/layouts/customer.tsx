import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Button, Image, Layout, Menu, MenuProps } from 'antd'
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'

import UserDesktop from '../base/userHeader'
import { customerMenu } from './menuRender'

type LayoutProps = {
  children: React.ReactNode
}

export default function Customer({ children }: LayoutProps) {
  const { Header, Sider } = Layout
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const menuOnClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key || '/')
  }

  return (
    <>
      <Head>
        <title>Guitar shop</title>
        <meta name="title" content="Guitar shop" />
        <meta name="description" content="Guitar shop" />
      </Head>
      <main>
        <Layout className="layout">
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Image
              onClick={() => router.push('/users')}
              style={{ padding: '1rem', width: '100%' }}
              preview={false}
              src="https://firebasestorage.googleapis.com/v0/b/ndhuy-498b5.appspot.com/o/2efd6b44584243558050bfeb3f36751a.png?alt=media&token=45310f90-38bf-4015-8679-8a46f3ff2eff"
            />
            <Menu
              theme="dark"
              mode="inline"
              items={customerMenu}
              defaultSelectedKeys={[router.pathname]}
              onClick={menuOnClick}
            />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                position: 'sticky',
                top: 0,
                display: 'flex',
                justifyContent: 'space-between',
                padding: 0,
                zIndex: 50,
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px'
              }}
            >
              <div>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed)
                  }
                )}
                <Button
                  size="middle"
                  type="primary"
                  icon={<HomeOutlined />}
                  onClick={() => router.push('/')}
                >
                  Quay về trang chủ
                </Button>
              </div>
              <UserDesktop />
            </Header>
            {children}
          </Layout>
        </Layout>
      </main>
    </>
  )
}
