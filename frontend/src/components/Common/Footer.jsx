import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

/**
 * Footer.jsx
 *  - Sitewide footer with social links.
 *  - Accessible icons and proper aria‐labels.
 */
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 text-center space-y-4">
        <div className="flex justify-center space-x-6 text-2xl text-gray-600 dark:text-gray-400">
          <a
            href="https://twitter.com/UltraProfile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Twitter"
          >
            <FaTwitter className="hover:text-primary transition" />
          </a>
          <a
            href="https://linkedin.com/company/UltraProfile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on LinkedIn"
          >
            <FaLinkedin className="hover:text-primary transition" />
          </a>
          <a
            href="https://github.com/UltraProfile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star us on GitHub"
          >
            <FaGithub className="hover:text-primary transition" />
          </a>
          <a href="mailto:hello@ultraprofile.com" aria-label="Send us an email">
            <FaEnvelope className="hover:text-primary transition" />
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} UltraProfile+. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
