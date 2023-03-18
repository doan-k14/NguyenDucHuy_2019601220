import {
  CreatePayload,
  ListPayload,
  Product,
  UpdatePayload
} from './../types/product'
import { ProductResponse } from '@/types/product'
import { client } from './client'

export const ProductService = {
  getList(payload: ListPayload): Promise<ProductResponse> {
    return client.post('/product/list', { ...payload })
  },
  create(payload: CreatePayload) {
    return client.post('/product/create', { ...payload })
  },
  delete(id: number) {
    return client.delete(`/product/${id}`)
  },
  show(id: string | string[] | undefined): Promise<Product> {
    return client.post(`/product/${id}`)
  },
  update(id: string | string[] | undefined, payload: UpdatePayload) {
    return client.post(`/product/update/${id}`, { ...payload })
  }
}
