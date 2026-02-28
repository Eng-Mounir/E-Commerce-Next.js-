"use server";

import { getToken } from "@/lib/auth";

export interface OrderItem {
  count: number;
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
    brand?: { name: string };
    category?: { name: string };
  };
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  user: { _id: string; name: string; email: string; phone?: string };
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethodType: "cash" | "card";
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
}

/* ── Helper: extract array from any response shape ── */
function extractArray(data: any): Order[] {
  if (!data) return []
  if (Array.isArray(data)) return data              // bare array
  if (Array.isArray(data.data)) return data.data    // { data: [...] }
  if (Array.isArray(data.orders)) return data.orders // { orders: [...] }
  if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
    return [data.data]                               // single order wrapped in data
  }
  console.log('[orders.action] unexpected shape:', JSON.stringify(data).slice(0, 200))
  return []
}

/* ── Cash order ── */
export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress
): Promise<Order | null> {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_V2}orders/${cartId}`,
    {
      method: "POST",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress }),
    }
  );

  const data = await res.json();
  console.log('[createCashOrder] response:', JSON.stringify(data).slice(0, 300))
  return data?.status === "success" ? (data.data ?? data) : null;
}

/* ── Stripe checkout session ── */
export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddress
): Promise<string | null> {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}orders/checkout-session/${cartId}`,
    {
      method: "POST",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress }),
    }
  );

  const data = await res.json();
  console.log('[createCheckoutSession] response:', JSON.stringify(data).slice(0, 300))
  return data?.session?.url ?? data?.url ?? null;
}

/* ── Get all orders ── */
export async function getAllOrders(): Promise<Order[]> {
  const token = await getToken();
  if (!token) return [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}orders`, {
    headers: { token },
    cache: "no-store",
  });

  const data = await res.json();
  console.log('[getAllOrders] raw keys:', Object.keys(data ?? {}), '| status:', data?.status, '| count:', data?.results ?? data?.length)
  return extractArray(data);
}

/* ── Get user orders ── */
export async function getUserOrders(userId: string): Promise<Order[]> {
  const token = await getToken();
  if (!token) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}orders/user/${userId}`,
    {
      headers: { token },
      cache: "no-store",
    }
  );

  const data = await res.json();
  console.log('[getUserOrders] raw keys:', Object.keys(data ?? {}), '| status:', data?.status)
  return extractArray(data);
}

/* ── Get single order ── */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}orders/${orderId}`,
    {
      headers: { token },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data?.data ?? data ?? null;
}