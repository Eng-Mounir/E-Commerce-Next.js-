"use client"

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from '@/actions/wishList.action';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

export default function WishlistButton({ productId }: { productId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleWishlist() {
    setLoading(true);
    try {
      if (isWishlisted) {
        const ok = await removeFromWishlist(productId);
        if (ok) { setIsWishlisted(false); toast.success('Removed from wishlist'); }
        else toast.error('Failed to remove from wishlist');
      } else {
        const ok = await addToWishlist(productId);
        if (ok) { setIsWishlisted(true); toast.success('Added to wishlist!'); }
        else toast.error('Failed to add to wishlist');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleWishlist}
      disabled={loading}
      className="wish-btn h-13 w-13 border-2 border-zinc-200 hover:border-rose-300 hover:bg-rose-50 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50"
    >
      {loading
        ? <Spinner size="sm" className="text-zinc-400" />
        : <Heart
            size={20}
            className={isWishlisted
              ? 'fill-rose-500 text-rose-500'
              : 'text-zinc-400'}
          />
      }
    </button>
  );
}