import React, { useEffect, useState } from 'react';
import { Link } from "wouter";

// Import design images
// Removed: import image2 from '../pics/aboutme.jpeg'; // Image removed as requested
import { Home, ChevronRight, Heart, Star, Check, ShoppingBag, Shield, User, Mail } from "../lib/icons";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({ clients: 0, products: 0, satisfaction: 0 });

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Auto-slide for journey timeline
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (isVisible.stats) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setStats({
          clients: Math.floor((1000 / steps) * currentStep),
          products: Math.floor((50 / steps) * currentStep),
          satisfaction: Math.floor((100 / steps) * currentStep)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats({ clients: 1000, products: 50, satisfaction: 100 });
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible.stats]);

  const journeySteps = [
    {
      year: "2018",
      title: "Études en France",
      description: "Formation en innovation et développement durable",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600"
    },
    {
      year: "2020",
      title: "Recherche & Développement",
      description: "Étude approfondie des matériaux écologiques",
      icon: <Shield className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600"
    },
    {
      year: "2022",
      title: "Retour au Maroc",
      description: "Vision claire pour transformer le marché local",
      icon: <Heart className="w-6 h-6" />,
      color: "from-red-400 to-red-600"
    },
    {
      year: "2024",
      title: "The Packer",
      description: "Lancement officiel de l'entreprise",
      icon: <Star className="w-6 h-6" />,
      color: "from-[#008000] to-[#a0ffa0]" // Custom green gradient
    }
  ];

  const values = [
    {
      icon: <Check className="w-8 h-8" />,
      title: "Qualité Premium",
      description: "Standards européens appliqués à chaque produit",
      gradient: "from-[#008000] to-[#a0ffa0]", // Custom green gradient
      delay: "0ms"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Service Client",
      description: "Accompagnement personnalisé 24/7",
      gradient: "from-blue-400 to-cyan-600",
      delay: "200ms"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Innovation",
      description: "R&D continue pour l'avenir durable",
      gradient: "from-purple-400 to-violet-600",
      delay: "400ms"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Accessibilité",
      description: "Prix compétitifs sans compromis",
      gradient: "from-red-400 to-red-600",
      delay: "600ms"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#e6ffe6] rounded-full opacity-20 animate-pulse"></div> {/* Custom green shade */}
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#f0fff0] rounded-full opacity-30 animate-bounce" style={{ animationDuration: '3s' }}></div> {/* Custom green shade */}
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#e6ffe6] rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div> {/* Custom green shade */}
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f0fff0] via-[#f8fff8] to-[#fafffa] py-16 md:py-24 overflow-hidden"> {/* Custom green gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0fff0]/20 to-[#f8fff8]/20"></div> {/* Custom green gradient */}
        
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#c0ffc0] to-[#008000] rounded-full opacity-30 animate-spin" style={{ animationDuration: '20s' }}></div> {/* Custom green gradient */}
          <div className="absolute top-1/2 -right-20 w-60 h-60 bg-gradient-to-br from-[#008000] to-[#c0ffc0] rounded-full opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div> {/* Custom green gradient */}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8 animate-slideInDown">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-gray-500 hover:text-[#006600] transition-all duration-300 flex items-center hover:scale-110"> {/* Custom green text */}
                  <Home className="h-4 w-4" />
                </a>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              </li>
              <li className="text-[#006600] font-medium">À propos de moi</li> {/* Custom green text */}
            </ol>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm text-[#004d00] px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg animate-slideInUp" style={{ animationDelay: '200ms' }}> {/* Custom green text */}
              <Star className="w-4 h-4 text-yellow-500 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
              Notre Histoire
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
              À propos de moi
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-slideInUp" style={{ animationDelay: '600ms' }}>
              Découvrez l'histoire de <span className="font-semibold text-[#006600]">Yassine Bennouna</span> et sa passion pour {/* Custom green text */}
              l'innovation dans l'emballage alimentaire durable au Maroc
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="lg:flex items-center gap-16">
            
            {/* Left - Content (now full width on large screens) */}
            <div 
              id="content" 
              data-animate
              className={`lg:w-full mb-12 lg:mb-0 ${
                isVisible.content ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="prose prose-lg max-w-none">
                <div className="inline-flex items-center bg-[#f0fff0] text-[#004d00] px-4 py-2 rounded-full text-sm font-medium mb-6"> {/* Custom green bg/text */}
                  <Star className="w-4 h-4 mr-2" />
                  Entrepreneur Passionné
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  Une Vision Claire pour 
                  <span className="block bg-gradient-to-r from-[#006600] to-[#004d00] bg-clip-text text-transparent"> {/* Custom green gradient */}
                    Révolutionner l'Emballage
                  </span>
                </h2>
                
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    Je suis <strong className="text-gray-900">Yassine Bennouna</strong>, un jeune entrepreneur marocain 
                    ayant comme mission de transformer et améliorer l'industrie de l'emballage alimentaire au Maroc.
                  </p>
                  
                  <p className="text-lg">
                    Ma passion pour l'innovation et la durabilité me guide dans chaque décision. 
                    Nous utilisons exclusivement les meilleures matières premières, garantissant 
                    une qualité exceptionnelle et un rendu qui saura mettre en valeur vos produits alimentaires.
                  </p>
                  
                  <p className="text-lg">
                    L'objectif de la Société The Packer va au-delà du business : nous voulons créer un 
                    écosystème durable qui profite à nos clients, à notre communauté et à 
                    notre belle planète.
                  </p>
                </div>

                {/* Key Points */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {[
                    { icon: <ShoppingBag className="w-5 h-5" />, text: "Formation Internationale" },
                    { icon: <Shield className="w-5 h-5" />, text: "Vision Durable" },
                    { icon: <Star className="w-5 h-5" />, text: "Standards Premium" },
                    { icon: <Heart className="w-5 h-5" />, text: "Passion Authentique" }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#008000] to-[#a0ffa0] rounded-full flex items-center justify-center text-white"> {/* Custom green gradient */}
                        {item.icon}
                      </div>
                      <span className="font-medium text-gray-900">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div 
            id="values" 
            data-animate
            className={`text-center mb-16 ${
              isVisible.values ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center bg-[#f0fff0] text-[#004d00] px-4 py-2 rounded-full text-sm font-medium mb-6"> {/* Custom green bg/text */}
              <Heart className="w-4 h-4 mr-2" />
              Nos Valeurs
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Ce Qui Nous Guide
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes fondamentaux qui inspirent chaque innovation chez The Packer
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                id={`value-${index}`}
                data-animate
                className={`group ${
                  isVisible[`value-${index}`] ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} text-white mb-6 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  
                  {/* Hover arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#006600] transition-colors duration-300" /> {/* Custom green text */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#006600] to-[#004d00] text-white relative overflow-hidden"> {/* Custom green gradient */}
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#008000]/20 to-[#a0ffa0]/20 animate-pulse"></div> {/* Custom green gradient */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full animate-pulse" style={{ animationDuration: '15s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div 
            id="stats" 
            data-animate
            className={`text-center mb-12 ${
              isVisible.stats ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nos Réalisations
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Des chiffres qui témoignent de notre engagement et de votre confiance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center transform hover:scale-110 transition-all duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10" />
              </div>
              <div className="text-4xl md:text-6xl font-bold mb-2">{stats.clients}+</div>
              <div className="text-lg md:text-xl opacity-90">Clients Satisfaits</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-all duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10" />
              </div>
              <div className="text-4xl md:text-6xl font-bold mb-2">{stats.products}+</div>
              <div className="text-lg md:text-xl opacity-90">Produits</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-all duration-300">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div className="text-4xl md:text-6xl font-bold mb-2">{stats.satisfaction}%</div>
              <div className="text-lg md:text-xl opacity-90">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Prêt à Transformer Votre Business?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
            Rejoignez la révolution de l'emballage durable et découvrez comment 
            nos solutions peuvent élever votre marque
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="group bg-gradient-to-r from-[#006600] to-[#004d00] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#004d00] hover:to-[#003300] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center" // Custom green gradient
            >
              Découvrir Nos Produits
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Contactez Nous
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .animate-slideInDown {
          animation: slideInDown 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
