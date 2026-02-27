"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  User, Heart, ShoppingBag, Package,
  Settings, LogOut, UserCircle, ChevronDown, ShoppingCart
} from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  const navLinks = [
    { href: '/',           label: 'Home'       },
    { href: '/about',      label: 'About'      },
    { href: '/categories', label: 'Categories' },
    { href: '/products',   label: 'Products'   },
  ]

  const menuItems = [
    { href: '/profile',  label: 'Profile',  sub: 'View your details',   icon: UserCircle, bg: 'bg-violet-50', hbg: 'hover:bg-violet-100', color: 'text-violet-500' },
    { href: '/orders',   label: 'Orders',   sub: 'Track your orders',   icon: Package,    bg: 'bg-blue-50',   hbg: 'hover:bg-blue-100',   color: 'text-blue-500'   },
    { href: '/settings', label: 'Settings', sub: 'Preferences & more',  icon: Settings,   bg: 'bg-amber-50',  hbg: 'hover:bg-amber-100',  color: 'text-amber-500'  },
  ]

  return (
    <>
      <style>{`
        /* ── Navbar slide-in on mount ── */
        @keyframes navIn {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-mount { animation: navIn .5s cubic-bezier(.16,1,.3,1) both; }

        /* ── Logo bounce on mount ── */
        @keyframes logoBounce {
          0%   { opacity:0; transform: scale(0.6) rotate(-10deg); }
          60%  { transform: scale(1.12) rotate(4deg); }
          80%  { transform: scale(0.96) rotate(-2deg); }
          100% { opacity:1; transform: scale(1) rotate(0deg); }
        }
        .logo-bounce { animation: logoBounce .7s cubic-bezier(.16,1,.3,1) .1s both; }

        /* ── Nav links stagger in ── */
        @keyframes linkIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .link-in-1 { animation: linkIn .5s cubic-bezier(.16,1,.3,1) .15s both; }
        .link-in-2 { animation: linkIn .5s cubic-bezier(.16,1,.3,1) .22s both; }
        .link-in-3 { animation: linkIn .5s cubic-bezier(.16,1,.3,1) .29s both; }
        .link-in-4 { animation: linkIn .5s cubic-bezier(.16,1,.3,1) .36s both; }

        /* ── Icon buttons fade in from right ── */
        @keyframes iconIn {
          from { opacity:0; transform: translateX(12px); }
          to   { opacity:1; transform: translateX(0); }
        }
        .icon-in-1 { animation: iconIn .5s cubic-bezier(.16,1,.3,1) .35s both; }
        .icon-in-2 { animation: iconIn .5s cubic-bezier(.16,1,.3,1) .42s both; }
        .icon-in-3 { animation: iconIn .5s cubic-bezier(.16,1,.3,1) .50s both; }

        /* ── Nav link hover underline slide ── */
        .nav-link-wrap { position: relative; }
        .nav-link-wrap::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%; right: 50%;
          height: 2px;
          background: currentColor;
          border-radius: 99px;
          transition: left .2s cubic-bezier(.16,1,.3,1), right .2s cubic-bezier(.16,1,.3,1);
          opacity: 0.3;
        }
        .nav-link-wrap:hover::after { left: 12px; right: 12px; }

        /* ── Cart badge pulse ── */
        @keyframes badgePop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.35); }
          70%  { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .badge-pop { animation: badgePop .4s cubic-bezier(.16,1,.3,1) .6s both; }

        /* ── Heart & cart icon hover bounce ── */
        .icon-bounce { transition: transform .18s cubic-bezier(.16,1,.3,1); }
        .icon-bounce:hover { transform: scale(1.2); }
        .icon-bounce:active { transform: scale(0.9); }

        /* ── Dropdown spring open / snap close ── */
        @keyframes dropIn {
          0%   { opacity:0; transform: translateY(-12px) scale(0.94); }
          60%  { opacity:1; transform: translateY(2px)   scale(1.01); }
          100% { opacity:1; transform: translateY(0)     scale(1);    }
        }
        @keyframes dropOut {
          from { opacity:1; transform: translateY(0)  scale(1);    }
          to   { opacity:0; transform: translateY(-8px) scale(0.95); }
        }
        [data-radix-popper-content-wrapper] [data-state="open"]  { animation: dropIn  .3s cubic-bezier(.16,1,.3,1) forwards; }
        [data-radix-popper-content-wrapper] [data-state="closed"]{ animation: dropOut .2s cubic-bezier(.4,0,1,1)   forwards; }

        /* ── Staggered menu items slide in ── */
        @keyframes itemIn {
          from { opacity:0; transform: translateX(-10px); }
          to   { opacity:1; transform: translateX(0); }
        }
        [data-state="open"] .item-1 { animation: itemIn .25s cubic-bezier(.16,1,.3,1) .05s both; }
        [data-state="open"] .item-2 { animation: itemIn .25s cubic-bezier(.16,1,.3,1) .10s both; }
        [data-state="open"] .item-3 { animation: itemIn .25s cubic-bezier(.16,1,.3,1) .15s both; }
        [data-state="open"] .item-4 { animation: itemIn .25s cubic-bezier(.16,1,.3,1) .20s both; }

        /* ── Dropdown item icon spin on hover ── */
        .item-icon { transition: transform .22s cubic-bezier(.16,1,.3,1); }
        .group:hover .item-icon { transform: rotate(-8deg) scale(1.15); }

        /* ── Chevron rotate ── */
        .chevron { transition: transform .28s cubic-bezier(.16,1,.3,1); }
        .chevron-open  { transform: rotate(180deg); }

        /* ── Account button shimmer on hover ── */
        .acct-btn {
          position: relative; overflow: hidden;
        }
        .acct-btn::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left .4s ease;
        }
        .acct-btn:hover::before { left: 140%; }
      `}</style>

      <nav className="nav-mount sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-16 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="logo-bounce flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-zinc-950 rounded-xl flex items-center justify-center shadow-sm">
              <ShoppingBag size={15} className="text-white" />
            </div>
            <span className="text-[1.1rem] font-bold text-zinc-900 tracking-tight">ShopMart</span>
          </Link>

          {/* ── Nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                className={`link-in-${i + 1} nav-link-wrap text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-150 ${
                  isActive(href)
                    ? 'bg-zinc-950 text-white font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1.5 shrink-0">

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="icon-in-1 icon-bounce w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-rose-500 hover:bg-rose-50 transition-colors duration-150"
            >
              <Heart size={17} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="icon-in-2 icon-bounce relative w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-150"
            >
              <ShoppingCart size={17} />
              <span className="badge-pop absolute -top-0.5 -right-0.5 w-4 h-4 bg-zinc-950 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                3
              </span>
            </Link>

            <div className="w-px h-5 bg-zinc-200 mx-1" />

            {/* Account Dropdown */}
            <div className="icon-in-3">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="acct-btn flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 transition-colors duration-200 rounded-full pl-1.5 pr-3 py-1.5 outline-none">
                    <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                      <User size={13} className="text-white" />
                    </div>
                    <span className="text-[12px] font-semibold text-white/70 hidden sm:block">Account</span>
                    <ChevronDown size={12} className={`chevron text-white/50 ${open ? 'chevron-open' : ''}`} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-64 rounded-3xl border border-zinc-200/60 shadow-xl shadow-zinc-200/60 p-2 mt-2 bg-white/95 backdrop-blur-xl"
                  align="end"
                  sideOffset={6}
                >
                  {/* Header */}
                  <div className="item-1 bg-linear-to-br from-zinc-50 to-zinc-100 border border-zinc-200/70 rounded-2xl px-4 py-3.5 mb-1.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center shrink-0">
                      <User size={17} className="text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-800 leading-none">My Account</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5 font-light">Welcome back 👋</p>
                    </div>
                  </div>

                  <DropdownMenuGroup>
                    {menuItems.map(({ href, label, sub, icon: Icon, bg, hbg, color }, i) => (
                      <DropdownMenuItem key={href} asChild className="rounded-2xl p-0 focus:bg-transparent">
                        <Link
                          href={href}
                          className={`item-${i + 2} flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-zinc-50 transition-colors cursor-pointer w-full group`}
                        >
                          <div className={`item-icon w-8 h-8 rounded-full ${bg} ${hbg} flex items-center justify-center shrink-0 transition-colors`}>
                            <Icon size={15} className={color} />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-zinc-700 leading-none">{label}</p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">{sub}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2 bg-zinc-100" />

                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" className="rounded-2xl p-0 focus:bg-transparent">
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-red-50 transition-colors cursor-pointer w-full group">
                        <div className="item-icon w-8 h-8 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center shrink-0 transition-colors">
                          <LogOut size={15} className="text-red-400" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-red-500 leading-none">Log out</p>
                          <p className="text-[11px] text-red-300 mt-0.5">End your session</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}