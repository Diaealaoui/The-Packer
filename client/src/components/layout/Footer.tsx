import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();  // Dynamically get the current year

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <span className="text-sm text-gray-600">
          © {currentYear} The Packer. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
