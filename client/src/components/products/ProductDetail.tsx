import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../hooks/use_toast";
import { Star, StarHalf, Truck, RotateCcw, Shield } from "../../lib/icons";
import { Product } from "@shared/schema";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,s,
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      imageUrl: product.imageUrl || "",
      quantity,
      variant: `${selectedColor}`,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to checkout
    window.location.href = "/checkout";
  };
  
  return (
    <div className="md:flex -mx-4">
      {/* Product Images */}
      <div className="md:w-1/2 px-4 mb-6 md:mb-0">
        <div className="sticky top-24">
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl || ""} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button className="border-2 border-primary rounded-md overflow-hidden">
              <img 
                src={product.imageUrl || ""} 
                alt={product.name} 
                className="w-full h-24 object-cover"
              />
            </button>
            <button className="border-2 border-neutral-200 rounded-md overflow-hidden hover:border-neutral-400 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1599669454699-e2ba1b0b61ba" 
                alt={`${product.name} Side View`} 
                className="w-full h-24 object-cover"
              />
            </button>
            <button className="border-2 border-neutral-200 rounded-md overflow-hidden hover:border-neutral-400 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1" 
                alt={`${product.name} Close-up`} 
                className="w-full h-24 object-cover"
              />
            </button>
            <button className="border-2 border-neutral-200 rounded-md overflow-hidden hover:border-neutral-400 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1484704849700-f032a568e944" 
                alt={`${product.name} In Use`} 
                className="w-full h-24 object-cover"
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="md:w-1/2 px-4">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center mb-4">
          <div className="flex text-secondary">
            <Star className="h-5 w-5" />
            <Star className="h-5 w-5" />
            <Star className="h-5 w-5" />
            <Star className="h-5 w-5" />
            <StarHalf className="h-5 w-5" />
          </div>
          <span className="text-sm text-neutral-500 ml-2">4.5 (28 reviews)</span>
        </div>
        
        <div className="mb-6">
          {product.isSale && product.originalPrice ? (
            <div className="flex items-center">
              <span className="text-3xl font-bold text-neutral-800">
                ${parseFloat(product.price.toString()).toFixed(2)}
              </span>
              <span className="text-lg text-neutral-500 line-through ml-3">
                ${parseFloat(product.originalPrice.toString()).toFixed(2)}
              </span>
              <span className="ml-3 text-sm text-green-600">
                {Math.round((1 - parseFloat(product.price.toString()) / parseFloat(product.originalPrice.toString())) * 100)}% OFF
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-neutral-800">
              ${parseFloat(product.price.toString()).toFixed(2)}
            </span>
          )}
          <span className="text-sm text-green-600 ml-2">In Stock</span>
        </div>
        
        <div className="mb-6">
          <p className="text-neutral-600 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Color</h3>
          <div className="flex space-x-3">
            <button 
              className={`bg-black w-8 h-8 rounded-full border-2 ${selectedColor === 'Black' ? 'border-primary' : 'border-neutral-300 hover:border-neutral-400'} transition-colors`}
              onClick={() => setSelectedColor('Black')}
            ></button>
            <button 
              className={`bg-white w-8 h-8 rounded-full border-2 ${selectedColor === 'White' ? 'border-primary' : 'border-neutral-300 hover:border-neutral-400'} transition-colors`}
              onClick={() => setSelectedColor('White')}
            ></button>
            <button 
              className={`bg-blue-600 w-8 h-8 rounded-full border-2 ${selectedColor === 'Blue' ? 'border-primary' : 'border-neutral-300 hover:border-neutral-400'} transition-colors`}
              onClick={() => setSelectedColor('Blue')}
            ></button>
            <button 
              className={`bg-red-600 w-8 h-8 rounded-full border-2 ${selectedColor === 'Red' ? 'border-primary' : 'border-neutral-300 hover:border-neutral-400'} transition-colors`}
              onClick={() => setSelectedColor('Red')}
            ></button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Quantity</h3>
          <div className="flex items-center w-32 border rounded">
            <button 
              className="px-4 py-2 hover:bg-neutral-100"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="px-4 py-2 border-x flex-1 text-center">{quantity}</span>
            <button 
              className="px-4 py-2 hover:bg-neutral-100"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
          <button 
            className="flex-1 bg-secondary text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <button 
            className="flex-1 bg-primary text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        
        <div className="border-t border-neutral-200 pt-6 space-y-4">
          <div className="flex items-start">
            <Truck className="text-primary mt-1 mr-3" />
            <div>
              <h4 className="font-medium">Free Shipping</h4>
              <p className="text-sm text-neutral-500">Free standard shipping on orders over $50</p>
            </div>
          </div>
          <div className="flex items-start">
            <RotateCcw className="text-primary mt-1 mr-3" />
            <div>
              <h4 className="font-medium">Easy Returns</h4>
              <p className="text-sm text-neutral-500">30-day return policy for unused items</p>
            </div>
          </div>
          <div className="flex items-start">
            <Shield className="text-primary mt-1 mr-3" />
            <div>
              <h4 className="font-medium">Secure Payments</h4>
              <p className="text-sm text-neutral-500">Your payment information is processed securely</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
