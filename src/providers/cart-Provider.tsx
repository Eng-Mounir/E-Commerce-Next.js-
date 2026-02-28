"use client";

import React, { createContext, useEffect, useState } from "react";
import { getLoggedUserCart } from "@/actions/cart.action";

interface CartContextI {
  numberOfBoughtItems: number;
  setNumberOfBoughtItems: React.Dispatch<React.SetStateAction<number>>;
  getNumberOfBoughtItems: () => Promise<void>;
}

// Provide a safe default so useContext never returns null
export const cartContext = createContext<CartContextI>({
  numberOfBoughtItems: 0,
  setNumberOfBoughtItems: () => {},
  getNumberOfBoughtItems: async () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numberOfBoughtItems, setNumberOfBoughtItems] = useState(0);

  async function getNumberOfBoughtItems() {
    try {
      const data = await getLoggedUserCart();

      // Cart items use `count`, not `quantity`
      const totalItems =
        data?.products?.reduce(
          (total: number, item: { count: number }) => total + item.count,
          0
        ) ?? 0;

      setNumberOfBoughtItems(totalItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setNumberOfBoughtItems(0);
    }
  }

  useEffect(() => {
    getNumberOfBoughtItems();
  }, []);

  return (
    <cartContext.Provider
      value={{
        numberOfBoughtItems,
        setNumberOfBoughtItems,
        getNumberOfBoughtItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}