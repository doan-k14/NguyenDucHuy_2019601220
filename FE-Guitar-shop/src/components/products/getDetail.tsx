import { OrderDetailResponse } from '@/types/order'
import { Product } from '@/types/product'

export const getDetail = (product: Product | OrderDetailResponse) => {
  const createTime = new Date(product.created_at).toLocaleString()
  const updateTime = new Date(product.created_at).toLocaleString()
  return (
    <>
      {product.description && (
        <div>
          <span style={{ fontWeight: 'bold' }}>Mô tả:</span>{' '}
          {product.description}
        </div>
      )}
      {product.bonus && (
        <div>
          <span style={{ fontWeight: 'bold' }}>Quà tặng kèm:</span>{' '}
          {product.bonus}
        </div>
      )}
      {product.origin && (
        <div>
          <span style={{ fontWeight: 'bold' }}>Nguồn gốc:</span>{' '}
          {product.origin}
        </div>
      )}
      {product.style && (
        <div>
          <span style={{ fontWeight: 'bold' }}>Kiểu dáng:</span> {product.style}
        </div>
      )}
      {product.material && (
        <div>
          <span style={{ fontWeight: 'bold' }}>Vật liệu:</span>{' '}
          {product.material}
        </div>
      )}
      {product.paint && (
        <div>
          <span style={{ fontWeight: 'bold' }}>Loại sơn:</span> {product.paint}
        </div>
      )}
      {product.string_name && (
        <div>
          <span style={{ fontWeight: 'bold' }}>Dây đàn:</span>{' '}
          {product.string_name}
        </div>
      )}
      {product.sold && (
        <div>
          <span style={{ fontWeight: 'bold' }}>Đã bán:</span> {product.sold}
        </div>
      )}
      <div>
        <span style={{ fontWeight: 'bold' }}>Ngày tạo:</span> {createTime}
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Ngày cập nhật:</span> {updateTime}
      </div>
    </>
  )
}
