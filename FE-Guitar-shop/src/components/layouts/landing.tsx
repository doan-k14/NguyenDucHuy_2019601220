import Head from 'next/head'

import { Layout } from 'antd'

import Footer from '../base/footer'
import DesktopHeader from '../base/desktopHeader'

type LayoutProps = {
  children: React.ReactNode
}

export default function Landing({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Guitar shop</title>
        <meta name="title" content="Guitar shop" />
        <meta name="description" content="Guitar shop" />
      </Head>
      <main>
        <Layout className="landing-layout">
          <div style={{ color: '#000' }}>
            <DesktopHeader />
          </div>
          {children}
          <div style={{ color: '#000' }}>
            <Footer />
          </div>
        </Layout>
      </main>
    </>
  )
}
