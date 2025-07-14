import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useToast } from "../hooks/use_toast"; // Removed as toast is no longer used
import { Home, ChevronRight, Phone, Mail, MapPin, Instagram, Star } from "../lib/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button"; // Corrected import statement for Button
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

// Form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide" }),
  subject: z.string().min(5, { message: "Le sujet doit comporter au moins 5 caractères" }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  // const { toast } = useToast(); // Removed as toast is no longer used
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState({});

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

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    setIsSubmitting(true);
    console.log('Form values:', values);
    
    // Removed the toast notification as requested
    // toast({
    //   title: "Formulaire rempli!",
    //   description: "Veuillez nous contacter directement par téléphone ou email.",
    //   duration: 5000,
    // });
    
    // Simulate API call or processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Optionally, reset the form after successful submission
      form.reset();
      console.log("Form submitted successfully (simulated).");
    }, 1500); // Simulate a 1.5 second delay
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      content: "0661482574",
      link: "tel:0661482574",
      gradient: "from-[#c5a58c] to-[#a38b75]" // Custom kraft gradient
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "thepacker.yassine@gmail.com",
      link: "mailto:thepacker.yassine@gmail.com",
      gradient: "from-blue-400 to-cyan-600"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Instagram",
      content: "@thepacker_morocco",
      link: "https://instagram.com/thepacker_morocco",
      gradient: "from-pink-400 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f5e7dc] via-[#faefe6] to-[#fcf5ef] py-16 md:py-24 overflow-hidden"> {/* Custom kraft gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5e7dc]/20 to-[#faefe6]/20"></div> {/* Custom kraft gradient */}
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#e0c0a0] to-[#d5b59c] rounded-full opacity-30"></div> {/* Custom kraft gradient */}
          <div className="absolute top-1/2 -right-20 w-60 h-60 bg-gradient-to-br from-[#d5b59c] to-[#e0c0a0] rounded-full opacity-20"></div> {/* Custom kraft gradient */}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-gray-500 hover:text-[#a38b75] transition-colors duration-200 flex items-center"> {/* Custom kraft text */}
                  <Home className="h-4 w-4" />
                </a>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              </li>
              <li className="text-[#a38b75] font-medium">Contact</li> {/* Custom kraft text */}
            </ol>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm text-[#8d7560] px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg"> {/* Custom kraft text */}
              <Mail className="w-4 h-4 mr-2" />
              Restons en Contact
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
              Contactez-nous
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Une question ? Un projet ? N'hésitez pas à nous contacter. 
              Notre équipe est là pour vous accompagner dans vos besoins d'emballage durable.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div 
            id="contact-cards" 
            data-animate
            className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 ${
              isVisible['contact-cards'] ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : '_self'}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                className="group block"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${info.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600 group-hover:text-[#a38b75] transition-colors duration-300"> {/* Custom kraft text */}
                    {info.content}
                  </p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-4 h-4 text-[#d5b59c]" /> {/* Custom kraft text */}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section - Removed the "Envoyez-nous un Message" box */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-[#f5e7dc]"> {/* Custom kraft background */}
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="lg:flex gap-16">
            {/* Contact Information Sidebar - Moved to occupy full width if no form */}
            <div 
              id="contact-info" 
              data-animate
              className={`lg:w-full mt-12 lg:mt-0 transition-all duration-1000 ${ // Changed to w-full
                isVisible['contact-info'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-gradient-to-br from-[#a38b75] to-[#8d7560] rounded-3xl p-8 text-white"> {/* Custom kraft gradient */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Informations de Contact</h3>
                  <p className="text-[#f0e0d0] leading-relaxed"> {/* Custom kraft text */}
                    Nous sommes là pour vous aider à trouver les meilleures solutions d'emballage 
                    pour votre entreprise.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Téléphone</h4>
                      <a href="tel:0661482574" className="text-[#f0e0d0] hover:text-white transition-colors"> {/* Custom kraft text */}
                        0661482574
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a href="mailto:thepacker.yassine@gmail.com" className="text-[#f0e0d0] hover:text-white transition-colors break-all"> {/* Custom kraft text */}
                        thepacker.yassine@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Instagram className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Instagram</h4>
                      <a 
                        href="https://instagram.com/thepacker_morocco" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#f0e0d0] hover:text-white transition-colors" /* Custom kraft text */
                      >
                        @thepacker_morocco
                      </a>
                    </div>
                  </div>


                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <h4 className="font-semibold mb-3">Horaires de Réponse</h4>
                  <div className="space-y-2 text-[#f0e0d0]"> {/* Custom kraft text */}
                    <p>Lundi - Vendredi: 9h - 18h</p>
                    <p>Samedi: 9h - 16h</p>
                    <p>Dimanche: Sur rendez-vous</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div 
            id="faq" 
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible.faq ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center bg-[#f5e7dc] text-[#8d7560] px-4 py-2 rounded-full text-sm font-medium mb-6"> {/* Custom kraft bg/text */}
              <Star className="w-4 h-4 mr-2" />
              Questions Fréquentes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Des Questions ?
            </h2>
            <p className="text-lg text-gray-600">
              Voici les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Quels sont vos délais de livraison ?",
                answer: "Nous livrons généralement sous 24-48h pour les commandes en stock. Pour les commandes personnalisées, comptez 3-5 jours ouvrables."
              },
              {
                question: "Proposez-vous des échantillons ?",
                answer: "Oui, nous pouvons vous fournir des échantillons gratuits pour que vous puissiez tester la quality de nos produits avant de passer commande."
              },
              {
                question: "Vos emballages sont-ils vraiment écologiques ?",
                answer: "Absolument ! Tous nos produits sont 100% compostables et biodégradables, fabriqués à partir de matériaux durables et respectueux de l'environnement."
              },
              {
                question: "Acceptez-vous les commandes personnalisées ?",
                answer: "Oui, nous proposons des solutions d'emballage personnalisées avec votre logo et vos couleurs. Contactez-nous pour discuter de votre projet."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#a38b75] to-[#8d7560] text-white"> {/* Custom kraft gradient */}
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Commencer ?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
            Contactez-nous dès aujourd'hui pour découvrir comment nos solutions d'emballage 
            peuvent améliorer votre activité tout en respectant l'environnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0661482574"
              className="bg-white text-[#a38b75] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center" /* Custom kraft text */
            >
              <Phone className="w-5 h-5 mr-2" />
              Appelez-nous
            </a>
            <a 
              href="mailto:thepacker.yassine@gmail.com"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#a38b75] transition-all duration-300 transform hover:scale-105 flex items-center justify-center" /* Custom kraft text */
            >
              <Mail className="w-5 h-5 mr-2" />
              Envoyez un Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
