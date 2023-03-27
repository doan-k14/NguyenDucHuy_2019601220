import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Card,
  Col,
  Empty,
  Image,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Spin
} from 'antd'
import { HeartFilled, HeartOutlined, SwapOutlined } from '@ant-design/icons'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { ListPayload, Product } from '@/types/product'
import { NextPageWithLayout } from '@/types/next-page'
import { defaultPagination } from '@/configs/pagination'
import { ProductService } from '@/services/product'
import { productFilter } from '@/configs/selectOptions'
import { formatPrice } from '@/helpers/currency'
import useLocalStorage from '@/hooks/localStorage'

import BottomContent from '@/components/base/bottomContent'
import SortFilter from '@/components/filters/sortFilter'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const { Meta } = Card

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const categoryID = router.query.id?.toString()
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])

  const [page, setPage] = useState<number>(defaultPagination.page)
  const [pageSize, setPageSize] = useState<number>(defaultPagination.size)
  const [total, setTotal] = useState<number>(defaultPagination.total)

  const [sortString, setSortString] = useState<string>('desc')
  const [sortField, setSortField] = useState<string>('created_at')
  const [search, setSearch] = useState<string>()

  const [loveProducts, setLoveProducts] = useLocalStorage<Product[]>(
    'love-products',
    []
  )
  const [compareProducts, setCompareProducts] = useLocalStorage<Product[]>(
    'compare',
    []
  )

  const onCompare = (product: Product) => {
    if (!compareProducts.find(item => item.id === product.id)) {
      if (compareProducts.length === 3) {
        const tempProducts = [product].concat(compareProducts)
        setCompareProducts(tempProducts.slice(0, 3))
      } else setCompareProducts([...compareProducts, product])
      notificationSuccess('Thêm sản phẩm so sánh thành công')
    } else notificationError('Sản phẩm nay đã có trong danh sách')
  }

  const fetchProductByID = async () => {
    try {
      setLoading(true)
      const payload: ListPayload = {
        page: page,
        pageSize: pageSize,
        categoryID: parseInt(categoryID || '1'),
        status: 1,
        name: search,
        sortField: sortField,
        sortOrder: sortString
      }
      const response = await ProductService.getList(payload)
      if (response) {
        setProducts(response.products || [])
        setTotal(response.total)
        setPage(response.page)
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const onSelectLoveProduct = (loveProduct: Product) => {
    if (!loveProducts.find(product => product.id === loveProduct.id)) {
      setLoveProducts([...loveProducts, loveProduct])
      notificationSuccess('Thêm sản phẩm yêu thích thành công!')
    }
  }

  const onDeleteLoveProduct = (loveProduct: Product) => {
    setLoveProducts(
      loveProducts.filter(product => product.id !== loveProduct.id)
    )
    notificationSuccess('Xóa sản phẩm yêu thích thành công!')
  }

  const description = (loveProduct: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span
          style={{ color: '#D72027', fontSize: '1rem', fontWeight: 'bold' }}
        >
          <span>{formatPrice(loveProduct.price)}</span>
          <span style={{ fontSize: '0.8rem' }}> đ</span>
        </span>
        <span>
          <Button
            size="small"
            title="So sánh sản phẩm"
            onClick={e => {
              e.stopPropagation()
              onCompare(loveProduct)
            }}
          >
            <SwapOutlined />
          </Button>
          {loveProducts.find(product => product.id === loveProduct.id) ? (
            <Button
              size="small"
              title="Đã trong mục ưa thích"
              onClick={e => {
                e.stopPropagation()
                onDeleteLoveProduct(loveProduct)
              }}
            >
              <HeartFilled style={{ color: '#FF1935' }} />
            </Button>
          ) : (
            <Button
              size="small"
              title="Thêm vào mục ưa thích"
              onClick={e => {
                e.stopPropagation()
                onSelectLoveProduct(loveProduct)
              }}
            >
              <HeartOutlined style={{ color: '#FF1935' }} />
            </Button>
          )}
        </span>
      </div>
    )
  }

  useEffect(() => {
    if (categoryID) fetchProductByID()
  }, [router, page, pageSize])

  return (
    <>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Danh sách sản phẩm</h2>
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col span={18} offset={3} style={{ padding: '0 1rem' }}>
          {/* Filters */}
          <Space style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
            <SortFilter
              sortString={sortString}
              options={productFilter}
              onSortField={setSortField}
              onSorting={setSortString}
            />
            <Input
              allowClear={true}
              placeholder="Nhập tên/hãng"
              onBlur={e => setSearch(e.target.value)}
            />
            <Button
              onClick={fetchProductByID}
              style={{ background: '#D72027', color: 'white' }}
            >
              Tìm kiếm
            </Button>
          </Space>
          {/* Products */}
          <Spin spinning={loading}>
            <div
              style={{
                color: '#00264D',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'center',
                marginTop: '3rem'
              }}
            >
              {products.length > 0 ? (
                products.map(product => (
                  <Card
                    key={product.id}
                    size="small"
                    hoverable
                    style={{ width: 220 }}
                    cover={
                      <Image
                        preview={false}
                        alt="product"
                        src={product.image}
                      />
                    }
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <Meta
                      title={product.name}
                      description={description(product)}
                    />
                  </Card>
                ))
              ) : (
                <Empty description="Không có sản phẩm nào" />
              )}
            </div>
          </Spin>
        </Col>
      </Row>
      {/* Paginate */}
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col
          span={16}
          offset={4}
          style={{ padding: '0 1rem', display: 'flex' }}
        >
          <Pagination
            defaultCurrent={1}
            pageSize={pageSize}
            current={page}
            total={total}
            onChange={page => setPage(page)}
          />
          <Select
            style={{ width: '110px' }}
            defaultValue={8}
            options={[
              { value: 4, label: '4 / Trang' },
              { value: 8, label: '8 / Trang' },
              { value: 20, label: '20 / Trang' }
            ]}
            onChange={value => {
              setPage(1)
              setPageSize(value)
            }}
          />
        </Col>
      </Row>
      <BottomContent />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
