"use client";

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Shield,
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  personal: [
    { name: "Auto Insurance", href: "#plans" },
    { name: "Home Insurance", href: "#plans" },
    { name: "Life Insurance", href: "#plans" },
    { name: "Health Insurance", href: "#plans" },
    { name: "Renters Insurance", href: "#" },
  ],
  business: [
    { name: "General Liability", href: "#plans" },
    { name: "Professional Liability", href: "#" },
    { name: "Commercial Property", href: "#" },
    { name: "Workers Compensation", href: "#" },
    { name: "Cyber Insurance", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact Us", href: "#contact" },
    { name: "Careers", href: "#" },
  ],
  resources: [
    { name: "Get a Quote", href: "#quote" },
    { name: "File a Claim", href: "#" },
    { name: "Insurance Guide", href: "#" },
    { name: "Blog", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-white">Chatman</span>
                <span className="font-light text-xl text-accent-400"> Insurance</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Your trusted partner in protection. Comprehensive insurance solutions available 24/7 with AI-powered assistance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+13464820150"
                className="flex items-center space-x-3 text-gray-400 hover:text-accent-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>(346) 482-0150</span>
              </a>
              <a
                href="mailto:hello@chatmaninsurance.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-accent-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hello@chatmaninsurance.com</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>123 Insurance Plaza, Houston, TX</span>
              </div>
            </div>
          </div>

          {/* Personal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Personal</h4>
            <ul className="space-y-3">
              {footerLinks.personal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Business</h4>
            <ul className="space-y-3">
              {footerLinks.business.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-white mb-1">Stay Protected & Informed</h4>
              <p className="text-gray-400 text-sm">Subscribe for insurance tips and exclusive offers.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-primary-900 border border-primary-700 rounded-l-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-400 text-white rounded-r-xl font-semibold hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-2 text-gray-400 text-sm">
              <span>© {new Date().getFullYear()} Chatman Insurance. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-accent-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-accent-400 transition-colors">Licenses</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
