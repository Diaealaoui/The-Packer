import React from 'react';
import { Home, ChevronRight } from "../lib/icons";
import ProductCatalog from "../components/catalog/ProductCatalog";

const CatalogPage = () => {
  return (
    <div className="py-12 border-t border-neutral-200">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-6">
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
            <li className="text-neutral-800 font-medium">Catalogue Produits</li>
          </ol>
        </nav>

        {/* Catalog Component */}
        <ProductCatalog />
      </div>
    </div>
  );
};

export default CatalogPage;