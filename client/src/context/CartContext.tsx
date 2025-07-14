import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItemType {
  id: number;
  name: string;
  slug: string;
  price: string;
  imageUrl: string;
  quantity: number;
  variant: string;
}

interface CartContextType {
  isCartOpen: boolean;
  toggleCart: () => void;
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
  calculateCartTotals: () => { subtotal: number; shipping: number; total: number };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    // Load cart items from localStorage if available
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  
  // Save cart items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const addToCart = (item: CartItemType) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(prevItem => 
        prevItem.id === item.id && prevItem.variant === item.variant
      );
      
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // If item doesn't exist, add it to cart
        return [...prevItems, item];
      }
    });
  };
  
  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const removeCartItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const calculateCartTotals = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    
    // Free shipping on orders over $50, otherwise $9.99
    const shipping = subtotal > 50 ? 0 : 9.99;
    
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
  };
  
  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
        calculateCartTotals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
