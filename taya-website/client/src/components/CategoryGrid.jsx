import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

function CategoryGrid({ title, subtitle, categories, linkTo }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Build your style</p>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={linkTo ? `${linkTo}/${category.slug}` : '#'}
            className="group block relative overflow-hidden"
          >
            <div className="aspect-[4/5] overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                fallbackText={category.name}
                fallbackBackground="#d9d9d9"
                fallbackForeground="#444444"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-center text-sm md:text-base font-medium tracking-wide">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
