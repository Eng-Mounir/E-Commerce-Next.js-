"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { NavigationMenu, NavigationMenuItem } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Heart } from 'lucide-react'
export default function Navbar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
      return pathname === href;
    };

  return (
    <nav className="bg-[#f5f5f5e5] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left - Logo */}
        <div className="nav-logo text-2xl font-bold text-black flex items-center gap-3">
          <Avatar className='rounded-lg'>
      <AvatarFallback className='rounded-lg bg-black text-white'>CN</AvatarFallback>
    </Avatar>
          <Link href="/">ShopMart</Link>
        </div>

        {/*  Navigation Links */}
        <div className="nav-links flex gap-8">
          <NavigationMenu className='gap-3'>
            <NavigationMenuItem>
              <Link href="/" className={`px-3 py-2 rounded transition ${isActive('/') ? 'bg-black text-white font-semibold' : 'text-gray-700 hover:bg-black hover:text-white'}`}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" className={`px-3 py-2 rounded transition ${isActive('/about') ? 'bg-black text-white font-semibold' : 'text-gray-700 hover:bg-black hover:text-white'}`}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/categories" className={`px-3 py-2 rounded transition ${isActive('/categories/men') ? 'bg-black text-white font-semibold' : 'text-gray-700 hover:bg-black hover:text-white'}`}>
                Categories
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products" className={`px-3 py-2 rounded transition ${isActive('/products') ? 'bg-black text-white font-semibold' : 'text-gray-700 hover:bg-black hover:text-white'}`}>
                Products
              </Link>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      
        {/* Right - Navigation actions */}
        <div className="nav-action flex items-center gap-4">
          {/* Wishlist Icon */}
          <Link href="/wishlist" className="text-gray-700 hover:text-black transition">
            <Heart size={24} />
          </Link>
          
          {/* User Dropdown */}
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarFallback><User className='size-6' /></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/orders">Orders</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
