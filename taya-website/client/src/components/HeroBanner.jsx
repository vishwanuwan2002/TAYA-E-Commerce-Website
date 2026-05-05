import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import { heroBanner, promoWomen, promoShoes } from '../assets';

function HeroBanner() {
  const slides = [heroBanner, promoWomen, promoShoes];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <section className="relative w-full">
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-gradient-to-r from-gray-900 to-gray-800 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 flex w-full h-full transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide} className="w-full h-full shrink-0">
              <ImageWithFallback
                src={slide}
                alt={`Hero Banner ${index + 1}`}
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="font-bbh-bartle text-4xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight mb-4 text-center w-fit mx-auto"
          >
            <span className="block whitespace-nowrap">Dress better</span>
            <span className="block whitespace-nowrap">everyday</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
            Explore our collection of premium activewear designed for comfort, performance, and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collection/women"
              className="bg-white text-black px-8 py-3 text-sm tracking-wider font-medium hover:bg-gray-100 transition-colors"
            >
              SHOP WOMENS
            </Link>
            <Link
              to="/collection/men"
              className="border-2 border-white text-white px-8 py-3 text-sm tracking-wider font-medium hover:bg-white hover:text-black transition-colors"
            >
              SHOP MENS
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={`hero-dot-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'w-8 bg-white'
                    : 'w-2.5 bg-white/60 hover:bg-white/85'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
