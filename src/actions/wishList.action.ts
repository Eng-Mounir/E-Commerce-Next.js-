"use server";

import { getToken } from "@/lib/auth";

export interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand?: { name: string };
  category?: { name: string };
}

/* ── GET wishlist ── */
export async function getWishlist(): Promise<WishlistProduct[]> {
  const token = await getToken();
  if (!token) return [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}wishlist`, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  const data = await res.json();
  return data?.status === "success" ? data.data : [];
}

/* ── ADD to wishlist ── */
export async function addToWishlist(productId: string): Promise<boolean> {
  const token = await getToken();
  if (!token) return false;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}wishlist`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  return data?.status === "success";
}

/* ── REMOVE from wishlist ── */
export async function removeFromWishlist(productId: string): Promise<boolean> {
  const token = await getToken();
  if (!token) return false;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}wishlist/${productId}`, {
    method: "DELETE",
    headers: { token },
  });

  const data = await res.json();
  return data?.status === "success";
}