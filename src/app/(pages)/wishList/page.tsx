"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Heart, ShoppingBag, ArrowLeft, Trash2,
  Sparkles, Star, ShoppingCart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { getWishlist, removeFromWishlist, WishlistProduct } from '@/actions/wishList.action'
import { addToCart } from '@/actions/cart.action'

export default function WishlistPage() {
  const router = useRouter()

  const [items, setItems] = useState<WishlistProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  useEffect(() => {
    getWishlist().then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  async function handleRemove(productId: string) {
    setRemoving(productId)
    const ok = await removeFromWishlist(productId)
    if (ok) {
      setItems(prev => prev.filter(p => p._id !== productId))
      toast.success('Removed from wishlist')
    } else {
      toast.error('Failed to remove item')
    }
    setRemoving(null)
  }

  async function handleAddToCart(productId: string) {
    setAddingToCart(productId)
    const result = await addToCart(productId)
    if (result.success) {
      toast.success('Added to cart!')
    } else {
      toast.error('Failed to add to cart')
    }
    setAddingToCart(null)
  }

  const isEmpty = items.length === 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cg { font-family: 'Cormorant Garamond', serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes heartPop { 0%{transform:scale(1)} 40%{transform:scale(1.35)} 70%{transform:scale(.9)} 100%{transform:scale(1)} }
        @keyframes skelPulse{ 0%,100%{opacity:.06} 50%{opacity:.14} }
        @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .a1{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .05s both}
        .a2{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .15s both}
        .mq{animation:marquee 26s linear infinite}
        .spinner{animation:spin .7s linear infinite}
        .skel{animation:skelPulse 1.8s ease-in-out infinite}

        /* Card */
        .wish-card {
          transition: all .28s cubic-bezier(.16,1,.3,1);
        }
        .wish-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,.09);
        }
        .wish-card:hover .card-img img {
          transform: scale(1.06);
        }
        .card-img img { transition: transform .4s cubic-bezier(.16,1,.3,1); }

        /* Remove button */
        .rm-btn {
          transition: all .18s ease;
          opacity: 0;
        }
        .wish-card:hover .rm-btn { opacity: 1; }
        .rm-btn:hover { background: #fff1f2; color: #ef4444; transform: scale(1.1); }

        /* Add to cart button */
        .cart-btn {
          transition: all .2s cubic-bezier(.16,1,.3,1);
          transform: translateY(8px);
          opacity: 0;
        }
        .wish-card:hover .cart-btn {
          transform: translateY(0);
          opacity: 1;
        }

        /* Lift for cta buttons */
        .lift { transition: transform .2s ease, box-shadow .2s ease; }
        .lift:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.13); }
        .lift:active { transform: translateY(0); }
      `}</style>

      <div className="dm bg-white min-h-screen">

        {/* ── Dark hero header ── */}
        <div className="relative bg-zinc-950 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-14">
            <button
              onClick={() => router.back()}
              className="a1 flex items-center gap-2 text-white/35 hover:text-white/70 text-[12px] font-medium mb-6 transition-colors"
            >
              <ArrowLeft size={13} /> Back
            </button>

            <div className="a1 flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                <Heart size={11} className="text-rose-400 fill-rose-400" />
                <span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40">
                  {loading ? '—' : `${items.length} saved`}
                </span>
              </div>
            </div>

            <h1 className="a2 cg text-[clamp(2.8rem,5vw,4.5rem)] font-bold text-white leading-[.95] tracking-tight">
              My<br /><span className="italic text-white/30">Wishlist.</span>
            </h1>
          </div>

          {/* Marquee */}
          {!loading && !isEmpty && (
            <div className="border-t border-white/8 py-3 overflow-hidden">
              <div className="mq flex whitespace-nowrap text-white/15 text-[10px] font-bold tracking-[.22em] uppercase">
                {Array(10).fill(items.slice(0, 5).map(i => i.title.split(' ').slice(0,3).join(' '))).flat().map((t, i) => (
                  <span key={i} className="shrink-0 px-4">{t} &nbsp;·&nbsp;</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col gap-3" style={{animationDelay:`${i*0.08}s`}}>
                  <div className="skel w-full aspect-[3/4] bg-zinc-100 rounded-3xl" />
                  <div className="skel h-3 bg-zinc-100 rounded-full w-3/4" />
                  <div className="skel h-3 bg-zinc-100 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && isEmpty && (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <div className="relative w-20 h-20 mb-6">
              <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center">
                <Heart size={32} className="text-rose-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-zinc-950 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">0</span>
              </div>
            </div>
            <h2 className="cg text-3xl font-bold text-zinc-900 mb-2">Nothing saved yet</h2>
            <p className="text-zinc-400 text-sm font-light max-w-xs mb-8">
              Heart items you love and they'll appear here for easy access later.
            </p>
            <Button
              onClick={() => router.push('/products')}
              className="lift h-11 px-8 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl gap-2 border-0"
            >
              <Sparkles size={14} /> Discover Products
            </Button>
          </div>
        )}

        {/* ── Wishlist grid ── */}
        {!loading && !isEmpty && (
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-[11px] font-bold tracking-[.16em] uppercase text-zinc-400">
                {items.length} Saved item{items.length > 1 ? 's' : ''}
              </p>
              <Link
                href="/products"
                className="text-[12px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag size={13} /> Continue Shopping
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((product, i) => {
                const isRemoving = removing === product._id
                const isAdding = addingToCart === product._id

                return (
                  <div
                    key={product._id}
                    className={`wish-card group bg-white border border-zinc-100 rounded-3xl overflow-hidden cursor-pointer ${isRemoving ? 'opacity-40 pointer-events-none scale-95' : ''}`}
                    style={{ animation: `fadeUp .5s cubic-bezier(.16,1,.3,1) ${i * 0.05}s both` }}
                  >
                    {/* Image */}
                    <div className="card-img relative w-full aspect-[4/3] bg-zinc-50 overflow-hidden">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                        className="object-cover"
                        onClick={() => router.push(`/products/${product._id}`)}
                      />

                      {/* Remove button */}
                      <button
                        onClick={() => handleRemove(product._id)}
                        disabled={isRemoving}
                        className="rm-btn absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-zinc-400"
                      >
                        {isRemoving
                          ? <div className="w-3 h-3 border border-zinc-400 border-t-transparent rounded-full spinner" />
                          : <Trash2 size={14} />
                        }
                      </button>

                      {/* Hover: Add to cart bar */}
                      <div className="cart-btn absolute bottom-0 left-0 right-0 p-2">
                        <button
                          onClick={() => handleAddToCart(product._id)}
                          disabled={isAdding}
                          className="w-full h-9 bg-zinc-950/90 backdrop-blur-sm hover:bg-zinc-950 text-white text-[11px] font-bold tracking-wide rounded-2xl flex items-center justify-center gap-2 transition-colors"
                        >
                          {isAdding
                            ? <div className="w-3 h-3 border border-white/50 border-t-white rounded-full spinner" />
                            : <ShoppingCart size={13} />
                          }
                          {isAdding ? 'Adding…' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div
                      className="p-4"
                      onClick={() => router.push(`/products/${product._id}`)}
                    >
                      {product.brand && (
                        <p className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-0.5">
                          {product.brand.name}
                        </p>
                      )}
                      <p className="text-[13px] font-semibold text-zinc-900 leading-snug line-clamp-2 mb-2">
                        {product.title}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center gap-0.5">
                          {Array(5).fill(0).map((_, s) => (
                            <Star
                              key={s}
                              size={10}
                              className={s < Math.round(product.ratingsAverage)
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-zinc-200 text-zinc-200'}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          ({product.ratingsQuantity})
                        </span>
                      </div>

                      {/* Price row */}
                      <div className="flex items-center justify-between">
                        <p className="cg text-xl font-bold text-zinc-900 leading-none">
                          EGP {product.price}
                        </p>
                        <Heart
                          size={14}
                          className="fill-rose-400 text-rose-400"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 border border-zinc-100 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-zinc-50">
              <div>
                <p className="cg text-2xl font-bold text-zinc-900 mb-1">
                  Ready to checkout?
                </p>
                <p className="text-zinc-400 text-sm font-light">
                  Move your saved items to your cart and complete your purchase.
                </p>
              </div>
              <Button
                onClick={() => router.push('/cart')}
                className="lift h-11 px-8 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl gap-2 border-0 shrink-0"
              >
                <ShoppingCart size={15} /> View Cart
              </Button>
            </div>
          </div>
        )}

      </div>
    </>
  )
}