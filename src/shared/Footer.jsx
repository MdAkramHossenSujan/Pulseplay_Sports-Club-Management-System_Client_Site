import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";
import logo from "../assets/Logo/logo-transparent.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="text-center md:text-left">
          <span className="text-2xl font-bold text-gray-500 dark:text-green-500">SportSphere</span>
          <p className="mt-3 text-sm">
            Elevate your game. Join the premier sports club for fitness, training,
            and community.
          </p>
        </div>

        <div>
          <h6 className="footer-title text-gray-600 dark:text-green-500">Services</h6>
          <nav className="flex flex-col gap-2 mt-2">
            <Link to="/courts" className="link link-hover">Court Booking</Link>
            <Link to="#" className="link link-hover">Personal Training</Link>
            <Link to="#" className="link link-hover">Events & Tournaments</Link>
            <Link to="#" className="link link-hover">Membership Plans</Link>
          </nav>
        </div>

        <div>
          <h6 className="footer-title text-gray-600 dark:text-green-500">Company</h6>
          <nav className="flex flex-col gap-2 mt-2">
            <Link to="/about" className="link link-hover">About Us</Link>
            <Link to="/contact" className="link link-hover">Contact</Link>
            <Link to="#" className="link link-hover">Careers</Link>
            <Link to="#" className="link link-hover">Press</Link>
          </nav>
        </div>

        <div>
          <h6 className="footer-title text-gray-600 dark:text-green-500">Legal</h6>
          <nav className="flex flex-col gap-2 mt-2">
            <Link to="#" className="link link-hover">Terms of Service</Link>
            <Link to="#" className="link link-hover">Privacy Policy</Link>
            <Link to="#" className="link link-hover">Cookie Policy</Link>
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
          <aside className="flex flex-col md:flex-row md:items-center gap-2 text-center md:text-left">
          <img src={logo} alt="logo" className="w-24 h-24 mx-auto md:mx-0" />
            <span className="text-gray-600 dark:text-green-500 font-bold">
             Play Without Limit
            </span>
            <p className="text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </aside>

          <nav className="flex gap-4">
            <Link to="#" className="text-gray-600 dark:text-green-600 hover:opacity-80 transition">
              <FaFacebookF size={20} />
            </Link>
            <Link to="#" className="text-gray-600 dark:text-green-600 hover:opacity-80 transition">
              <FaTwitter size={20} />
            </Link>
            <Link to="#" className="text-gray-600 dark:text-green-600 hover:opacity-80 transition">
              <FaYoutube size={20} />
            </Link>
            <Link to="#" className="text-gray-600 dark:text-green-600 hover:opacity-80 transition">
              <FaInstagram size={20} />
            </Link>
            <Link to="#" className="text-gray-600 dark:text-green-600 hover:opacity-80 transition">
              <FaLinkedin size={20} />
            </Link>
            <Link to="#" className="text-gray-600 dark:text-green-600 hover:opacity-80 transition">
              <FaDiscord size={20} />
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

