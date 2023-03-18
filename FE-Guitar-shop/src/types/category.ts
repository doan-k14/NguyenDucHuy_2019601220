export type Category = {
  id: number
  name: string
  description: string
  status: number
  created_at: string
  updated_at: string
}

export type CategoryResponse = {
  total?: number
  categories?: Category[]
  message?: string
  result?: Category
}

export type CategoryPayload = {
  name: string | undefined
  description: string | undefined
  status: number | undefined
}
