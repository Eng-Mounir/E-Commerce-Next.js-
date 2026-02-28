import React from 'react'
import Link from 'next/link'
import { fetchProducts } from '@/services/product.services'
import { ProductI } from '@/interfaces'
import ProductCard from '@/app/_components/ProductCard'

// Make it dynamic so it doesn't try to fetch during build
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProductPage() {
  let products: ProductI[] = []
  let error = null

  try {
    const productsData = await fetchProducts()
    products = productsData?.data || []
  } catch (err) {
    console.error('Error fetching products:', err)
    error = 'Failed to load products'
  }

  if (error) {
    return (
      <main className='max-w-7xl mx-auto px-8 py-16'>
        <h1 className='text-4xl font-bold text-black mb-8'>Products</h1>
        <div className='bg-red-50 border border-red-200 rounded-2xl p-8 text-center'>
          <p className='text-red-600 text-lg mb-4'>{error}</p>
          <p className='text-gray-600 mb-6'>Please try refreshing the page</p>
          <Link 
            href="/products"
            className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Refresh Page
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto px-8 py-16'>
      <h1 className='text-4xl font-bold text-black mb-12 text-center'>All Products</h1>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {products.length > 0 ? (
          products.map((product: ProductI) => (
            <div key={product._id} className='flex justify-center'>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className='col-span-full text-center text-gray-600 text-lg'>No products found</p>
        )}
      </div>
    </main>
  )
}
