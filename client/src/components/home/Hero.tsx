import React from 'react';
import { Link } from "wouter";
import image from '../../pics/logositweb.jpeg';

const Hero = () => {
  return (
    <section className="bg-[#FFFFFF] text-black py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="md:flex items-center justify-between">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
              Découvrez nos emballages alimentaires originaux
            </h1>
            <p className="mb-8 leading-relaxed">
              Qualité et innovation pour tous vos besoins
            </p>
            <div className="flex justify-center">
              <Link href="#featured-products">
                <a className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Acheter maintenant
                </a>
              </Link>
              <Link href="#categories">
                <a className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Explorer les catégories
                </a>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img 
              className="object-cover object-center rounded-lg shadow-lg"
              alt="our products"
              src={image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
