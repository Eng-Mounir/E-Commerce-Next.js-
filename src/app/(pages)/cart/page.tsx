"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Trash2, ShoppingBag, ArrowLeft, Plus, Minus,
  ShoppingCart, Sparkles, PackageX, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  getLoggedUserCart,
  removeCartItem,
  clearUserCart,
  updateCartQuantity,
} from '@/actions/cart.action'
import { Cart } from '@/app/interfaces/cart'

export default function CartPage() {
  const router = useRouter()

  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [clearing, setClearing] = useState(false)

  /* ── Fetch on mount ── */
  useEffect(() => {
    getLoggedUserCart().then(data => {
      setCart(data)
      setLoading(false)
    })
  }, [])

  /* ── Remove single item ── */
  async function handleRemove(productId: string, cartItemId: string) {
    setRemoving(cartItemId)
    const updated = await removeCartItem(productId)
    if (updated) {
      setCart(updated)
      toast.success('Item removed from cart')
    } else {
      toast.error('Failed to remove item')
    }
    setRemoving(null)
  }

  /* ── Clear all ── */
  async function handleClear() {
    setClearing(true)
    const ok = await clearUserCart()
    if (ok) {
      setCart(null)
      toast.success('Cart cleared')
    } else {
      toast.error('Failed to clear cart')
    }
    setClearing(false)
  }

  /* ── Update quantity ── */
  async function handleQuantity(productId: string, cartItemId: string, current: number, delta: number) {
    const next = current + delta
    if (next < 1) return
    setUpdating(cartItemId)
    const updated = await updateCartQuantity(productId, next)
    if (updated) setCart(updated)
    else toast.error('Failed to update quantity')
    setUpdating(null)
  }

  const isEmpty = !cart || cart.products.length === 0

  return (
    <>
      <div className="dm bg-white min-h-screen">

        {/* ── Header ── */}
        <div className="relative bg-zinc-950 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-12">
            <button
              onClick={() => router.back()}
              className="a1 flex items-center gap-2 text-white/40 hover:text-white/70 text-[12px] font-medium mb-6 transition-colors"
            >
              <ArrowLeft size={13} /> Back
            </button>
            <div className="a1 flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                <ShoppingCart size={11} className="text-white/50" />
                <span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40">
                  {isEmpty ? '0 items' : `${cart.products.length} item${cart.products.length > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
            <h1 className="a2 cg text-[clamp(2.8rem,5vw,4.5rem)] font-bold text-white leading-[.95] tracking-tight">
              Your<br /><span className="italic text-white/30">Cart.</span>
            </h1>
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center py-40">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-zinc-200 border-t-zinc-950 rounded-full spinner" />
              <p className="text-zinc-400 text-sm font-light">Loading your cart…</p>
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && isEmpty && (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mb-6">
              <PackageX size={32} className="text-zinc-300" />
            </div>
            <h2 className="cg text-3xl font-bold text-zinc-900 mb-2">Your cart is empty</h2>
            <p className="text-zinc-400 text-sm font-light max-w-xs mb-8">
              Looks like you haven't added anything yet. Start shopping to fill it up!
            </p>
            <Button
              onClick={() => router.push('/products')}
              className="lift h-11 px-8 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl gap-2 border-0"
            >
              <Sparkles size={14} /> Browse Products
            </Button>
          </div>
        )}

        {/* ── Cart content ── */}
        {!loading && !isEmpty && cart && (
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">

              {/* ── Items list ── */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] font-bold tracking-[.16em] uppercase text-zinc-400">
                    {cart.products.length} Item{cart.products.length > 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={handleClear}
                    disabled={clearing}
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    {clearing
                      ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full spinner" />
                      : <Trash2 size={13} />
                    }
                    Clear all
                  </button>
                </div>

                <div className="border border-zinc-100 rounded-3xl overflow-hidden divide-y divide-zinc-100">
                  {cart.products.map((item, i) => {
                    const isRemoving = removing === item._id
                    const isUpdating = updating === item._id
                    const subtotal = item.price * item.count

                    return (
                      <div
                        key={item._id}
                        className={`cart-item flex items-center gap-4 p-5 ${isRemoving ? 'opacity-40 pointer-events-none' : ''}`}
                        style={{ animation: `fadeUp .4s cubic-bezier(.16,1,.3,1) ${i * 0.06}s both` }}
                      >
                        {/* Image */}
                        <div className="shrink-0 w-20 h-20 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100">
                          <div className="img-wrap relative w-full h-full">
                            <Image
                              src={item.product?.imageCover || '/placeholder.png'}
                              alt={item.product?.title || 'Product'}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          {item.product?.brand && (
                            <p className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-0.5">
                              {item.product.brand.name}
                            </p>
                          )}
                          <p className="text-[14px] font-semibold text-zinc-900 leading-snug line-clamp-2 mb-1">
                            {item.product?.title || 'Product'}
                          </p>
                          <p className="text-[12px] text-zinc-400 font-light">
                            EGP {item.price} each
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            className="qty-btn"
                            disabled={item.count <= 1 || isUpdating}
                            onClick={() => handleQuantity(item.product._id, item._id, item.count, -1)}
                          >
                            <Minus size={11} />
                          </button>

                          <span className="w-6 text-center text-[14px] font-bold text-zinc-900">
                            {isUpdating
                              ? <span className="block w-3 h-3 border border-zinc-400 border-t-transparent rounded-full spinner mx-auto" />
                              : item.count
                            }
                          </span>

                          <button
                            className="qty-btn"
                            disabled={isUpdating}
                            onClick={() => handleQuantity(item.product._id, item._id, item.count, +1)}
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="shrink-0 text-right hidden sm:block w-24">
                          <p className="cg text-lg font-bold text-zinc-900 leading-none">
                            EGP {subtotal}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item.product._id, item._id)}
                          disabled={isRemoving}
                          className="remove-btn shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 transition-all"
                        >
                          {isRemoving
                            ? <div className="w-3 h-3 border border-zinc-400 border-t-transparent rounded-full spinner" />
                            : <Trash2 size={15} />
                          }
                        </button>
                      </div>
                    )
                  })}
                </div>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors mt-6"
                >
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </div>

              {/* ── Order summary ── */}
              <div className="a3 w-full lg:w-80 shrink-0">
                <div className="border border-zinc-100 rounded-3xl overflow-hidden sticky top-20">
                  <div className="bg-zinc-950 px-6 py-5">
                    <p className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40 mb-1">Order Summary</p>
                    <p className="cg text-3xl font-bold text-white leading-none">
                      {cart.products.length} <span className="italic text-white/40 text-2xl">items</span>
                    </p>
                  </div>

                  <div className="p-6 bg-white">
                    <div className="space-y-3 mb-4">
                      {cart.products.map(item => (
                        <div key={item._id} className="flex items-center justify-between text-sm">
                          <span className="text-zinc-500 font-light line-clamp-1 flex-1 mr-2">
                            {item.product?.title?.split(' ').slice(0, 3).join(' ') || 'Product'} ×{item.count}
                          </span>
                          <span className="font-semibold text-zinc-800 shrink-0">
                            EGP {item.price * item.count}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4 bg-zinc-100" />

                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-500">Shipping</span>
                      <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-0.5 rounded-full">Free</span>
                    </div>

                    <Separator className="my-4 bg-zinc-100" />

                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <p className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-0.5">Total</p>
                        <p className="cg text-3xl font-bold text-zinc-900 leading-none">
                          EGP {cart.totalCartPrice}
                        </p>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-light pb-1">incl. VAT</p>
                    </div>

                    <Button
                      onClick={() => router.push('/checkout')}
                      className="lift w-full h-12 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl gap-2 border-0 tracking-wide"
                    >
                      <ShoppingBag size={15} />
                      Proceed to Checkout
                      <ArrowRight size={13} className="ml-auto" />
                    </Button>

                    <p className="text-center text-[11px] text-zinc-400 font-light mt-3">
                      🔒 Secure checkout — your data is safe
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  )
}