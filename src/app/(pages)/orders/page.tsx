"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Package, ArrowLeft, ShoppingBag, CheckCircle2,
  Clock, Truck, CreditCard, Banknote, ChevronDown,
  ChevronRight, MapPin, Phone, Building2, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getUserOrders, getAllOrders, Order } from '@/actions/order.action'

export default function OrdersPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') { router.push('/login'); return }

    async function fetchOrders() {
      try {
        setLoading(true)
        setError(null)

        // Log full session so we can see where the user id lives
        console.log('[Orders] session.user:', JSON.stringify(session?.user))

        // Try every common field name for the user id
        const user = session?.user as any
        const userId: string | undefined =
          user?._id ?? user?.id ?? user?.userId ?? user?.sub

        console.log('[Orders] resolved userId:', userId)

        let data: Order[] = []

        if (userId) {
          console.log('[Orders] trying getUserOrders:', userId)
          data = await getUserOrders(userId)
          console.log('[Orders] getUserOrders count:', data.length)
        }

        if (!data || data.length === 0) {
          console.log('[Orders] falling back to getAllOrders')
          data = await getAllOrders()
          console.log('[Orders] getAllOrders count:', data.length)
        }

        setOrders(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('[Orders] fetch error:', err)
        setError('Failed to load orders. Please try again.')
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [status, session])

  function toggleExpand(id: string) {
    setExpanded(prev => prev === id ? null : id)
  }

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString('en-EG', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    } catch { return iso }
  }

  // ── Payment type badge — NO icon inside span (fixes SVG width="sm" error) ──
  function PaymentBadge({ type }: { type: string }) {
    return (
      <span className="flex items-center gap-1 text-[9px] font-bold tracking-[.1em] uppercase bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full">
        {type === 'cash'
          ? <Banknote size={10} strokeWidth={2} />
          : <CreditCard size={10} strokeWidth={2} />
        }
        {type === 'cash' ? 'Cash' : 'Card'}
      </span>
    )
  }

  return (
    <>

      <div className="dm bg-white min-h-screen">

        {/* ── Dark header ── */}
        <div className="relative bg-zinc-950 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-12">
            <button onClick={() => router.back()}
              className="a1 flex items-center gap-2 text-white/40 hover:text-white/70 text-[12px] font-medium mb-6 transition-colors">
              <ArrowLeft size={13} /> Back
            </button>
            <div className="a1 flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                <Package size={11} className="text-white/50" />
                <span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40">
                  {loading ? '—' : `${orders.length} order${orders.length !== 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
            <h1 className="a2 cg text-[clamp(2.8rem,5vw,4.5rem)] font-bold text-white leading-[.95] tracking-tight">
              My<br /><span className="italic text-white/30">Orders.</span>
            </h1>
          </div>
        </div>

        {/* ── Loading ── */}
        {(loading || status === 'loading') && (
          <div className="max-w-4xl mx-auto px-6 lg:px-16 py-12 space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="skel h-[72px]" style={{animationDelay:`${i * .08}s`}} />
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="max-w-4xl mx-auto px-6 lg:px-16 py-20 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-red-300" />
            </div>
            <h2 className="cg text-2xl font-bold text-zinc-900 mb-2">Couldn't load orders</h2>
            <p className="text-zinc-400 text-sm mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}
              className="h-10 px-6 bg-zinc-950 text-white font-bold text-sm rounded-2xl border-0">
              Try Again
            </Button>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center px-6">
            <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mb-6">
              <Package size={32} className="text-zinc-300" />
            </div>
            <h2 className="cg text-3xl font-bold text-zinc-900 mb-2">No orders yet</h2>
            <p className="text-zinc-400 text-sm font-light max-w-xs mb-8">
              You haven't placed any orders. Start shopping to see your history here.
            </p>
            <Button onClick={() => router.push('/products')}
              className="lift h-11 px-8 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl gap-2 border-0">
              <Sparkles size={14} /> Browse Products
            </Button>
          </div>
        )}

        {/* ── Orders list ── */}
        {!loading && !error && orders.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 lg:px-16 py-12 space-y-4">

            {orders.map((order, i) => {
              const isOpen = expanded === order._id
              const itemCount = order.cartItems?.length ?? 0

              return (
                <div
                  key={order._id}
                  className="order-card bg-white rounded-3xl overflow-hidden"
                  style={{ animation: `fadeUp .5s cubic-bezier(.16,1,.3,1) ${i * 0.06}s both` }}
                >
                  {/* ── Header row ── */}
                  <div
                    className="flex items-center gap-4 p-5 cursor-pointer select-none"
                    onClick={() => toggleExpand(order._id)}
                  >
                    {/* Status icon */}
                    <div className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center ${
                      order.isDelivered ? 'bg-green-50' : order.isPaid ? 'bg-blue-50' : 'bg-amber-50'
                    }`}>
                      {order.isDelivered
                        ? <CheckCircle2 size={18} className="text-green-600" />
                        : order.isPaid
                          ? <Truck size={18} className="text-blue-600" />
                          : <Clock size={18} className="text-amber-600" />
                      }
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[13px] font-bold text-zinc-900">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                        <span className={`text-[9px] font-bold tracking-[.12em] uppercase px-2 py-0.5 rounded-full ${
                          order.isDelivered
                            ? 'bg-green-100 text-green-700'
                            : order.isPaid
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-700'
                        }`}>
                          {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid · Shipping' : 'Pending'}
                        </span>
                        <PaymentBadge type={order.paymentMethodType} />
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-[11px] text-zinc-400">{formatDate(order.createdAt)}</p>
                        <span className="text-zinc-200">·</span>
                        <p className="text-[11px] text-zinc-400">
                          {itemCount} item{itemCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Total */}
                    <p className="cg text-xl font-bold text-zinc-900 shrink-0 hidden sm:block">
                      EGP {order.totalOrderPrice}
                    </p>

                    <ChevronDown size={16} className={`chevron-icon text-zinc-400 shrink-0 ${isOpen ? 'open' : ''}`} />
                  </div>

                  {/* ── Expanded ── */}
                  {isOpen && (
                    <div className="border-t border-zinc-100 px-5 pb-6 pt-5 space-y-5">

                      {/* Items */}
                      {itemCount > 0 && (
                        <div>
                          <p className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-3">Items Ordered</p>
                          <div className="space-y-3">
                            {order.cartItems.map(item => (
                              <div key={item._id} className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-zinc-100 rounded-xl overflow-hidden shrink-0 border border-zinc-100">
                                  {item.product?.imageCover && (
                                    <img src={item.product.imageCover} alt=""
                                      className="w-full h-full object-cover" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  {item.product?.brand?.name && (
                                    <p className="text-[9px] font-bold tracking-[.12em] uppercase text-zinc-400 mb-0.5">
                                      {item.product.brand.name}
                                    </p>
                                  )}
                                  <p className="text-[13px] font-semibold text-zinc-800 line-clamp-1">
                                    {item.product?.title || 'Product'}
                                  </p>
                                  <p className="text-[11px] text-zinc-400">×{item.count} · EGP {item.price} each</p>
                                </div>
                                <p className="text-[13px] font-bold text-zinc-900 shrink-0">
                                  EGP {item.price * item.count}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Separator className="bg-zinc-100" />

                      {/* Shipping */}
                      {order.shippingAddress && (
                        <div>
                          <p className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-3">Shipping Address</p>
                          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="flex items-start gap-2">
                              <MapPin size={13} className="text-zinc-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[9px] font-bold tracking-[.12em] uppercase text-zinc-400 mb-0.5">Address</p>
                                <p className="text-[12px] font-medium text-zinc-700">{order.shippingAddress.details}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Phone size={13} className="text-zinc-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[9px] font-bold tracking-[.12em] uppercase text-zinc-400 mb-0.5">Phone</p>
                                <p className="text-[12px] font-medium text-zinc-700">{order.shippingAddress.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Building2 size={13} className="text-zinc-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[9px] font-bold tracking-[.12em] uppercase text-zinc-400 mb-0.5">City</p>
                                <p className="text-[12px] font-medium text-zinc-700">{order.shippingAddress.city}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <Separator className="bg-zinc-100" />

                      {/* Footer */}
                      <div className="flex items-end justify-between">
                        <div className="flex flex-col gap-1 text-[11px] text-zinc-400">
                          {order.isPaid && order.paidAt && <span>✓ Paid on {formatDate(order.paidAt)}</span>}
                          {order.isDelivered && order.deliveredAt && <span>✓ Delivered on {formatDate(order.deliveredAt)}</span>}
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold tracking-[.12em] uppercase text-zinc-400 mb-0.5">Order Total</p>
                          <p className="cg text-2xl font-bold text-zinc-900">EGP {order.totalOrderPrice}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            <div className="pt-4 flex justify-center">
              <Link href="/products"
                className="flex items-center gap-2 text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
                <ShoppingBag size={14} /> Continue Shopping <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}