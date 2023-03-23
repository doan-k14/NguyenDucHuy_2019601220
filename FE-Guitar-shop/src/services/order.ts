import { Order, OrderDetailPayload, OrderPayload } from '@/types/order'
import { client } from './client'

export const OrderService = {
  createOrder(payload: OrderPayload) {
    return client.post('/order/create', { ...payload })
  },
  createOrderDetail(payload: OrderDetailPayload) {
    return client.post('/order/detail/create', { ...payload })
  },
  getLatestOrder(): Promise<Order> {
    return client.post('/latest')
  }
}
