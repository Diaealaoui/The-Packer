import React from 'react';
import { useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { X } from "../../lib/icons";

const ShoppingCart = () => {
  const { isCartOpen, toggleCart, cartItems, calculateCartTotals } = useCart();
  const { subtotal, shipping, total } = calculateCartTotals();

  // Close cart when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isCartOpen && target.classList.contains('cart-overlay')) {
        toggleCart();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isCartOpen, toggleCart]);

  return (
    <div 
      className={`fixed inset-0 z-50 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      style={{ visibility: isCartOpen ? 'visible' : 'hidden' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 cart-overlay"></div>
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart ({cartItems.length})</h2>
          <button 
            className="text-neutral-500 hover:text-neutral-800" 
            onClick={toggleCart}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-500 mb-4">Your cart is empty</p>
              <button 
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
                onClick={toggleCart}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <button 
                className="w-full bg-secondary text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                onClick={toggleCart}
              >
                Proceed to Checkout
              </button>
            </Link>
            <button 
              className="w-full border border-neutral-300 py-3 rounded-md font-medium hover:bg-neutral-100 transition-colors"
              onClick={toggleCart}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
