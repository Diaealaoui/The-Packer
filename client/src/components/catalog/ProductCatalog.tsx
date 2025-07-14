import React, { useState, useEffect } from 'react';

// Import all images statically at the top of the file
import boiteBurgerImage from '../../pics/boite burger.jpeg';
import boiteDoubleBurgerImage from '../../pics/boite double burger.jpeg';
import boiteSandwichImage from '../../pics/boite sandwich.jpeg';
import lunchBoxSmallImage from '../../pics/lunch box small.jpeg';
import lunchBoxMediumImage from '../../pics/lunch box medium.jpeg'; // Re-added
import lunchBoxLargeImage from '../../pics/lunch box large.jpeg';   // Re-added
import potANouilleSmallImage from '../../pics/pot a nouille small.jpeg';
import potANouilleMediumImage from '../../pics/pot a nouille medium.jpeg'; // Re-added
import potANouilleLargeImage from '../../pics/pot a nouille large.jpeg';   // Re-added
import potAfriteImage from '../../pics/pot a frite.jpeg';
import barquetteLargeImage from '../../pics/BARQUETTE RECTANGULAIRE large.jpeg';
import barquetteMediumImage from '../../pics/BARQUETTE RECTANGULAIRE medium.jpeg';
import barquettePetitImage from '../../pics/BARQUETTE RECTANGULAIRE petit.jpeg';
import supportHotDogImage from '../../pics/support hot dog.jpeg';
import supportGauffreImage from '../../pics/support gauffre balnc.jpeg';
import porteCrepeImage from '../../pics/porte crepe.jpeg';
import porteCrepe2Image from '../../pics/porte crepe.png';
import boiteSushiImage from '../../pics/boite sushi.png';
// The following images are not used in product data, but kept as they were in original imports:
import designImage from '../../pics/design.jpeg';
import design2Image from '../../pics/design2.jpeg';
import design3Image from '../../pics/design3.jpeg';
import design4Image from '../../pics/design4.jpeg';
import design5Image from '../../pics/design5.jpeg';
import homepageImage from '../../pics/homepage.jpeg';

// Import X icon for the modal close button
import { X } from '../../lib/icons';

