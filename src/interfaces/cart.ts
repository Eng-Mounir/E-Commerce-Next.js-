/* ── Types ── */
export interface CartProduct {
  count: number
  _id: string
  product: {
    _id: string
    title: string
    imageCover: string
    price: number
    brand?: { name: string }
    category?: { name: string }
  }
  price: number
}

export interface Cart {
  _id: string
  products: CartProduct[]
  totalCartPrice: number
}