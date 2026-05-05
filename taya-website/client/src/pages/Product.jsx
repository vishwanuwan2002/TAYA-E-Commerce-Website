import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { useCart } from '../context/CartContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '../store/shop/products-slice';
import { mapDbProductsToUi } from '../lib/product-map';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [hasRequestedProducts, setHasRequestedProducts] = useState(false);

  useEffect(() => {
    setHasRequestedProducts(true);
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  }, [dispatch]);

  const products = mapDbProductsToUi(productList);

  const product = useMemo(() => {
    return products.find((p) => p.id === id || p._id === id);
  }, [id, products]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, products]);

  if (!hasRequestedProducts || !productList) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-medium mb-4">Loading product...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-medium mb-4">Product not found</h1>
        <Link to="/" className="text-sm underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, quantity);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/collection/${product.category}`} className="hover:text-black transition-colors capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <div className="relative">
          <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              fallbackText={product.name}
              fallbackBackground="#f3f3f3"
              fallbackForeground="#333333"
            />
          </div>
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="flex gap-2 mt-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-20 overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-black' : 'border-transparent'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                  fallbackText={product.name}
                  fallbackBackground="#f3f3f3"
                  fallbackForeground="#333333"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:py-8">
          {product.isNew && (
            <span className="inline-block bg-black text-white text-xs px-2 py-1 tracking-wide mb-4">
              NEW
            </span>
          )}
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight">{product.name}</h1>
              <p className="text-gray-500 mt-1 capitalize">{product.color}</p>
          <p className="text-xl font-medium mt-4">
            {product.currency} {product.price.toLocaleString()}.00
          </p>
          <p className="text-xs text-gray-400 mt-1">Tax included.</p>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Size</span>
              {sizeError && (
                <span className="text-xs text-red-500">Please select a size</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`min-w-[60px] px-4 py-3 text-sm border transition-colors ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : sizeError
                      ? 'border-red-300 hover:border-red-500'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <span className="text-sm font-medium mb-3 block">Quantity</span>
            <div className="flex items-center border w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-6 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-4 text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
              ADD TO CART
            </button>
          </div>

          <div className="mt-8 space-y-4 pt-8 border-t">
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Premium quality {product.name.toLowerCase()} crafted with high-performance materials.
                Designed for everyday comfort and style. Perfect for active lifestyles and casual wear.
              </p>
            </div>
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>High-quality fabric blend</li>
                <li>Comfortable fit</li>
                <li>Durable construction</li>
                <li>Easy care</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <ProductGrid
          title="You may also like"
          products={relatedProducts}
          showLink={false}
        />
      )}
    </div>
  );
}

export default Product;