const ProductCatalog = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State to manage expandable image

  // All products from PDF catalog with exact specifications
  const allProducts = [
    // BOÎTES BURGER & SANDWICH
    {
      id: 1,
      name: "Boîte Burger",
      reference: "BB1W / BB1K",
      dimensions: "115 x 115 x 85 mm",
      color: "Blanc / Kraft Brun",
      quantity: "550",
      category: "burger",
      image: boiteBurgerImage,
    },
    {
      id: 2,
      name: "Boîte Double Burger",
      reference: "BS1K",
      dimensions: "193 x 110 x 72 mm",
      color: "Kraft Brun",
      quantity: "280",
      category: "burger",
      image: boiteDoubleBurgerImage,
    },
    {
      id: 3,
      name: "Boîte Sandwich",
      reference: "BS2K",
      dimensions: "220 x 120 x 70 mm",
      color: "Kraft Brun",
      quantity: "550",
      category: "burger",
      image: boiteSandwichImage,
    },

    // LUNCH BOX - Now using specific images where provided
    {
      id: 4,
      name: "Lunch Box",
      reference: "BR1W / BR1K",
      dimensions: "108 x 90 x 55 mm", // Small
      color: "Blanc / Kraft Brun",
      quantity: "720",
      category: "lunchbox",
      image: lunchBoxSmallImage,
    },
    {
      id: 5,
      name: "Lunch Box",
      reference: "BR2W / BR2K",
      dimensions: "130 x 105 x 60 mm", // Medium
      color: "Blanc / Kraft Brun",
      quantity: "750",
      category: "lunchbox",
      image: lunchBoxMediumImage, // Using specific medium image
    },
    {
      id: 6,
      name: "Lunch Box",
      reference: "BR3W / BR3K",
      dimensions: "195 x 140 x 50 mm", // Large
      color: "Blanc / Kraft Brun",
      quantity: "250",
      category: "lunchbox",
      image: lunchBoxLargeImage, // Using specific large image
    },

    // POTS À NOUILLE - Now using specific images where provided
    {
      id: 7,
      name: "Pot à Nouille",
      reference: "P1W / P1K",
      dimensions: "65 x 52 x 93 mm", // Small
      color: "Blanc / Kraft Brun",
      quantity: "750",
      category: "pots",
      image: potANouilleSmallImage,
    },
    {
      id: 8,
      name: "Pot à Nouille",
      reference: "P2W / P2K",
      dimensions: "81 x 69 x 100 mm", // Medium
      color: "Blanc / Kraft Brun",
      quantity: "320",
      category: "pots",
      image: potANouilleMediumImage, // Using specific medium image
    },
    {
      id: 9, // Re-indexed to avoid conflict with Pot à Frite
      name: "Pot à Nouille",
      reference: "P3W / P3K", // Assuming a large size reference exists
      dimensions: "90 x 75 x 120 mm", // Large (example dimension)
      color: "Blanc / Kraft Brun",
      quantity: "250", // Example quantity
      category: "pots",
      image: potANouilleLargeImage, // Using specific large image
    },

    // POT À FRITE (Original ID 9, now ID 10 to avoid conflict with new Pot à Nouille)
    {
      id: 10,
      name: "Pot à Frite",
      reference: "BF1W / BF1K",
      dimensions: "105 x 65 x 40 mm",
      color: "Blanc / Kraft Brun",
      quantity: "800 / 960",
      category: "pots",
      image: potAfriteImage,
    },

    // BARQUETTES RECTANGULAIRES - Using specific images based on dimensions
    {
      id: 11,
      name: "Barquette Rectangulaire",
      reference: "B1W / B1K",
      dimensions: "115 x 85 x 44 mm", // Petit
      color: "Blanc / Kraft Brun",
      quantity: "1000",
      category: "barquettes",
      image: barquettePetitImage,
    },
    {
      id: 12,
      name: "Barquette Rectangulaire",
      reference: "B2W / B2K",
      dimensions: "170 x 95 x 60 mm", // Medium
      color: "Blanc / Kraft Brun",
      quantity: "600",
      category: "barquettes",
      image: barquetteLargeImage,
    },
    {
      id: 13,
      name: "Barquette Rectangulaire",
      reference: "B3W / B3K",
      dimensions: "155 x 90 x 35 mm", // Closer to petit/small
      color: "Blanc / Kraft Brun",
      quantity: "800",
      category: "barquettes",
      image: barquetteMediumImage,
    },

    // SUPPORTS HOT DOG
    {
      id: 14,
      name: "Support Hot Dog",
      reference: "PS1W / PS1K",
      dimensions: "260 x 67 x 68 mm",
      color: "Blanc / Kraft Brun",
      quantity: "1500",
      category: "supports",
      image: supportHotDogImage,
    },
    {
      id: 15,
      name: "Support Hot Dog",
      reference: "PS2W / PS2K",
      dimensions: "160 x 50 x 35 mm",
      color: "Blanc / Kraft Brun",
      quantity: "2000",
      category: "supports",
      image: supportHotDogImage,
    },

    // SUPPORT GAUFFRE
    {
      id: 16,
      name: "Support Gauffre",
      reference: "G1W / G1K",
      dimensions: "160 x 105 x 25 mm",
      color: "Blanc / Kraft Brun",
      quantity: "2100",
      category: "supports",
      image: supportGauffreImage,
    },

    // PORTE CRÊPE
    {
      id: 17,
      name: "Porte Crêpe",
      reference: "PP1W / PP1K",
      dimensions: "220 x 200 x 30 mm",
      color: "Blanc / Kraft Brun",
      quantity: "500",
      category: "crepes",
      image: porteCrepeImage,
    },
    {
      id: 18,
      name: "Porte Crêpe",
      reference: "PP2W / PP2K",
      dimensions: "185 x 82 x 187 mm",
      color: "Blanc / Kraft Brun",
      quantity: "2000",
      category: "crepes",
      image: porteCrepe2Image,
    },

    // BOÎTES SUSHI
    {
      id: 19,
      name: "Boîte Sushi",
      reference: "BB1W / BB1K",
      dimensions: "190 x 70 x 55 mm",
      color: "Blanc / Kraft Brun",
      quantity: "500",
      category: "sushi",
      image: boiteSushiImage,
    },
    {
      id: 20,
      name: "Boîte Sushi",
      reference: "BB2W / BB2K",
      dimensions: "175 x 100 x 55 mm",
      color: "Blanc / Kraft Brun",
      quantity: "500",
      category: "sushi",
      image: boiteSushiImage,
    },
    {
      id: 21,
      name: "Boîte Sushi",
      reference: "BB3W / BB3K",
      dimensions: "190 x 140 x 55 mm",
      color: "Blanc / Kraft Brun",
      quantity: "500",
      category: "sushi",
      image: boiteSushiImage,
    },
    {
      id: 22,
      name: "Boîte Sushi",
      reference: "BB4W / BB4K",
      dimensions: "260 x 180 x 55 mm",
      color: "Blanc / Kraft Brun",
      quantity: "500",
      category: "sushi",
      image: boiteSushiImage,
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les Produits', count: allProducts.length },
    { id: 'burger', name: 'Burger & Sandwich', count: allProducts.filter(p => p.category === 'burger').length },
    { id: 'lunchbox', name: 'Lunch Box', count: allProducts.filter(p => p.category === 'lunchbox').length },
    { id: 'pots', name: 'Pots & Contenants', count: allProducts.filter(p => p.category === 'pots').length },
    { id: 'barquettes', name: 'Barquettes', count: allProducts.filter(p => p.category === 'barquettes').length },
    { id: 'supports', name: 'Supports', count: allProducts.filter(p => p.category === 'supports').length },
    { id: 'crepes', name: 'Porte Crêpes', count: allProducts.filter(p => p.category === 'crepes').length },
    { id: 'sushi', name: 'Boîtes Sushi', count: allProducts.filter(p => p.category === 'sushi').length }
  ];

  // Function to normalize strings for accent-insensitive comparison
  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter;
    
    // Convert search term and product fields to lowercase and normalize for accent-insensitive comparison
    const normalizedSearchTerm = normalizeString(searchTerm.toLowerCase());
    const normalizedProductName = normalizeString(product.name.toLowerCase());
    const normalizedProductReference = normalizeString(product.reference.toLowerCase());

    // Split the normalized search term into individual words and filter out empty strings
    const searchWords = normalizedSearchTerm.split(' ').filter(Boolean);

    // Check if all words from the search term are present in either the product name or reference
    const matchesSearch = searchWords.every(word =>
      normalizedProductName.includes(word) ||
      normalizedProductReference.includes(word)
    );

    return matchesCategory && matchesSearch;
  });

  // Handle image click for expansion
  const handleImageClick = (imageSrc, altText) => {
    setSelectedImage({ src: imageSrc, alt: altText });
  };

  // Handle closing the expanded image modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const ProductCard = ({ product, index, onImageClick }) => (
    <div
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
      style={{
        animationDelay: `${index * 30}ms`,
        animation: 'fadeIn 0.5s ease-out forwards'
      }}
    >
      <div 
        className="relative h-48 bg-gray-50 overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={() => onImageClick(product.image, product.name)} // Pass image data to handler
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Changed to object-cover
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-3">
          {product.name}
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Réf:</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {product.reference}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Dimensions:</span>
            <span className="font-mono text-xs">{product.dimensions}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Couleur:</span>
            <span className="text-xs">{product.color}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-gray-500 font-medium">Qté/Carton:</span>
            <span className="font-bold text-[#008000]">{product.quantity}</span> {/* Changed color */}
          </div>
        </div>
      </div>
    </div>
  );

  // Expandable Image Modal Component
  const ExpandableImageModal = ({ imageSrc, altText, onClose }) => {
    return (
      <div 
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-75 p-4"
        onClick={onClose} // Close when clicking outside the image
      >
        <div 
          className="relative bg-white rounded-lg overflow-hidden max-w-full max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking on the image itself
        >
          <img 
            src={imageSrc} 
            alt={altText} 
            className="max-w-full max-h-full object-contain" 
          />
          <button 
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Catalogue Produits
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète d'emballages alimentaires de haute qualité
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#008000] focus:outline-none" // Changed focus color
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category.id
                    ? 'bg-[#008000] text-white' // Changed background color
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                onImageClick={handleImageClick} // Pass the image click handler
              />
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun product found</p>
            </div>
          )}
        </div>
      </section>

      {/* Render Expandable Image Modal if an image is selected */}
      {selectedImage && (
        <ExpandableImageModal 
          imageSrc={selectedImage.src} 
          altText={selectedImage.alt} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default ProductCatalog;
