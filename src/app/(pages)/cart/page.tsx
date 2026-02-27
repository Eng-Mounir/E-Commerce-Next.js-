"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  Trash2, ShoppingBag, ArrowLeft, Plus, Minus,
  ShoppingCart, Sparkles, PackageX, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

/* ── Types ── */
interface CartProduct {
  count: number
  _id: string
  product: {
    _id: string
    title: string
    imageCover: string
    price: number
    brand?: { name: string }
    category?: { name: string }
  }
  price: number
}

interface Cart {
  _id: string
  products: CartProduct[]
  totalCartPrice: number
}

/* ── API helpers (replace with your actual service calls) ── */
async function fetchCart(token: string): Promise<Cart | null> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    headers: { token },
    cache: 'no-store',
  })
  const data = await res.json()
  return data?.status === 'success' ? data.data : null
}

async function removeItem(productId: string, token: string): Promise<Cart | null> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    method: 'DELETE',
    headers: { token },
  })
  const data = await res.json()
  return data?.status === 'success' ? data.data : null
}

async function clearCart(token: string): Promise<boolean> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    method: 'DELETE',
    headers: { token },
  })
  const data = await res.json()
  return data?.message === 'success'
}

async function updateQuantity(productId: string, count: number, token: string): Promise<Cart | null> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    method: 'PUT',
    headers: { token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ count }),
  })
  const data = await res.json()
  return data?.status === 'success' ? data.data : null
}

/* ── Cart Page ── */
export default function CartPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const token = (session as any)?.accessToken as string

  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [clearing, setClearing] = useState(false)

  useEffect(() => {
    if (!token) return
    fetchCart(token).then(data => {
      setCart(data)
      setLoading(false)
    })
  }, [token])

  async function handleRemove(productId: string, cartItemId: string) {
    setRemoving(cartItemId)
    const updated = await removeItem(productId, token)
    if (updated) {
      setCart(updated)
      toast.success('Item removed from cart')
    } else {
      toast.error('Failed to remove item')
    }
    setRemoving(null)
  }

  async function handleClear() {
    setClearing(true)
    const ok = await clearCart(token)
    if (ok) {
      setCart(null)
      toast.success('Cart cleared')
    } else {
      toast.error('Failed to clear cart')
    }
    setClearing(false)
  }

  async function handleQuantity(productId: string, cartItemId: string, current: number, delta: number) {
    const next = current + delta
    if (next < 1) return
    setUpdating(cartItemId)
    const updated = await updateQuantity(productId, next, token)
    if (updated) setCart(updated)
    else toast.error('Failed to update quantity')
    setUpdating(null)
  }

  const isEmpty = !cart || cart.products.length === 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cg { font-family: 'Cormorant Garamond', serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        @keyframes slideOut { to{opacity:0;transform:translateX(40px);max-height:0;padding:0;margin:0} }

        .a1{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) .05s both}
        .a2{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) .12s both}
        .a3{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) .20s both}

        .cart-item { transition: all .25s cubic-bezier(.16,1,.3,1); }
        .cart-item:hover { background: #fafafa; }

        .qty-btn {
          width:28px; height:28px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          border: 1.5px solid #e4e4e7;
          transition: all .15s ease; cursor:pointer; background:white;
        }
        .qty-btn:hover:not(:disabled) { border-color:#09090b; background:#09090b; color:white; }
        .qty-btn:disabled { opacity:.4; cursor:not-allowed; }

        .remove-btn { transition: all .18s ease; }
        .remove-btn:hover { background:#fff1f2; color:#ef4444; transform:scale(1.05); }

        .lift { transition: transform .2s ease, box-shadow .2s ease; }
        .lift:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,.13); }

        .spinner { animation:spin .7s linear infinite; }

        .img-wrap { transition: transform .25s cubic-bezier(.16,1,.3,1); }
        .cart-item:hover .img-wrap { transform: scale(1.04); }
      `}</style>

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

                {/* List header */}
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

                          <span className={`w-6 text-center text-[14px] font-bold text-zinc-900 ${isUpdating ? 'opacity-40' : ''}`}>
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

                {/* Continue shopping */}
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

                  {/* Summary header */}
                  <div className="bg-zinc-950 px-6 py-5">
                    <p className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40 mb-1">Order Summary</p>
                    <p className="cg text-3xl font-bold text-white leading-none">
                      {cart.products.length} <span className="italic text-white/40 text-2xl">items</span>
                    </p>
                  </div>

                  <div className="p-6 bg-white">
                    {/* Line items */}
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

                    {/* Shipping */}
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-500">Shipping</span>
                      <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-0.5 rounded-full">Free</span>
                    </div>

                    <Separator className="my-4 bg-zinc-100" />

                    {/* Total */}
                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <p className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-0.5">Total</p>
                        <p className="cg text-3xl font-bold text-zinc-900 leading-none">
                          EGP {cart.totalCartPrice}
                        </p>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-light pb-1">incl. VAT</p>
                    </div>

                    {/* Checkout CTA */}
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