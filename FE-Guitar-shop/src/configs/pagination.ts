import { Pagination } from '../types/pagination'

export const paginationConfig: Pagination = {
  page: 1,
  page_size: 5,
  position: ['bottomLeft'],
  pageSizeOptions: [5, 10, 20],
  showSizeChanger: true
}

export const defaultPagination = {
  page: 1,
  size: 5,
  total: 0,
  sort: 'desc'
}
