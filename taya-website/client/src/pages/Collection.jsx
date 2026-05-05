import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '../store/shop/products-slice';
import ProductCard from '../components/ProductCard';
import { mapDbProductsToUi } from '../lib/product-map';
import { matchesSubcategorySlug } from '../lib/subcategory-match';

function Collection() {
  const { category, subcategory } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedSize, setSelectedSize] = useState('all');
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  }, [dispatch]);

  const products = mapDbProductsToUi(productList);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (category === 'best-sellers') {
      result = result.filter((p) => p.isBestSeller);
    } else if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (subcategory && subcategory !== 'new' && subcategory !== 'best-sellers') {
      result = result.filter((p) => matchesSubcategorySlug(p, subcategory));
    }

    if (selectedSize !== 'all') {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = [...result].filter((p) => p.isNew);
        break;
      default:
        break;
    }

    return result;
  }, [products, category, subcategory, sortBy, selectedSize]);

  const collectionTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
    : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">{collectionTitle}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight capitalize">
          {subcategory ? subcategory.replace('-', ' ') : collectionTitle}
        </h1>
        <p className="text-gray-500 mt-2">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm hover:text-gray-600 transition-colors lg:hidden"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <div className="hidden lg:flex items-center gap-4">
          <span className="text-sm text-gray-500">Filter by:</span>
          <div className="flex gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? 'all' : size)}
                className={`px-3 py-1 text-xs border transition-colors ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border-none focus:outline-none cursor-pointer bg-transparent"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-40 animate-fadeIn">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 animate-slideIn max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? 'all' : size)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-black text-white py-3 text-sm tracking-wide"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found</p>
          <Link to="/collection/women" className="text-sm underline mt-4 inline-block">
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Collection;
