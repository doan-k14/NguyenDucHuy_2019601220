import { useEffect, useState } from 'react'

import { paginationConfig } from '@/configs/pagination'
import { Product } from '@/types/product'
import { Table } from 'antd'
import useLocalStorage from '@/hooks/localStorage'

import { loveProductsColumn } from './columnsConfig'

const LocalProducts = () => {
  const [loveProducts, setLoveProducts] = useState<Product[]>([])
  const products = useLocalStorage<Product[]>('love-products', [])

  useEffect(() => {
    setLoveProducts(products[0])
  }, [])

  return (
    <Table
      columns={loveProductsColumn}
      dataSource={loveProducts}
      pagination={paginationConfig}
      rowKey="id"
    />
  )
}

export default LocalProducts
