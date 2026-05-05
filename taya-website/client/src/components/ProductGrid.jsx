import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductGrid({ title, products, showLink = true, linkTo = '/collection/women', linkText = 'Shop all' }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">{title}</h2>
        {showLink && (
          <Link
            to={linkTo}
            className="text-sm underline underline-offset-4 hover:no-underline transition-all"
          >
            {linkText}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
