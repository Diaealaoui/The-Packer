import React from 'react';
import { Star } from "../../lib/icons";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amine F.",
    location: "Casablanca, Maroc",
    content: "Les emballages alimentaires que j'ai achetés sont de haute qualité. Ils gardent les aliments frais plus longtemps que prévu. Recommandé!",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Laila B.",
    location: "Marrakech, Maroc",
    content: "Service clientèle excellent, livraison rapide, et les produits sont exactement comme décrits. Très satisfaite!",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Youssef M.",
    location: "Fès, Maroc",
    content: "La qualité des emballages est impressionnante. Le design est aussi très bon. Je vais certainement continuer à utiliser vos services.",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-neutral-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Ce que disent nos clients</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex text-secondary mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className="h-5 w-5" 
                    fill={index < testimonial.rating ? "#ffc107" : "#e4e5e9"} 
                  />
                ))}
              </div>
              <p className="text-neutral-600 mb-4 italic">
                "“{testimonial.content}”"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
