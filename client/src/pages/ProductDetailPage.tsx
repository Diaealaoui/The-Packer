import React from 'react';
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../components/ui/skeleton";
import { Home, ChevronRight } from "../lib/icons";
import ProductDetail from "../components/products/ProductDetail";
import { Product, Category } from "@shared/schema";

const ProductDetailPage = () => {
  const { slug } = useParams();
  
  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Find category
  const category = categories?.find(c => product?.categoryId === c.id);
  
  return (
    <div className="py-12 border-t border-neutral-200">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-neutral-500 hover:text-primary">
                <Home className="h-4 w-4" />
              </a>
            </li>
            <li>
              <span className="text-neutral-500 mx-2">
                <ChevronRight className="h-4 w-4" />
              </span>
            </li>
            <li>
              <a href="/products" className="text-neutral-500 hover:text-primary">
                Products
              </a>
            </li>
            
            {category && (
              <>
                <li><span className="text-neutral-500 mx-2"><ChevronRight className="h-4 w-4" /></span></li>
                <li>
                  <a href={`/products?category=${category.slug}`} className="text-neutral-500 hover:text-primary">
                    {category.name}
                  </a>
                </li>
              </>
            )}
            
            <li><span className="text-neutral-500 mx-2"><ChevronRight className="h-4 w-4" /></span></li>
            <li className="text-neutral-800 font-medium">
              {productLoading ? <Skeleton className="h-4 w-32" /> : product?.name}
            </li>
          </ol>
        </nav>
        
        {/* Product Detail */}
        {productLoading ? (
          <div className="md:flex -mx-4">
            <div className="md:w-1/2 px-4 mb-6 md:mb-0">
              <Skeleton className="w-full h-96 mb-4" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-full h-24" />
                ))}
              </div>
            </div>
            <div className="md:w-1/2 px-4">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-8 w-1/3 mb-6" />
              <Skeleton className="h-24 w-full mb-6" />
              <Skeleton className="h-8 w-1/4 mb-4" />
              <div className="flex space-x-3 mb-6">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-8 h-8 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-12 w-full mb-6" />
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
              </div>
            </div>
          </div>
        ) : product ? (
          <ProductDetail product={product} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-neutral-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <a href="/products" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors">
              Browse Products
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
