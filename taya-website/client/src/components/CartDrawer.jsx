import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getCurrentUser } from '../lib/local-auth';
import ImageWithFallback from './ImageWithFallback';

function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Oops, cannot perform this action. You must sign in first.');
      setIsCartOpen(false);
      navigate('/auth/login');
      return;
    }
    setIsCartOpen(false);
    navigate('/shop/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col animate-slideIn">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium tracking-wide">YOUR CART</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                to="/collection/women"
                onClick={() => setIsCartOpen(false)}
                className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b">
                  <Link
                    to={`/product/${item.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-24 h-32 flex-shrink-0 overflow-hidden"
                  >
                    <ImageWithFallback
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      fallbackText={item.name}
                      fallbackBackground="#f0f0f0"
                      fallbackForeground="#333333"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                      <p className="text-xs text-gray-500">{item.color}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">
                          {item.currency} {(item.price * item.quantity).toLocaleString()}.00
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="text-lg font-medium">
                LKR {cartTotal.toLocaleString()}.00
              </span>
            </div>
            <p className="text-xs text-gray-500">Tax included. Shipping calculated at checkout.</p>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-4 text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
              CHECK OUT
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full border border-black text-black py-4 text-sm tracking-wide hover:bg-gray-100 transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
