import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header({ onSearchClick }) {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close account dropdown when route changes for cleaner UX.
    setIsAccountDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(e.target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    if (isAccountDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isAccountDropdownOpen]);

  const handleLogout = async () => {
    await logout();
    setIsAccountDropdownOpen(false);
    navigate('/auth/login', { replace: true });
  };

  const navItems = [
    {
      name: 'WOMEN',
      link: '/collection/women',
      menu: {
        featured: [
          { label: 'New Arrivals', link: '/collection/women/new' },
          { label: 'Best Sellers', link: '/collection/women/best-sellers' },
          { label: 'Athleisure', link: '/collection/women/athleisure' },
          { label: 'Essentials', link: '/collection/women/essentials' },
          { label: 'Seamless', link: '/collection/women/seamless' }
        ],
        explore: [
          { label: 'T-Shirts', link: '/collection/women/tees' },
          { label: 'Polos', link: '/collection/women/polos' },
          { label: 'Crop Tops', link: '/collection/women/crop-tops' },
          { label: 'Sports Bras', link: '/collection/women/sports-bras' },
          { label: 'Tanks', link: '/collection/women/tanks' },
          { label: 'Leggings', link: '/collection/women/leggings' },
          { label: 'Skirts', link: '/collection/women/skirts' },
          { label: 'Shorts', link: '/collection/women/shorts' },
          { label: 'Hoodies & Jackets', link: '/collection/women/hoodies-jackets' },
          { label: 'Joggers & Pants', link: '/collection/women/joggers-pants' }
        ]
      }
    },
    {
      name: 'MEN',
      link: '/collection/men',
      menu: {
        featured: [
          { label: 'New Arrivals', link: '/collection/men/new' },
          { label: 'Best Sellers', link: '/collection/men/best-sellers' },
          { label: 'Essentials', link: '/collection/men/essentials' },
          { label: 'Premium', link: '/collection/men/premium' },
          { label: 'Oversize', link: '/collection/men/oversize' },
          { label: 'Seamless', link: '/collection/men/seamless' }
        ],
        explore: [
          { label: 'T-Shirts', link: '/collection/men/tees' },
          { label: 'Shirts', link: '/collection/men/shirts' },
          { label: 'Polos', link: '/collection/men/polos' },
          { label: 'Shorts', link: '/collection/men/shorts' },
          { label: 'Tanks', link: '/collection/men/tanks' },
          { label: 'Compressions', link: '/collection/men/compressions' },
          { label: 'Hoodies & Jackets', link: '/collection/men/hoodies-jackets' },
          { label: 'Joggers & Pants', link: '/collection/men/joggers-pants' }
        ]
      }
    },
    { name: 'ACCESSORIES', link: '/collection/accessories' },
    { name: 'FINAL SALE', link: '/collection/final-sale', highlight: true }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="px-3 py-2 border-2 border-black rounded-lg text-xl font-bold tracking-widest hover:bg-gray-50 transition-colors">
            TAYA
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveNav(item.name)}
                onMouseLeave={() => setActiveNav(null)}
              >
                <Link
                  to={item.link}
                  className={`flex items-center gap-1 py-5 text-sm tracking-wide transition-colors hover:text-gray-600 ${
                    item.highlight ? 'text-red-600 font-semibold' : ''
                  }`}
                >
                  {item.name}
                  {item.menu && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                </Link>

                {item.menu && activeNav === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-100 min-w-[500px] p-6 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">Featured</h4>
                        <ul className="space-y-2">
                          {item.menu.featured.map((link) => (
                            <li key={link.label}>
                              <Link
                                to={link.link}
                                className="text-sm text-gray-600 hover:text-black transition-colors"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">Explore</h4>
                        <ul className="space-y-2">
                          {item.menu.explore.map((link) => (
                            <li key={link.label}>
                              <Link
                                to={link.link}
                                className="text-sm text-gray-600 hover:text-black transition-colors"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onSearchClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
            <div className="relative hidden sm:block" ref={accountDropdownRef}>
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User size={20} />
                {user ? (
                  <span className="text-xs font-medium">{(user.userName || user.email || 'User').split(' ')[0]}</span>
                ) : (
                  <span className="text-xs font-medium hidden lg:inline">SIGN IN</span>
                )}
              </button>
              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-100 rounded-lg py-2 z-50 animate-fadeIn">
                  {user ? (
                    <>
                      <Link
                        to="/account"
                        onClick={() => setIsAccountDropdownOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Profile Information
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsAccountDropdownOpen(false)}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        onClick={() => setIsAccountDropdownOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Sign in to your account
                      </Link>
                      <Link
                        to="/auth/register"
                        onClick={() => setIsAccountDropdownOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t"
                      >
                        Create new account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white animate-slideIn">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm tracking-wide ${
                      item.highlight ? 'text-red-600 font-semibold' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.menu && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.menu.featured.slice(0, 3).map((link) => (
                        <Link
                          key={link.label}
                          to={link.link}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-sm text-gray-500"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
