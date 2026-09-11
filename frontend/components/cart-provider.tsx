"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/lib/types";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;

  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  quantityOf: (productId: string) => number;

  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  hydrated: boolean;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const STORAGE_KEY = "grove-cart";

const FREE_DELIVERY_THRESHOLD = 45;
const DELIVERY_FEE = 4.5;
const MAX_QUANTITY = 12;

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /*
   * Load cart
   */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  /*
   * Save cart
   *
   * Important:
   * We only save after hydration.
   */
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [items, hydrated]);

  /*
   * Add
   */
  const addToCart = (product: Product) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  MAX_QUANTITY
                ),
              }
            : item
        );
      }

      return [
        ...current,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  /*
   * Decrease
   */
  const decreaseQuantity = (productId: string) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.product.id !== productId) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [
          {
            ...item,
            quantity: item.quantity - 1,
          },
        ];
      })
    );
  };

  /*
   * Remove
   */
  const removeFromCart = (productId: string) => {
    setItems((current) =>
      current.filter(
        (item) => item.product.id !== productId
      )
    );
  };

  /*
   * Clear
   */
  const clearCart = () => {
    setItems([]);
  };

  /*
   * Quantity
   */
  const quantityOf = (productId: string) => {
    const item = items.find(
      (item) => item.product.id === productId
    );

    return item?.quantity ?? 0;
  };

  /*
   * Calculations
   */
  const count = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );
  }, [items]);

  const delivery = useMemo(() => {
    if (count === 0) {
      return 0;
    }

    if (subtotal >= FREE_DELIVERY_THRESHOLD) {
      return 0;
    }

    return DELIVERY_FEE;
  }, [count, subtotal]);

  const total = subtotal + delivery;

  const value: CartContextType = {
    items,
    count,
    subtotal,
    delivery,
    total,

    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,

    quantityOf,

    isOpen,
    setIsOpen,

    hydrated,
  };


  console.log("CART PROVIDER MOUNT");
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}