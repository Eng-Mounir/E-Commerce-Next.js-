"use server";

import { Cart } from "@/app/interfaces/cart";
import { getToken } from "@/lib/auth";


export async function addToCart(productId: string): Promise<{ success: boolean; numOfCartItems?: number }> {
  const token = await getToken();
  if (!token) return { success: false };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cart`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  return data?.status === "success"
    ? { success: true, numOfCartItems: data.numOfCartItems }
    : { success: false };
}


export async function getLoggedUserCart(): Promise<Cart | null> {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cart`, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  const data = await res.json();
  return data?.status === "success" ? data.data : null;
}


export async function removeCartItem(
  productId: string
): Promise<Cart | null> {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}cart/${productId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );

  const data = await res.json();
  return data?.status === "success" ? data.data : null;
}


export async function clearUserCart(): Promise<boolean> {
  const token = await getToken();
  if (!token) return false;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cart`, {
    method: "DELETE",
    headers: { token },
  });

  const data = await res.json();
  return data?.message === "success";
}


export async function updateCartQuantity(
  productId: string,
  count: number
): Promise<Cart | null> {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    }
  );

  const data = await res.json();
  return data?.status === "success" ? data.data : null;
}