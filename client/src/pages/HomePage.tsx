import React, { useState, useEffect } from 'react';
import { Link } from "wouter";

// Import design images
import design1Image from '../pics/design.jpg';
import design2Image from '../pics/design2.jpg';
import design3Image from '../pics/design3.jpeg';
import design4Image from '../pics/carton3.jpeg';
import design5Image from '../pics/carton.jpeg';

// Import images for the slider
import cartonImage1 from '../pics/carton1.jpeg';
import cartonImage2 from '../pics/homepage.jpeg';
//import cartonImage3 from '../pics/homepage4.jpeg';

import usineImage from '../pics/usine.jpeg'; // New import for the factory section

const HomePage = () => {
  const sliderImages = [cartonImage2, cartonImage1 ]; // Added homepageImage to slider
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(slideInterval);
  }, [sliderImages.length]);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-screen flex items-center justify-center py-20 overflow-hidden">
        {/* Background gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0fff0]/20 to-[#f8fff8]/20 z-10"></div>

        {/* Image Slider as full background */}
        <div className="absolute inset-0 z-0">
          {sliderImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Carton product ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Content overlaid on top of the slider */}
        <div className="container mx-auto px-6 max-w-7xl relative z-20"> {/* Increased z-index to ensure content is on top */}
          <div className="flex items-center justify-center h-full">
            {/* Main Content Block */}
            <div className="w-full lg:max-w-3xl mx-auto p-8 bg-white bg-opacity-80 rounded-xl shadow-lg backdrop-blur-sm text-center">
              <div className="inline-flex items-center bg-[#e6ffe6] text-[#004d00] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[#008000] rounded-full mr-2"></span>
                Produits Compostables et Recyclables
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
                Emballages
                <span className="block font-semibold text-[#006600]">Durables</span>
                <span className="block font-light text-[#008000]">& Innovants</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Découvrez notre collection premium d'emballages alimentaires écologiques, 
                conçus pour respecter l'environnement sans compromettre la qualité. 
                Des solutions innovantes pour tous vos besoins professionnels.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <button className="bg-[#006600] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#004d00] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Explorer le Catalogue
                  </button>
                </Link>
                <Link href="/about">
                  <button className="border-2 border-[#006600] text-[#006600] px-8 py-4 rounded-lg font-semibold hover:bg-[#f0fff0] transition-all duration-300">
                    Notre Mission
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir The Packer?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos emballages allient performance, durabilité et respect de l'environnement pour 
              offrir des solutions d'excellence à vos clients
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="text-center group transform hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#e6ffe6] to-[#008000] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Éco-Responsable</h3>
              <p className="text-gray-600 leading-relaxed">
                Matériaux 100% compostables et recyclables pour un impact environnemental minimal. 
                Contribuez à la protection de notre planète avec chaque commande.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center group transform hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#f8fff8] to-[#f0fff0] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-10 h-10 text-[#006600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Qualité Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Standards de qualité élevés avec des matériaux durables et résistants. 
                Garantie de performance pour tous vos besoins professionnels.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center group transform hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#fafffa] to-[#f8fff8] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-10 h-10 text-[#008000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Designs modernes et fonctionnels adaptés aux besoins professionnels. 
                Technology avancée pour des solutions d'emballage révolutionnaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gradient-to-br from-stone-50 to-[#f0fff0]">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Solutions d'Emballage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une gamme complète pour tous vos besoins professionnels : restaurants, 
              traiteurs, livraison et vente à emporter
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Product 1 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img 
                  src={design1Image} 
                  alt="Boîtes alimentaires durables" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Boîtes Alimentaires</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Emballages durables pour restaurants et traiteurs. Parfaits pour burgers, 
                  sandwichs et plats chauds avec une excellente résistance.
                </p>
                <Link href="/products?category=burger">
                  <button className="text-[#006600] font-semibold hover:text-[#004d00] transition-colors flex items-center">
                    Découvrir 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img 
                  src={design2Image} 
                  alt="Contenants écologiques innovants" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Contenants Écologiques</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Solutions innovantes et respectueuses de l'environnement. Parfaits pour 
                  nouilles, soupes et plats liquides avec étanchéité garantie.
                </p>
                <Link href="/products?category=pots">
                  <button className="text-[#006600] font-semibold hover:text-[#004d00] transition-colors flex items-center">
                    Découvrir 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Product 3 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img 
                  src={design3Image} 
                  alt="Emballages premium élégants" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Emballages Premium</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Qualité supérieure pour une présentation parfaite. Idéals pour lunch box, 
                  repas gastronomiques et événements spéciaux.
                </p>
                <Link href="/products?category=lunchbox">
                  <button className="text-[#006600] font-semibold hover:text-[#004d00] transition-colors flex items-center">
                    Découvrir 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Factory Section */}
      <section className="py-20 bg-gradient-to-br from-[#f0fff0] to-[#f8fff8]"> {/* Custom kraft background */}
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="lg:flex items-center gap-16">
            {/* Factory Image */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={usineImage}
                  alt="Our Factory"
                  className="w-full h-auto object-cover object-center rounded-3xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6">

                </div>
              </div>
            </div>
            {/* Factory Content */}
            <div className="lg:w-1/2 lg:pl-12">
              <div className="inline-flex items-center bg-[#e6ffe6] text-[#004d00] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[#008000] rounded-full mr-2"></span>
                Processus de Fabrication
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                La Qualité Commence Ici
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Découvrez les coulisses de notre production, où chaque emballage est conçu
                et fabriqué avec precision et un engagement inébranlable envers la durabilité.
                Nos installations modernes garantissent une efficacité maximale et un impact
                environnemental minimal.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#008000] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Technologies de pointe
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#008000] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Contrôle qualité rigoureux
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#008000] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Production éco-responsable
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="lg:flex items-center">
            
            {/* Left - Images */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8">
                  <img 
                    src={design4Image} 
                    alt="Notre expertise en emballage" 
                    className="w-full h-64 object-cover object-center" /* Increased height to h-64 */
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8">
                  <img 
                    src={design5Image} 
                    alt="Innovation et durabilité" 
                    className="w-full h-64 object-cover object-center" /* Increased height to h-64 */
                  />
                </div>
              </div>
            </div>
            
            {/* Right - Content */}
            <div className="lg:w-1/2 lg:pl-12">
              <div className="inline-flex items-center bg-[#e6ffe6] text-[#004d00] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[#008000] rounded-full mr-2"></span>
                Notre Engagement
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                L'emballage est une nouvelle compétence
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Chez The Packer, nous révolutionnons l'industrie de l'emballage alimentaire 
                en proposant des solutions durables, innovantes et respectueuses de l'environnement. 
                Notre mission est de transformer la façon dont vous présentez et protégez vos produits.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#008000] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Matériaux Écologiques</h3>
                    <p className="text-gray-600">100% compostables et biodégradables pour un avenir durable</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#008000] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Qualité Garantie</h3>
                    <p className="text-gray-600">Standards internationaux de qualité et certifications</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#008000] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Service Client</h3>
                    <p className="text-gray-600">Accompagnement personnalisé et livraison rapide</p>
                  </div>
                </div>
              </div>
              
              <Link href="/about">
                <button className="bg-[#006600] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#004d00] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  En Savoir Plus
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-[#006600] to-[#004d00] text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Résultats en Chiffres</h2>
            <p className="text-xl opacity-90">
              La confiance de nos clients nous guide vers l'excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">Clients Satisfaits</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Produits Disponibles</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-90">Éco-Responsable</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-lg opacity-90">Livraison Rapide</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#006600] to-[#004d00] text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Révolutionner Vos Emballages?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Découvrez notre gamme complète et rejoignez la révolution de l'emballage durable. 
            Commandez dès maintenant et faites la différence pour votre entreprise et l'environnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="bg-white text-[#006600] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Voir le Catalogue Complet
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;