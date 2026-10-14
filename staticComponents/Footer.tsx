"use client";

import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/Image/logo.jpg'
import {
  FOOTER_QUICK_LINKS,
  FOOTER_GET_INVOLVED_LINKS,
  FOOTER_CONTACT,
  FOOTER_SOCIAL_LINKS,
  FOOTER_LEGAL_LINKS
} from './FooterData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setMessage("Thanks for your interest! Newsletter subscriptions will be available soon.");
    setEmail('');
  };

  return (
    <footer className="bg-[#242653] text-white font-sans selection:bg-[#E91E63] selection:text-white">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Column 1: Charity Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src={logo}
                alt='Mary Maud Charity Logo'
                width={60}
                height={60}
                className='object'
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Mary Maud Charity
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Mary Maud Charity is committed to making a meaningful difference through compassion, community support, and collective action.
            </p>

            <p className="text-xs text-gray-400 italic">
              &quot;The Charity operates on the belief that every individual deserves dignity, opportunity, and hope regardless of their social or economic circumstances.&quot;
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs text-[#E91E63] tracking-widest uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_QUICK_LINKS.map((link) => {
                const isHome = link.href === '/';

                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  // If it's the home link and we are already on the homepage, scroll to top smoothly
                  if (isHome && typeof window !== 'undefined' && window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                };

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={handleClick}
                      className="text-gray-300 text-sm hover:text-[#E91E63] transition-colors duration-200 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs text-[#E91E63] tracking-widest uppercase">
              Get Involved
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_GET_INVOLVED_LINKS.map((link) => {
                const isDonate = link.label === "Donate";
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors duration-200 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] rounded ${isDonate
                        ? 'text-[#E91E63] font-semibold hover:text-white bg-[#E91E63]/10 px-3 py-1 rounded-full border border-[#E91E63]/30'
                        : 'text-gray-300 hover:text-[#E91E63]'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact Us & Social Media */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4 text-xs text-[#E91E63] tracking-widest uppercase">
                Contact Us
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {FOOTER_CONTACT.email && (
                  <li>
                    <a
                      href={`mailto:${FOOTER_CONTACT.email}`}
                      className="hover:text-[#E91E63] transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] rounded"
                    >
                      <svg className="w-4 h-4 text-[#E91E63] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">{FOOTER_CONTACT.email}</span>
                    </a>
                  </li>
                )}

                {FOOTER_CONTACT.phone && (
                  <li>
                    <a
                      href={`tel:${FOOTER_CONTACT.phone}`}
                      className="hover:text-[#E91E63] transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] rounded"
                    >
                      <svg className="w-4 h-4 text-[#E91E63] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{FOOTER_CONTACT.phone}</span>
                    </a>
                  </li>
                )}

                {FOOTER_CONTACT.location && (
                  <li className="flex items-center space-x-2 text-gray-300">
                    <svg className="w-4 h-4 text-[#E91E63] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{FOOTER_CONTACT.location}</span>
                  </li>
                )}
              </ul>
            </div>

            {FOOTER_SOCIAL_LINKS.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-[#E91E63] tracking-widest uppercase mb-3">
                  Follow Our Journey
                </h4>
                <div className="flex items-center space-x-3">
                  {FOOTER_SOCIAL_LINKS.map((social) => {
                    // Helper function to render the correct brand icon
                    const renderIcon = (name: string) => {
                      switch (name) {
                        case 'facebook': return <FaFacebookF className="w-4 h-4" />;
                        case 'tiktok': return <FaTiktok className="w-4 h-4" />;
                        default: return null;
                      }
                    };

                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit Mary Maud Charity on ${social.platform}`}
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#E91E63] hover:border-[#E91E63] transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {renderIcon(social.iconName)}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-10 border-b border-white/10 max-w-3xl">
          <h3 className="text-lg font-semibold text-white mb-2">
            Stay Connected With Us
          </h3>
          <p className="text-sm text-gray-300 mb-6">
            Subscribe to our newsletter for updates on our activities, stories, and upcoming initiatives.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Enter your email address"
                aria-label="Email address for newsletter"
                className="bg-white text-[#20213A] placeholder-gray-500 text-sm px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
              />
              <button
                type="submit"
                className="bg-[#E91E63] hover:bg-[#D81B60] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md shrink-0 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                Subscribe
              </button>
            </div>

            {status === 'error' && (
              <p className="text-rose-400 text-xs mt-1" role="alert">{message}</p>
            )}
            {status === 'success' && (
              <p className="text-emerald-300 text-xs mt-1 font-medium" role="status">{message}</p>
            )}

            <p className="text-xs text-gray-400">
              Your email will only be used for charity updates. You can unsubscribe at any time.
            </p>
          </form>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {currentYear} Mary Maud Charity. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            {FOOTER_LEGAL_LINKS.map((legal) => (
              <Link
                key={legal.label}
                href={legal.href}
                className="hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] rounded"
              >
                {legal.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}