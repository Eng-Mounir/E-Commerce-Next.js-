"use client";

import { useState } from "react";
import { addToCart } from "@/actions/cart.action";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";


export default function AddToCartButton({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToCart() {
    try {
      setIsLoading(true);
      const result = await addToCart(productId, 1);

      if (result) {
        toast.success("Product added to cart successfully");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleAddToCart}
      className="lift flex-1 h-13 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl flex items-center justify-center gap-2.5 font-bold text-sm"
    >
      {isLoading ? "Adding..." : (
        <>
          <ShoppingCart size={18} />
          Add to Cart
        </>
      )}
    </button>
  );
}