import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold tracking-widest mb-6">TAYA</h3>
            <p className="text-gray-400 text-sm">Dress better everyday</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/collection/men" className="text-sm text-gray-400 hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/collection/women" className="text-sm text-gray-400 hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/collection/accessories" className="text-sm text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/collection/final-sale" className="text-sm text-gray-400 hover:text-white transition-colors">Last Chance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Information</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TAYA CLOTHING. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
