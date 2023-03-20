import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/types/next-page'

import Customer from '@/components/layouts/customer'

const Page: NextPageWithLayout = () => {
  return <div style={{ height: '80vh' }}>Customer page</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Customer>{page}</Customer>
}

export default Page
