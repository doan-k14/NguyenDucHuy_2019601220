export type OrderDetail = {
  id: number
  order_id: number
  product_id: number
  name: string
  image: string
  price: number
  quantity: number
  bonus?: string
  origin?: string
  style?: string
  material?: string
  paint?: string
  string_name?: string
}

export type Order = {
  id: number
  user_id?: number
  full_name: string
  address: string
  phone: number
  email: string
  note?: string
  quantity: number
  total_price: number
  status: number
}
