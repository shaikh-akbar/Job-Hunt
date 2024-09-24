import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-6 ">
      <div className=''>
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand or Logo */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Job<span className='text-[#F83002]'>Hunt</span></h1>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#" className="hover:text-gray-400">About Us</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-black">
              <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-black">
              <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-black">
              <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-black">
              <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-white-500">
          © 2024 JobSite. All rights reserved.
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
