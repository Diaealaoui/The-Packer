import React from 'react';
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/checkout/CheckoutForm";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [_, navigate] = useLocation();
  
  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);
  
  return (
    <section className="py-12 border-t border-neutral-200 bg-neutral-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>
        <CheckoutForm />
      </div>
    </section>
  );
};

export default CheckoutPage;
