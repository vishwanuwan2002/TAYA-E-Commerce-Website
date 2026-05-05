import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import { promoWomen, promoShoes } from '../assets';

function PromoBanner({ imageDesktop, imageMobile, title, subtitle, ctaText, ctaLink }) {
  return (
    <section className="relative w-full">
      <div className="relative aspect-[16/9] md:aspect-[21/6] overflow-hidden">
        <ImageWithFallback
          src={imageMobile || imageDesktop || promoWomen}
          alt={title}
          className="w-full h-full object-cover md:hidden"
          loading="lazy"
        />
        <ImageWithFallback
          src={imageDesktop || imageMobile || promoShoes}
          alt={title}
          className="w-full h-full object-cover hidden md:block"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          {subtitle && (
            <p className="text-white/80 text-sm md:text-base mb-2 tracking-wide">{subtitle}</p>
          )}
          <h2 className="text-white text-2xl md:text-4xl font-medium mb-6 tracking-tight">{title}</h2>
          <Link
            to={ctaLink}
            className="bg-white text-black px-8 py-3 text-sm tracking-wider font-medium hover:bg-gray-100 transition-colors"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
