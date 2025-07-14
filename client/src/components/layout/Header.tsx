import React from 'react';
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "../../lib/icons";
import logoImage from '../../pics/logositweb.jpeg'; 

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-20 h-20 mr-4 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={logoImage} 
                alt="The Packer Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-3xl font-bold text-gray-900 group-hover:text-[#d5b59c] transition-colors duration-300">
                The Packer
              </span>
              <div className="text-sm text-gray-500 font-medium">
                Emballage Durable
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/">
              <span className={`font-medium transition-all duration-300 hover:text-[#d5b59c] hover:scale-105 ${
                location === '/' ? 'text-[#d5b59c] border-b-2 border-[#d5b59c] pb-1' : 'text-gray-700'
              }`}>
                Accueil
              </span>
            </Link>
            
            <Link href="/products">
              <span className={`font-medium transition-all duration-300 hover:text-[#d5b59c] hover:scale-105 ${
                location.includes('/products') ? 'text-[#d5b59c] border-b-2 border-[#d5b59c] pb-1' : 'text-gray-700'
              }`}>
                Nos Produits
              </span>
            </Link>
            
            <Link href="/about">
              <span className={`font-medium transition-all duration-300 hover:text-[#d5b59c] hover:scale-105 ${
                location === '/about' ? 'text-[#d5b59c] border-b-2 border-[#d5b59c] pb-1' : 'text-gray-700'
              }`}>
                À Propos
              </span>
            </Link>
            
            <Link href="/contact">
              <span className={`font-medium transition-all duration-300 hover:text-[#d5b59c] hover:scale-105 ${
                location === '/contact' ? 'text-[#d5b59c] border-b-2 border-[#d5b59c] pb-1' : 'text-gray-700'
              }`}>
                Contact
              </span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="border-t border-gray-100 pt-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link href="/" onClick={closeMobileMenu}>
                <div className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  location === '/' ? 'bg-[#f5e7dc] text-[#d5b59c]' : 'text-gray-700 hover:bg-gray-50'
                }`}>
                  Accueil
                </div>
              </Link>
              
              <Link href="/products" onClick={closeMobileMenu}>
                <div className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  location.includes('/products') ? 'bg-[#f5e7dc] text-[#d5b59c]' : 'text-gray-700 hover:bg-gray-50'
                }`}>
                  Nos Produits
                </div>
              </Link>
              
              <Link href="/about" onClick={closeMobileMenu}>
                <div className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  location === '/about' ? 'bg-[#f5e7dc] text-[#d5b59c]' : 'text-gray-700 hover:bg-gray-50'
                }`}>
                  À Propos
                </div>
              </Link>
              
              <Link href="/contact" onClick={closeMobileMenu}>
                <div className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  location === '/contact' ? 'bg-[#f5e7dc] text-[#d5b59c]' : 'text-gray-700 hover:bg-gray-50'
                }`}>
                  Contact
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
