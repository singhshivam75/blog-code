import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-3">Insight Blog</h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Sharing thoughts, tutorials, and ideas for curious minds.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold mb-3 text-white">Connect</h3>
          <div className="flex justify-center md:justify-end space-x-4 text-xl">
            <a href="https://twitter.com" className="hover:text-white" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://github.com" className="hover:text-white" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com" className="hover:text-white" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="mailto:your@email.com" className="hover:text-white"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Insight Blog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
