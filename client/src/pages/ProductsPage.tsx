import React from 'react';
import { Home, ChevronRight } from "../lib/icons";
import ProductCatalog from "../components/catalog/ProductCatalog";

const ProductsPage = () => {
  return (
    <div className="border-t border-neutral-200">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="text-neutral-500 hover:text-primary" aria-label="Home">
                  <Home className="h-4 w-4" />
                </a>
              </li>
              <li>
                <span className="text-neutral-500 mx-2">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </li>
              <li className="text-neutral-800 font-medium">Produits</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Catalog */}
      <ProductCatalog />
    </div>
  );
};

export default ProductsPage;