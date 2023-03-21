export type Cart = {
  id: number
  category_id: number
  name: string
  image: string
  price: number
  amount: number
  description: string
  bonus?: string
  origin?: string
  style?: string
  material?: string
  paint?: string
  string_name?: string
  sold?: number
  status: number
  quantity: number | null
  total: number
  created_at: string
  updated_at: string
}
