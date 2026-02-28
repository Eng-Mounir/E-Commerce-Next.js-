"use server"

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}



export interface Product {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  imageCover: string
  images: string[]
  ratingsAverage: number
  ratingsQuantity: number
  quantity: number
  brand: { _id: string; name: string }
  category: { _id: string; name: string }
}

/* ── Get all brands (fetches page 1 + 2 in parallel) ── */
export async function getAllBrands(): Promise<Brand[]> {
  try {
    const [res1, res2] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}brands?page=1`, { next: { revalidate: 3600 } }),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}brands?page=2`, { next: { revalidate: 3600 } }),
    ])
    const [data1, data2] = await Promise.all([res1.json(), res2.json()])
    return [...(data1.data || []), ...(data2.data || [])]
  } catch {
    return []
  }
}

/* ── Get single brand by ID ── */
export async function getBrandById(id: string): Promise<Brand | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}brands/${id}`,
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    return data?.data ?? null
  } catch {
    return null
  }
}

/* ── Get products by brand ── */
export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}products?brand=${brandId}&limit=50`,
      { next: { revalidate: 1800 } }
    )
    const data = await res.json()
    return data?.data ?? []
  } catch {
    return []
  }
}