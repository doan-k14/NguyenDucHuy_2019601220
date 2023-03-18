import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/types/next-page'

import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  return <div style={{ height: '80vh' }}>User page</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
