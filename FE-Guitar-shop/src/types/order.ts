export type OrderDetail = {
  id: number
  order_id: number
  product_id: number
  quantity: number
}

export type Order = {
  id: number
  user_id: number | null
  full_name: string
  address: string
  phone: number
  email: string
  note?: string
  quantity: number
  total_price: number
  status: number
}

export type OrderDetailItem = {
  order_id: number
  product_id: number
  quantity: number
}

export type OrderDetailPayload = {
  products: OrderDetailItem[]
}

export type OrderPayload = {
  user_id: number
  full_name: string
  address: string
  phone: number
  email: string
  note?: string
  quantity: number
  total_price: number
  status: number
}
