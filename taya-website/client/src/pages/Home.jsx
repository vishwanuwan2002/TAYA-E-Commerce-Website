import { categories, activities } from '../data/products';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import CategoryGrid from '../components/CategoryGrid';
import PromoBanner from '../components/PromoBanner';
import ActivityTabs from '../components/ActivityTabs';
import ImageWithFallback from '../components/ImageWithFallback';
import { promoWomen, promoShoes, cardWomen, cardMen, cardNeutral } from '../assets';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '../store/shop/products-slice';
import { mapDbProductsToUi } from '../lib/product-map';

function Home() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  }, [dispatch]);

  const products = mapDbProductsToUi(productList);
  const newProducts = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);
  const accessories = products.filter((p) => p.category === 'accessories');

  return (
    <div>
      <HeroBanner />

      <ProductGrid
        title="Shop the latest styles"
        products={newProducts}
        linkTo="/collection/women"
        linkText="Shop all"
      />

      <PromoBanner
        imageDesktop={promoWomen}
        imageMobile={promoWomen}
        title="Shop Women&apos;s Collection"
        subtitle="Built for comfort, styled for every day."
        ctaText="Shop now"
        ctaLink="/collection/women"
      />

      <CategoryGrid
        title="Shop by Category"
        subtitle="Build your style"
        categories={categories.women}
        linkTo="/collection/women"
      />

      <CategoryGrid
        title="Shop by Category"
        subtitle="Build your style"
        categories={categories.men}
        linkTo="/collection/men"
      />

      <ProductGrid
        title="Flying Off Shelves"
        products={bestSellers}
        linkTo="/collection/best-sellers"
        linkText="Shop all"
      />

      <ActivityTabs activities={activities} />

      <PromoBanner
        imageDesktop={promoShoes}
        imageMobile={promoShoes}
        title="Shop Shoes"
        subtitle="Explore the shoe collection"
        ctaText="Shop now"
        ctaLink="/collection/accessories"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/collection/women" className="group block relative overflow-hidden">
            <div className="aspect-[4/5] bg-gray-100">
              <ImageWithFallback
                src={cardWomen}
                alt="Shop Women"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-lg font-medium tracking-wide">Shop Womens</h3>
            </div>
          </a>
          <a href="/collection/men" className="group block relative overflow-hidden">
            <div className="aspect-[4/5] bg-gray-100">
              <ImageWithFallback
                src={cardMen}
                alt="Shop Men"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-lg font-medium tracking-wide">Shop Mens</h3>
            </div>
          </a>
          <a href="/collection/accessories" className="group block relative overflow-hidden">
            <div className="aspect-[4/5] bg-gray-100">
              <ImageWithFallback
                src={cardNeutral}
                alt="Shop Accessories"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-lg font-medium tracking-wide">Shop Accessories</h3>
            </div>
          </a>
        </div>
      </section>

      <ProductGrid
        title="Accessories"
        products={accessories}
        linkTo="/collection/accessories"
        linkText="Shop all"
      />

    </div>
  );
}

export default Home;
