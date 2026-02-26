"use client"

import { ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { ProductI } from '@/app/interfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ProductProps = ProductI;

export default function ProductCard({ product }: { product: ProductProps }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const handleCardClick = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      className="w-76 overflow-hidden hover:shadow-lg transition-shadow relative flex flex-col cursor-pointer">
      {/* Product Image */}
      <div className="relative w-full h-72 bg-gray-200 overflow-hidden shrink-0">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover hover:scale-105 transition-transform"
        />
        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2 flex flex-col grow">
        {/* Brand */}
        <p className="text-xs text-gray-500 font-medium">{product.brand.name}</p>

        {/* Product Title */}
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 min-h-10">{product.title}</h3>

        {/* Category */}
        <p className="text-sm text-gray-500">{product.category.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {renderStars(product.ratingsAverage)}
          </div>
          <span className="text-sm text-gray-500">({product.ratingsQuantity})</span>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-gray-900">EGP {product.price}</p>

        {/* Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full bg-gray-900 text-white rounded-2xl py-2 px-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mt-auto">
          <ShoppingCart size={20} />
          <span className="text-sm font-medium">Add To Cart</span>
        </button>
      </div>
    </Card>
  );
}
