"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);

const PRODUCT = {
  name: "RUVVI Mint",
  detail: "15 pouches per tin",
  priceOriginal: 49.99,
  priceSale: 34.99,
  subscription: true,
};

const FREE_SHIPPING_THRESHOLD = 50;

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function CartDrawer({ open, onClose, qty, setQty }) {
  const subtotal = PRODUCT.priceSale * qty;
  const discount = (PRODUCT.priceOriginal - PRODUCT.priceSale) * qty;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:max-w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-foreground">
            Your Cart ({qty})
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-3">
          <p className="text-center text-xs font-semibold text-foreground">
            {freeShipping ? (
              <span className="text-accent-dark">You&apos;ve unlocked FREE SHIPPING!</span>
            ) : (
              <>Add <span className="text-accent-dark">${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}</span> more for free shipping</>
            )}
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-accent-dark transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {qty > 0 && (
            <div className="rounded-2xl bg-sage p-4">
              <p className="text-xs font-semibold text-accent-dark">
                Saving with monthly subscription
              </p>

              <div className="mt-3 flex gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white">
                  <svg className="h-8 w-8 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                </div>

                <div className="flex flex-1 flex-col">
                  <p className="font-display text-sm font-bold text-foreground">
                    {PRODUCT.name}
                  </p>
                  <p className="text-xs text-muted">{PRODUCT.detail}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">
                      ${PRODUCT.priceSale.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted line-through">
                      ${PRODUCT.priceOriginal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center rounded-full border border-gray-200 bg-white">
                  <button
                    onClick={() => setQty(Math.max(0, qty - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark"
                    aria-label="Decrease quantity"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-foreground">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark"
                    aria-label="Increase quantity"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  </button>
                </div>

                <button
                  onClick={() => setQty(0)}
                  className="text-xs font-medium text-muted hover:text-red-500 focus:outline-none"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {qty === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <svg className="h-12 w-12 text-muted/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p className="mt-4 font-display text-sm font-bold text-foreground">
                Your cart is empty
              </p>
              <p className="mt-1 text-xs text-muted">
                Add RUVVI to your cart to get started.
              </p>
            </div>
          )}
        </div>

        {qty > 0 && (
          <div className="border-t border-gray-100 px-6 py-5">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-foreground">
                  ${(PRODUCT.priceOriginal * qty).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Discount</span>
                <span className="font-medium text-accent-dark">
                  -${discount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className={`font-medium ${freeShipping ? "text-accent-dark" : "text-foreground"}`}>
                  {freeShipping ? "FREE" : "$4.99"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Taxes</span>
                <span className="text-muted text-xs">Calculated at checkout</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-bold text-foreground">
                  Subtotal
                </span>
                <span className="rounded-full bg-accent/30 px-2 py-0.5 text-xs font-bold text-accent-dark">
                  {Math.round(((PRODUCT.priceOriginal - PRODUCT.priceSale) / PRODUCT.priceOriginal) * 100)}% Off
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted line-through">
                  ${(PRODUCT.priceOriginal * qty).toFixed(2)}
                </span>
                <span className="font-display text-lg font-bold text-foreground">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-foreground bg-foreground px-6 py-4 text-sm font-bold text-white transition-all hover:bg-foreground/90 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Secure Checkout
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.8 stars
              </span>
              <span>Cancel anytime</span>
              <span>30-day guarantee</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function CartProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(0);

  const openCart = useCallback(() => {
    if (qty === 0) setQty(1);
    setOpen(true);
  }, [qty]);

  const closeCart = useCallback(() => setOpen(false), []);

  return (
    <CartContext.Provider value={{ open, openCart, closeCart, qty, setQty }}>
      {children}
      <CartDrawer open={open} onClose={closeCart} qty={qty} setQty={setQty} />
    </CartContext.Provider>
  );
}
