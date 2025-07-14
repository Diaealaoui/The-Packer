import { useState } from "react";
import { Link } from "wouter";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../hooks/use_toast";
import { Heart, Star, StarHalf } from "../../lib/icons";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      imageUrl: product.imageUrl || "",
      quantity: 1,
      variant: "Default",
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };
  
  // Render price display based on whether product is on sale
  const renderPrice = () => {
    if (product.isSale && product.originalPrice) {
      return (
        <div>
          <span className="font-bold text-lg">${parseFloat(product.price.toString()).toFixed(2)}</span>
          <span className="text-sm text-neutral-500 line-through ml-2">
            ${parseFloat(product.originalPrice.toString()).toFixed(2)}
          </span>
        </div>
      );
    }
    
    return <span className="font-bold text-lg">${parseFloat(product.price.toString()).toFixed(2)}</span>;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <img 
            src={product.imageUrl || ""} 
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
        </Link>
        <button 
          className={`absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:bg-neutral-100 transition-colors ${isWishlisted ? 'text-red-500' : 'text-neutral-600'}`}
          onClick={handleToggleWishlist}
        >
          <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </div>
        )}
        
        {product.isSale && (
          <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex text-secondary">
            <Star className="h-4 w-4" />
            <Star className="h-4 w-4" />
            <Star className="h-4 w-4" />
            <Star className="h-4 w-4" />
            <StarHalf className="h-4 w-4" />
          </div>
          <span className="text-sm text-neutral-500 ml-2">4.5 (28)</span>
        </div>
        <div className="flex justify-between items-center">
          {renderPrice()}
          <button 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
