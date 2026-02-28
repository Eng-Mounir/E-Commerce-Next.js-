"use client"

import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  ArrowLeft, ShoppingBag, MapPin, Phone, Building2,
  CreditCard, Banknote, ShieldCheck, Truck, CheckCircle2,
  ArrowRight, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { getLoggedUserCart } from '@/actions/cart.action'
import { createCashOrder, createCheckoutSession } from '@/actions/order.action'
import { Cart } from '@/interfaces/cart'
import { cartContext } from '@/providers/cart-Provider'

type PaymentMethod = 'cash' | 'card'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { getNumberOfBoughtItems } = useContext(cartContext)

  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')

  const [form, setForm] = useState({
    details: '',
    phone: '',
    city: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    getLoggedUserCart().then(data => {
      setCart(data)
      setLoading(false)
    })
  }, [])

  function validate() {
    const e: Record<string, string> = {}
    if (!form.details.trim()) e.details = 'Address details are required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^01[0125][0-9]{8}$/.test(form.phone)) e.phone = 'Enter a valid Egyptian phone number'
    if (!form.city.trim()) e.city = 'City is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    if (!cart?._id) { toast.error('No cart found'); return }

    setSubmitting(true)
    const shippingAddress = {
      details: form.details,
      phone: form.phone,
      city: form.city,
    }

    try {
      if (paymentMethod === 'cash') {
        const order = await createCashOrder(cart._id, shippingAddress)
        if (order) {
          await getNumberOfBoughtItems()
          toast.success('Order placed successfully!')
          router.push('/orders')
        } else {
          toast.error('Failed to place order')
        }
      } else {
        const url = await createCheckoutSession(cart._id, shippingAddress)
        if (url) {
          window.location.href = url // redirect to Stripe
        } else {
          toast.error('Failed to create payment session')
        }
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const isEmpty = !cart || cart.products.length === 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cg { font-family: 'Cormorant Garamond', serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        .a1{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) .05s both}
        .a2{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) .15s both}
        .a3{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) .25s both}
        .spinner{animation:spin .7s linear infinite}

        .pay-card {
          transition: all .2s cubic-bezier(.16,1,.3,1);
          cursor: pointer;
        }
        .pay-card:hover { border-color: #09090b; }
        .pay-card.selected { border-color: #09090b; background: #09090b; }
        .pay-card.selected .pay-label { color: white; }
        .pay-card.selected .pay-sub   { color: rgba(255,255,255,.5); }
        .pay-card.selected .pay-icon  { color: white; }

        .field-input {
          background: #fafafa;
          border: 1.5px solid #e4e4e7;
          border-radius: 12px;
          height: 44px;
          padding: 0 14px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: all .15s ease;
          outline: none;
          width: 100%;
          color: #09090b;
        }
        .field-input:focus { border-color: #09090b; background: white; }
        .field-input.error { border-color: #ef4444; background: #fff5f5; }

        .lift { transition: transform .2s ease, box-shadow .2s ease; }
        .lift:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.13); }
        .lift:active { transform: translateY(0); }
      `}</style>

      <div className="dm bg-white min-h-screen">

        {/* ── Dark Header ── */}
        <div className="relative bg-zinc-950 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-12">
            <button onClick={() => router.back()}
              className="a1 flex items-center gap-2 text-white/40 hover:text-white/70 text-[12px] font-medium mb-6 transition-colors">
              <ArrowLeft size={13} /> Back to Cart
            </button>
            <div className="a1 flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                <ShieldCheck size={11} className="text-green-400" />
                <span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40">Secure Checkout</span>
              </div>
            </div>
            <h1 className="a2 cg text-[clamp(2.8rem,5vw,4.5rem)] font-bold text-white leading-[.95] tracking-tight">
              Checkout<br /><span className="italic text-white/30">Details.</span>
            </h1>
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center py-40">
            <div className="w-10 h-10 border-2 border-zinc-200 border-t-zinc-950 rounded-full spinner" />
          </div>
        )}

        {/* ── Empty cart redirect nudge ── */}
        {!loading && isEmpty && (
          <div className="flex flex-col items-center justify-center py-32 text-center px-6">
            <div className="w-16 h-16 bg-zinc-100 rounded-3xl flex items-center justify-center mb-4">
              <ShoppingBag size={28} className="text-zinc-300" />
            </div>
            <h2 className="cg text-2xl font-bold text-zinc-900 mb-2">Your cart is empty</h2>
            <p className="text-zinc-400 text-sm font-light mb-6">Add some products before checking out.</p>
            <Button onClick={() => router.push('/products')}
              className="h-11 px-8 bg-zinc-950 text-white font-bold text-sm rounded-2xl gap-2 border-0">
              <Sparkles size={14} /> Browse Products
            </Button>
          </div>
        )}

        {/* ── Checkout form ── */}
        {!loading && !isEmpty && cart && (
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
            <div className="flex flex-col lg:flex-row gap-10 items-start">

              {/* ── Left: Form ── */}
              <div className="flex-1 min-w-0 space-y-8">

                {/* Shipping address */}
                <div className="a1">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 bg-zinc-950 rounded-xl flex items-center justify-center">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">Shipping Address</p>
                      <p className="text-[11px] text-zinc-400">Where should we deliver your order?</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Details */}
                    <div>
                      <Label className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5 block">
                        <MapPin size={10} /> Street Address & Apartment
                      </Label>
                      <input
                        className={`field-input ${errors.details ? 'error' : ''}`}
                        placeholder="e.g. 12 Tahrir St, Apt 4B, Zamalek"
                        value={form.details}
                        onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                      />
                      {errors.details && <p className="text-red-500 text-[11px] mt-1">{errors.details}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <Label className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5 block">
                          <Phone size={10} /> Phone Number
                        </Label>
                        <input
                          className={`field-input ${errors.phone ? 'error' : ''}`}
                          placeholder="01xxxxxxxxx"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          maxLength={11}
                        />
                        {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                      </div>

                      {/* City */}
                      <div>
                        <Label className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5 block">
                          <Building2 size={10} /> City
                        </Label>
                        <input
                          className={`field-input ${errors.city ? 'error' : ''}`}
                          placeholder="e.g. Cairo"
                          value={form.city}
                          onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                        />
                        {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-100" />

                {/* Payment method */}
                <div className="a2">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 bg-zinc-950 rounded-xl flex items-center justify-center">
                      <CreditCard size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">Payment Method</p>
                      <p className="text-[11px] text-zinc-400">Choose how you'd like to pay</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Cash */}
                    <div
                      onClick={() => setPaymentMethod('cash')}
                      className={`pay-card border-2 rounded-2xl p-4 flex items-center gap-3 ${paymentMethod === 'cash' ? 'selected' : 'border-zinc-200 bg-white'}`}
                    >
                      <Banknote size={20} className={`pay-icon shrink-0 ${paymentMethod === 'cash' ? 'text-white' : 'text-zinc-400'}`} />
                      <div>
                        <p className={`pay-label text-[13px] font-bold leading-none ${paymentMethod === 'cash' ? 'text-white' : 'text-zinc-800'}`}>
                          Cash on Delivery
                        </p>
                        <p className={`pay-sub text-[10px] mt-0.5 ${paymentMethod === 'cash' ? 'text-white/50' : 'text-zinc-400'}`}>
                          Pay when you receive
                        </p>
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`pay-card border-2 rounded-2xl p-4 flex items-center gap-3 ${paymentMethod === 'card' ? 'selected' : 'border-zinc-200 bg-white'}`}
                    >
                      <CreditCard size={20} className={`pay-icon shrink-0 ${paymentMethod === 'card' ? 'text-white' : 'text-zinc-400'}`} />
                      <div>
                        <p className={`pay-label text-[13px] font-bold leading-none ${paymentMethod === 'card' ? 'text-white' : 'text-zinc-800'}`}>
                          Online Payment
                        </p>
                        <p className={`pay-sub text-[10px] mt-0.5 ${paymentMethod === 'card' ? 'text-white/50' : 'text-zinc-400'}`}>
                          Visa / Mastercard
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-100" />

                {/* Trust badges */}
                <div className="a3 flex flex-wrap gap-2">
                  {[
                    { icon: ShieldCheck, label: '256-bit SSL Encryption' },
                    { icon: Truck,       label: 'Free Shipping'          },
                    { icon: CheckCircle2,label: 'Verified Checkout'      },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-100 rounded-full px-3 py-1.5">
                      <Icon size={11} className="text-zinc-500" />
                      <span className="text-[10px] font-semibold text-zinc-500 tracking-wide">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: Order summary ── */}
              <div className="a3 w-full lg:w-80 shrink-0">
                <div className="border border-zinc-100 rounded-3xl overflow-hidden sticky top-20">

                  <div className="bg-zinc-950 px-6 py-5">
                    <p className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40 mb-1">Order Summary</p>
                    <p className="cg text-3xl font-bold text-white leading-none">
                      {cart.products.length} <span className="italic text-white/40 text-2xl">items</span>
                    </p>
                  </div>

                  <div className="p-6 bg-white">
                    {/* Items */}
                    <div className="space-y-2.5 mb-4 max-h-48 overflow-y-auto pr-1">
                      {cart.products.map(item => (
                        <div key={item._id} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-100 rounded-xl overflow-hidden shrink-0 relative">
                            {item.product?.imageCover && (
                              <img src={item.product.imageCover} alt="" className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-zinc-800 line-clamp-1">
                              {item.product?.title?.split(' ').slice(0,3).join(' ') || 'Product'}
                            </p>
                            <p className="text-[10px] text-zinc-400">×{item.count}</p>
                          </div>
                          <span className="text-[12px] font-bold text-zinc-900 shrink-0">
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
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-500">Payment</span>
                      <span className="text-[11px] font-semibold text-zinc-700 capitalize">
                        {paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online Payment'}
                      </span>
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
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="lift w-full h-12 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl gap-2 border-0 tracking-wide"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
                      ) : paymentMethod === 'cash' ? (
                        <><Banknote size={15} /> Place Order</>
                      ) : (
                        <><CreditCard size={15} /> Pay Now</>
                      )}
                      {!submitting && <ArrowRight size={13} className="ml-auto" />}
                    </Button>

                    <p className="text-center text-[11px] text-zinc-400 font-light mt-3">
                      🔒 Your payment info is encrypted
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