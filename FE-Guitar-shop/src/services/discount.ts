import {
  Discount,
  DiscountPayload,
  DiscountsResponse
} from './../types/discount'
import { client } from './client'

export const DiscountService = {
  getList(): Promise<DiscountsResponse> {
    return client.post('/discount')
  },
  create(payload: DiscountPayload) {
    return client.post('/discount/create', { ...payload })
  },
  detail(id: number): Promise<Discount> {
    return client.post(`/discount/${id}`)
  },
  update(id: number, payload: DiscountPayload) {
    return client.post(`/discount/update/${id}`, { ...payload })
  },
  get(payload: DiscountPayload): Promise<Discount[]> {
    return client.post('/discount/get', { ...payload })
  }
}
