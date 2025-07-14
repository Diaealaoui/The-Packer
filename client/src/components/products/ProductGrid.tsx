import React from 'react';
import ProductCard from "./ProductCard";
import { Product } from "@shared/schema";

interface ProductGridProps {
  products: Product[];
  title: string;
  viewAllLink?: string;
}

const ProductGrid = ({ products, title, viewAllLink }: ProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-neutral-500">No products found.</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-primary hover:underline font-medium">
            View All
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
