import { useState } from "react";
import { Link } from "wouter";
import { useCart } from "../../context/CartContext";
import { Trash } from "../../lib/icons";
import { CartItemType } from "../../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateCartItemQuantity, removeCartItem } = useCart();

  const handleIncrement = () => {
    updateCartItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeCartItem(item.id);
  };

  return (
    <div className="flex border-b pb-4">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded"
      />
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <Link href={`/products/${item.slug}`}>
            <h3 className="font-medium hover:text-primary transition-colors">{item.name}</h3>
          </Link>
          <button 
            className="text-neutral-400 hover:text-red-500 transition-colors" 
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-neutral-500">{item.variant}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded">
            <button 
              className="px-2 py-1 hover:bg-neutral-100" 
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="px-2 py-1">{item.quantity}</span>
            <button 
              className="px-2 py-1 hover:bg-neutral-100" 
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <span className="font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
