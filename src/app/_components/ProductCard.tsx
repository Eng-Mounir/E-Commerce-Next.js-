"use client"

import { ShoppingCart, Heart, Star } from 'lucide-react';
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
      <Star
        key={i}
        size={11}
        className={i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-zinc-200 text-zinc-200'}
      />
    ));
  };

  const handleCardClick = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <>

      <Card
        onClick={handleCardClick}
        className="dm pc-root w-72 overflow-hidden border border-zinc-100 rounded-3xl cursor-pointer flex flex-col bg-white shadow-sm"
      >
        {/* ── Image ── */}
        <div className="pc-img relative w-full h-64 bg-zinc-50 overflow-hidden shrink-0">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Wishlist */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
            className="wish-btn absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center shadow-md"
          >
            <Heart
              size={16}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-400'}
            />
          </button>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[9px] font-bold tracking-[.15em] uppercase bg-white/95 backdrop-blur text-zinc-600 px-2.5 py-1 rounded-full">
              {product.category.name}
            </span>
          </div>
        </div>

        {/* ── Details ── */}
        <div className="p-5 flex flex-col grow gap-2">

          {/* Brand */}
          <p className="text-[10px] font-bold tracking-[.16em] uppercase text-zinc-400">
            {product.brand.name}
          </p>

          {/* Title */}
          <h3 className="cg text-[1.15rem] font-bold text-zinc-900 leading-snug line-clamp-2 min-h-[2.6rem]">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {renderStars(product.ratingsAverage)}
            </div>
            <span className="text-[11px] text-zinc-400 font-medium">
              ({product.ratingsQuantity})
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-100 my-1" />

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-0.5">Price</p>
              <p className="cg text-2xl font-bold text-zinc-900 leading-none">
                EGP {product.price}
              </p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="cart-btn w-11 h-11 bg-zinc-950 rounded-2xl flex items-center justify-center shadow-sm"
            >
              <ShoppingCart size={17} className="text-white" />
            </button>
          </div>

          {/* Hover: full Add to Cart bar */}
          <div className="pc-actions">
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="cart-btn w-full h-10 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold tracking-wide mt-1"
            >
              <ShoppingCart size={14} />
              Add to Cart
            </button>
          </div>

        </div>
      </Card>
    </>
  );
}