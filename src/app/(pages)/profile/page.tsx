"use client"

import { useState, useContext } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User, Mail, Phone, ShoppingBag, Heart, Package,
  Settings, LogOut, ChevronRight, Shield, Bell,
  Star, CreditCard, MapPin, Edit3, Camera, ArrowLeft,
  Sparkles, Clock, CheckCircle2, Truck, TrendingUp
} from 'lucide-react'
import { cartContext } from '@/providers/cart-Provider'

/* ── Stat card ── */
function StatCard({
  icon: Icon, label, value, color, href
}: {
  icon: any; label: string; value: string | number; color: string; href: string
}) {
  return (
    <Link href={href} className="stat-card group flex flex-col gap-3 bg-white border border-zinc-100 rounded-3xl p-5 cursor-pointer">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon size={17} className="text-white" />
      </div>
      <div>
        <p className="cg text-3xl font-bold text-zinc-900 leading-none mb-1">{value}</p>
        <p className="text-[11px] font-semibold text-zinc-400 tracking-wide uppercase">{label}</p>
      </div>
      <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-700 transition-colors">
        View all <ChevronRight size={12} />
      </div>
    </Link>
  )
}

/* ── Menu item ── */
function MenuItem({
  icon: Icon, label, sub, href, onClick, danger = false, badge
}: {
  icon: any; label: string; sub?: string; href?: string; onClick?: () => void;
  danger?: boolean; badge?: string
}) {
  const cls = `menu-item group flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${
    danger ? 'hover:bg-red-50' : 'hover:bg-zinc-50'
  }`
  const inner = (
    <>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
        danger ? 'bg-red-50 group-hover:bg-red-100' : 'bg-zinc-100 group-hover:bg-zinc-200'
      }`}>
        <Icon size={15} className={danger ? 'text-red-400' : 'text-zinc-500'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-semibold leading-none ${danger ? 'text-red-500' : 'text-zinc-800'}`}>
          {label}
        </p>
        {sub && <p className="text-[11px] text-zinc-400 mt-0.5">{sub}</p>}
      </div>
      {badge && (
        <span className="text-[9px] font-bold tracking-[.1em] uppercase bg-zinc-900 text-white px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <ChevronRight size={14} className={`shrink-0 ${danger ? 'text-red-300' : 'text-zinc-300'} group-hover:translate-x-0.5 transition-transform`} />
    </>
  )
  if (href) return <Link href={href} className={cls}>{inner}</Link>
  return <button onClick={onClick} className={`${cls} w-full text-left`}>{inner}</button>
}

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { numberOfBoughtItems } = useContext(cartContext)
  const [loggingOut, setLoggingOut] = useState(false)

  const user = session?.user as any
  const userName: string = user?.name ?? 'Guest User'
  const userEmail: string = user?.email ?? ''
  const userPhone: string = user?.phone ?? ''
  const initial = userName.trim().charAt(0).toUpperCase()

  async function handleLogout() {
    setLoggingOut(true)
    await signOut({ redirect: false })
    router.push('/login')
    router.refresh()
  }

  if (status === 'loading') {
    return (
      <div className="dm bg-white min-h-screen">
        <div className="relative bg-zinc-950 h-56" />
        <div className="max-w-4xl mx-auto px-6 lg:px-16 pb-12">
          <div className="skel-avatar" />
          <div className="mt-20 space-y-3">
            <div className="skel h-8 w-48 rounded-2xl" />
            <div className="skel h-4 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  return (
    <>

      <div className="dm bg-[#fafafa] min-h-screen">

        {/* ── Cover / Hero ── */}
        <div className="a0 cover-pattern relative overflow-hidden" style={{height: '200px'}}>
          {/* Decorative blobs */}
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-white/[.03] blur-2xl" />
          <div className="absolute bottom-0 left-1/3 w-48 h-24 rounded-full bg-white/[.02] blur-3xl" />

          {/* Back button */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 pt-5">
            <button onClick={() => router.back()}
              className="flex items-center gap-2 text-white/35 hover:text-white/70 text-[12px] font-medium transition-colors">
              <ArrowLeft size={13} /> Back
            </button>
          </div>

          {/* Floating membership badge */}
          <div className="float-badge absolute bottom-4 right-8 hidden sm:flex items-center gap-2 bg-white/8 border border-white/12 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-bold tracking-[.15em] uppercase text-white/60">Member</span>
          </div>
        </div>

        {/* ── Avatar overlapping cover ── */}
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <div className="av relative -mt-14 mb-6 flex items-end justify-between">

            {/* Avatar */}
            <div className="avatar-ring w-[88px] h-[88px] shadow-xl shadow-black/20">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                <span className="cg text-4xl font-bold text-white leading-none select-none">
                  {initial}
                </span>
              </div>
            </div>

            {/* Edit profile button */}
            <Link href="/settings"
              className="flex items-center gap-2 h-9 px-4 bg-white border border-zinc-200 hover:border-zinc-400 rounded-full text-[12px] font-semibold text-zinc-600 hover:text-zinc-900 transition-all shadow-sm mb-1">
              <Edit3 size={12} /> Edit Profile
            </Link>
          </div>

          {/* ── Name & info ── */}
          <div className="a1 mb-8">
            <h1 className="cg text-[2.2rem] font-bold text-zinc-900 leading-tight tracking-tight mb-1">
              {userName}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
              {userEmail && (
                <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
                  <Mail size={12} />
                  <span>{userEmail}</span>
                </div>
              )}
              {userPhone && (
                <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
                  <Phone size={12} />
                  <span>{userPhone}</span>
                </div>
              )}
            </div>

            {/* Member since pill */}
            <div className="mt-3 inline-flex items-center gap-1.5 bg-zinc-100 rounded-full px-3 py-1">
              <Shield size={10} className="text-zinc-400" />
              <span className="text-[10px] font-bold tracking-[.14em] uppercase text-zinc-400">
                Verified Account
              </span>
            </div>
          </div>

          {/* ── Stats grid ── */}
          <div className="a2 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatCard
              icon={Package}
              label="Orders"
              value="—"
              color="bg-zinc-900"
              href="/orders"
            />
            <StatCard
              icon={Heart}
              label="Wishlist"
              value="—"
              color="bg-rose-500"
              href="/wishList"
            />
            <StatCard
              icon={ShoppingBag}
              label="Cart"
              value={numberOfBoughtItems}
              color="bg-blue-500"
              href="/cart"
            />
            <StatCard
              icon={Star}
              label="Reviews"
              value="—"
              color="bg-amber-500"
              href="/orders"
            />
          </div>

          {/* ── Quick links ── */}
          <div className="a3 grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

            {/* Account section */}
            <div className="bg-white border border-zinc-100 rounded-3xl p-2 overflow-hidden">
              <div className="px-4 pt-3 pb-2">
                <p className="text-[10px] font-bold tracking-[.18em] uppercase text-zinc-400">Account</p>
              </div>
              <MenuItem icon={Package}  label="My Orders"   sub="Track and manage orders"     href="/orders" />
              <MenuItem icon={Heart}    label="Wishlist"    sub="Products you've saved"        href="/wishList" />
              <MenuItem icon={ShoppingBag} label="Cart"     sub={`${numberOfBoughtItems} item${numberOfBoughtItems !== 1 ? 's' : ''} in cart`} href="/cart" />
              <MenuItem icon={MapPin}   label="Addresses"   sub="Saved shipping addresses"     href="/settings" />
            </div>

            {/* Preferences section */}
            <div className="bg-white border border-zinc-100 rounded-3xl p-2 overflow-hidden">
              <div className="px-4 pt-3 pb-2">
                <p className="text-[10px] font-bold tracking-[.18em] uppercase text-zinc-400">Preferences</p>
              </div>
              <MenuItem icon={Settings} label="Settings"      sub="Account preferences"          href="/settings" />
              <MenuItem icon={Bell}     label="Notifications" sub="Manage your alerts"            href="/settings" badge="New" />
              <MenuItem icon={CreditCard} label="Payment Methods" sub="Cards & billing info"      href="/settings" />
              <MenuItem icon={Shield}   label="Security"      sub="Password & authentication"     href="/settings" />
            </div>
          </div>

          {/* ── Activity strip ── */}
          <div className="a4 bg-white border border-zinc-100 rounded-3xl p-5 mb-6">
            <p className="text-[10px] font-bold tracking-[.18em] uppercase text-zinc-400 mb-4">Recent Activity</p>
            <div className="grid grid-cols-3 gap-0 divide-x divide-zinc-100">
              {[
                { icon: Clock,         label: 'Pending',   color: 'text-amber-500',  bg: 'bg-amber-50'  },
                { icon: Truck,         label: 'Shipping',  color: 'text-blue-500',   bg: 'bg-blue-50'   },
                { icon: CheckCircle2,  label: 'Delivered', color: 'text-green-500',  bg: 'bg-green-50'  },
              ].map(({ icon: Icon, label, color, bg }) => (
                <div key={label} className="flex flex-col items-center gap-2 py-2 px-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}>
                    <Icon size={16} className={color} />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Danger zone ── */}
          <div className="a4 bg-white border border-zinc-100 rounded-3xl p-2 mb-10">
            <div className="px-4 pt-3 pb-2">
              <p className="text-[10px] font-bold tracking-[.18em] uppercase text-zinc-400">Session</p>
            </div>
            <MenuItem
              icon={LogOut}
              label={loggingOut ? 'Signing out…' : 'Sign Out'}
              sub="End your current session"
              onClick={handleLogout}
              danger
            />
          </div>

        </div>
      </div>
    </>
  )
}