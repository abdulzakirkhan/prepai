"use client"
import React from "react";

import { CopyrightIcon, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/app/context/ThemeContext";

const Footer = () => {
    const {theme,toggleTheme}=useTheme()
  return (
    <>
      {/* Wave Divider */}
      <div className="relative h-24 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="absolute top-0 left-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill={`${theme === "dark" ? "#1F2937" : "#e5e7eb"}`}
            fillOpacity="1"
            d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,128C960,96,1056,64,1152,74.7C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className={` ${theme === "dark" ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white" :"text-black bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb]"} py-12`}>
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-[#10b981]">Mock Interview Project</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-black"}`}>
                Empowering job seekers with AI-powered mock interviews to ace their next opportunity.
              </p>
            </motion.div>

            {/* Quick Links Section */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-[#10B981]">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-black"} hover:text-[#10B981] transition-colors`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-black"} hover:text-[#10B981] transition-colors`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-black"} hover:text-[#10B981] transition-colors`}
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-black"} hover:text-[#10B981] transition-colors`}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-[#10B981]">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-full hover:bg-[#10B981] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6 text-white" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-full hover:bg-[#10B981] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-white" />
                </a>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-full hover:bg-[#10B981] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6 text-white" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Copyright Section */}
          <motion.div
            className="mt-8 border-t border-gray-700 pt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className={`flex items-center justify-center text-sm ${theme === "dark" ? "text-gray-400" : "text-black"}`}>
              <CopyrightIcon className="mr-2 h-5 w-5" />
              <span>{new Date().getFullYear()} Mock Interview Platform. All Rights Reserved.</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;