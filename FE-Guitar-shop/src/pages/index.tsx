import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/types/next-page'

import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  return <div style={{height: '80vh'}}>Home page</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
