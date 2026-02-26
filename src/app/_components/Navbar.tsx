"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
      return pathname === href;
    };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left - Logo */}
        <div className="text-2xl font-bold text-blue-600">
          Next
        </div>

        {/* Right - Navigation Links */}
        <div className="flex gap-8">
          <Link href="/" className={`transition ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>
            Home
          </Link>
          <Link href="/about" className={`transition ${isActive('/about') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>
            About
          </Link>
          <Link href="/categories" className={`transition ${isActive('/categories/men') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>
            Categories
          </Link>
          <Link href="/products" className={`transition ${isActive('/products') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>
            Products
          </Link>
        </div>
      </div>
    </nav>
  )
}
