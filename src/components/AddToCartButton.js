"use client";

import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({ children, className = "" }) {
  const { openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className={className}
    >
      {children}
    </button>
  );
}
