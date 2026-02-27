"use server"
import {getToken} from "@/lib/auth";

export async function addToCart(productId: string, quantity: number) {
    const token = await getToken();
  if (!token) {
    throw new Error("No token found. User might not be authenticated.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cart`, {
    method: "POST",
    headers: {
      "token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId : productId, quantity : quantity }),
  });

  const data = await response.json();
  console.log("Add to Cart Response:", data);
  return data;
}