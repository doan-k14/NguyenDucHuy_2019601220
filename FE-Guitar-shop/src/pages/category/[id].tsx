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
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { ListPayload, Product } from '@/types/product'
import { NextPageWithLayout } from '@/types/next-page'
import { defaultPagination } from '@/configs/pagination'
import { ProductService } from '@/services/product'
import { formatPrice } from '@/helpers/currency'
import useLocalStorage from '@/hooks/localStorage'

import SortFilter from '@/components/filters/sortFilter'
import Landing from '@/components/layouts/landing'
import News from '@/components/news'

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
          {formatPrice(loveProduct.price)}
        </span>
        {loveProducts.find(product => product.id === loveProduct.id) ? (
          <Button
            size="small"
            title="Đã trong mục ưa thích"
            onClick={() => onDeleteLoveProduct(loveProduct)}
          >
            <HeartFilled style={{ color: '#FF1935' }} />
          </Button>
        ) : (
          <Button
            size="small"
            title="Thêm vào mục ưa thích"
            onClick={() => onSelectLoveProduct(loveProduct)}
          >
            <HeartOutlined style={{ color: '#FF1935' }} />
          </Button>
        )}
      </div>
    )
  }

  useEffect(() => {
    if (categoryID) fetchProductByID()
  }, [router, page, pageSize])

  return (
    <>
      <h2 className="homepage-title">Danh sách sản phẩm</h2>
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col span={18} offset={3} style={{ padding: '0 1rem' }}>
          {/* Filters */}
          <Space style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
            <SortFilter
              sortString={sortString}
              onSortField={setSortField}
              onSorting={setSortString}
            />
            <Input
              allowClear={true}
              placeholder="Nhập tên sản phẩm"
              onBlur={e => setSearch(e.target.value)}
            />
            <Button
              onClick={fetchProductByID}
              style={{ background: '#D72027', color: 'white' }}
            >
              Tìm kiếm
            </Button>
          </Space>
          <Space style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}></Space>
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
                    cover={<img alt="product" src={product.image} />}
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <Meta
                      title={product.name}
                      description={description(product)}
                    />
                  </Card>
                ))
              ) : (
                <Empty />
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
      {/* Middle banner */}
      <Row>
        <Image preview={false} src="/images/slide3.jpg" />
      </Row>
      {/* News */}
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col span={14} offset={5} style={{ padding: '0 1rem' }}>
          <div
            style={{
              color: '#00264D'
            }}
          >
            <h2 className="homepage-title">Tin tức</h2>
            <News />
          </div>
        </Col>
      </Row>
      {/* Brand */}
      <h2 className="homepage-title">Nhãn hàng</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image src="/images/footer-banner.jpg" preview={false} />
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
