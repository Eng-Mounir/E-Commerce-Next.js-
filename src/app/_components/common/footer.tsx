"use client"

import React from "react"
import Link from "next/link"
import {
  ShoppingBag,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 pt-16 pb-8 px-6 lg:px-16 relative overflow-hidden">
      
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag size={19} className="text-black" />
              </div>
              <div>
                <p className="text-white text-xl font-bold tracking-tight leading-none">
                  ShopMart
                </p>
                <p className="text-white/25 text-[9px] tracking-[.2em] uppercase font-medium mt-0.5">
                  Premium Commerce
                </p>
              </div>
            </div>

            <p className="text-white/35 text-sm leading-relaxed font-light max-w-xs">
              Your one-stop destination for premium technology, fashion,
              and lifestyle products.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-white/8 hover:bg-white/15 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Icon size={15} className="text-white/50" />
                </button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {[
            {
              title: "Shop",
              links: ["New Arrivals", "Best Sellers", "Sale", "All Products", "Gift Cards"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Blog", "Contact"],
            },
            {
              title: "Support",
              links: ["Help Center", "Shipping", "Returns", "Track Order", "Privacy Policy"],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-white text-xs font-bold tracking-[.18em] uppercase mb-5">
                {title}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/35 hover:text-white text-sm font-light transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/8 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2024 ShopMart. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/25 hover:text-white/60 text-xs transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}