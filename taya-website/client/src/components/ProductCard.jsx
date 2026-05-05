import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const productImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image, product.image].filter(Boolean);
  const primaryImage = productImages[0];
  const secondaryImage = productImages[1] || productImages[0];

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-50 mb-3">
        <ImageWithFallback
          src={primaryImage}
          alt={product.name}
          className="w-full aspect-[4/5] object-cover transition-opacity duration-300"
          loading="lazy"
          fallbackText={product.name}
          fallbackBackground="#f0f0f0"
          fallbackForeground="#333333"
        />
        <ImageWithFallback
          src={secondaryImage}
          alt={`${product.name} hover`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          fallbackText={`${product.name} hover`}
          fallbackBackground="#e7e7e7"
          fallbackForeground="#333333"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 tracking-wide">
            NEW
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium group-hover:underline truncate">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">{product.color}</p>
        <p className="text-sm font-medium">
          {product.currency} {product.price.toLocaleString()}.00
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
