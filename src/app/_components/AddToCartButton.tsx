"use client"

import { useState, useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { addToCart } from '@/actions/cart.action';
import { cartContext } from '@/providers/cart-Provider';

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getNumberOfBoughtItems } = useContext(cartContext);

  async function handleAddToCart() {
    setIsLoading(true);
    try {
      const result = await addToCart(productId);
      if (result.success) {
        toast.success('Added to cart!');
        await getNumberOfBoughtItems(); // ✅ refresh navbar badge instantly
      } else {
        toast.error('Failed to add to cart');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="flex-1 h-13 bg-zinc-950 hover:bg-zinc-800 active:scale-95 text-white font-bold text-sm rounded-2xl gap-2 border-0 tracking-wide transition-all"
    >
      {isLoading
        ? <Spinner size="sm" className="text-white" />
        : <ShoppingCart size={16} />
      }
      {isLoading ? 'Adding…' : 'Add to Cart'}
    </Button>
  );
}