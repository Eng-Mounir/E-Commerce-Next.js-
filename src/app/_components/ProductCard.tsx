"use client";

import { ShoppingCart, Heart, Star, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { ProductI } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { addToCart } from '@/actions/cart.action';
import { addToWishlist, removeFromWishlist } from '@/actions/wishList.action';
import { toast } from 'sonner';
import { cartContext } from '@/providers/cart-Provider';

export default function ProductCard({ product }: { product: ProductI }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ Pull refresh function from cart context to update navbar badge
  const { getNumberOfBoughtItems } = useContext(cartContext);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={11}
        className={i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-zinc-200 text-zinc-200'}
      />
    ));

  const handleCardClick = () => router.push(`/products/${product._id}`);

  async function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const result = await addToCart(product._id);
      if (result.success) {
        toast.success('Added to cart!');
        await getNumberOfBoughtItems(); // ✅ refresh navbar badge
      } else {
        toast.error('Failed to add to cart');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        const ok = await removeFromWishlist(product._id);
        if (ok) { setIsWishlisted(false); toast.success('Removed from wishlist'); }
        else toast.error('Failed to remove from wishlist');
      } else {
        const ok = await addToWishlist(product._id);
        if (ok) { setIsWishlisted(true); toast.success('Added to wishlist!'); }
        else toast.error('Failed to add to wishlist');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setWishlistLoading(false);
    }
  }

  return (
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

        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          className="wish-btn absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          {wishlistLoading ? (
            <Loader2 size={16} className="animate-spin text-zinc-400" />
          ) : (
            <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-400'} />
          )}
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
        <p className="text-[10px] font-bold tracking-[.16em] uppercase text-zinc-400">
          {product.brand.name}
        </p>

        <h3 className="cg text-[1.15rem] font-bold text-zinc-900 leading-snug line-clamp-2 min-h-[2.6rem]">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">{renderStars(product.ratingsAverage)}</div>
          <span className="text-[11px] text-zinc-400 font-medium">({product.ratingsQuantity})</span>
        </div>

        <div className="h-px bg-zinc-100 my-1" />

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-0.5">Price</p>
            <p className="cg text-2xl font-bold text-zinc-900 leading-none">EGP {product.price}</p>
          </div>

          <button
            disabled={isLoading}
            onClick={handleAddToCart}
            className="w-11 h-11 bg-zinc-950 hover:bg-zinc-800 active:scale-95 rounded-2xl flex items-center justify-center shadow-sm transition-all"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin text-white" />
            ) : (
              <ShoppingCart size={16} className="text-white" />
            )}
          </button>
        </div>

        {/* Hover: full Add to Cart bar */}
        <div className="pc-actions">
          <button
            disabled={isLoading}
            onClick={handleAddToCart}
            className="w-full h-10 bg-zinc-950 hover:bg-zinc-800 active:scale-95 text-white rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold tracking-wide mt-1 transition-all"
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin text-white" />
            ) : (
              <ShoppingCart size={14} className="text-white" />
            )}
            Add to Cart
          </button>
        </div>
      </div>
    </Card>
  );
}
