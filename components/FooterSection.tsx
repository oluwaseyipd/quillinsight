"use client";
import { Feather } from "lucide-react";
import React from "react";

// Lucide SVGs for social icons (Twitter, LinkedIn, GitHub)
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M22 4.01c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.49-1.75.85-2.73 1.04A4.28 4.28 0 0 0 16.1 3c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.13 4.07 6.13 1.64 3.16c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.59a4.28 4.28 0 0 1-1.94-.54v.05c0 2.09 1.49 3.83 3.47 4.23-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54c-.56 0-1.11-.03-1.65-.1A12.13 12.13 0 0 0 7.29 21c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.54A8.36 8.36 0 0 0 22 4.01z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M8 11v5" />
    <path d="M8 8v.01" />
    <path d="M12 16v-5" />
    <path d="M16 16v-3a2 2 0 0 0-4 0" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.43c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
  </svg>
);

const FooterSection: React.FC = () => (
  <footer
    className="bg-surface border-t border-muted-foreground/10 pt-12 pb-6 px-6"
    aria-label="Site Footer"
  >
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
      {/* Column 1: Logo + Tagline */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2">
          <Feather className="text-brand h-6 w-6" />
          <span className="font-heading text-lg font-bold text-brand">
            QuillInsight
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          Turn your notes into insights.
        </span>
      </div>
      {/* Column 2: Quick Links */}
      <div>
        <span className="font-heading font-semibold text-base mb-3 block">
          Quick Links
        </span>
        <ul className="space-y-2">
          <li>
            <a href="#features" className="hover:text-accent transition">
              Features
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-accent transition">
              Pricing
            </a>
          </li>
          <li>
            <a href="#faqs" className="hover:text-accent transition">
              FAQs
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-accent transition">
              Contact
            </a>
          </li>
        </ul>
      </div>
      {/* Column 3: Resources */}
      <div>
        <span className="font-heading font-semibold text-base mb-3 block">
          Resources
        </span>
        <ul className="space-y-2">
          <li>
            <a href="#blog" className="hover:text-accent transition">
              Blog
            </a>
          </li>
          <li>
            <a href="#docs" className="hover:text-accent transition">
              Docs
            </a>
          </li>
          <li>
            <a href="#api" className="hover:text-accent transition">
              API
            </a>
          </li>
          <li>
            <a href="#support" className="hover:text-accent transition">
              Support
            </a>
          </li>
        </ul>
      </div>
      {/* Column 4: Socials */}
      <div>
        <span className="font-heading font-semibold text-base mb-3 block">
          Socials
        </span>
        <div className="flex gap-4 mt-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-muted-foreground/10 pt-6 text-center text-sm text-muted-foreground">
      © 2025 QuillInsight. All rights reserved.
    </div>
  </footer>
);

export default FooterSection;
