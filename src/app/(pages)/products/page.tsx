import React from 'react'
import { fetchProducts } from '@/services/product.services'
import { ProductI } from '@/interfaces'
import ProductCard from '@/app/_components/ProductCard'

export default async function ProductPage() {
  const productsData = await fetchProducts()
  const products: ProductI[] = productsData?.data || []

  return (
    <>
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
    </>
  )
}