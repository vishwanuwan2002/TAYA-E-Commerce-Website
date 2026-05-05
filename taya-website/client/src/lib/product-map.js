import {
  productWomenFront,
  productWomenBack,
  productMenFront,
  productMenBack,
  productAccessoriesFront,
  productAccessoriesBack,
  productUnisexFront,
  productUnisexBack,
  cardNeutral,
} from '../assets';

const categoryImageMap = {
  women: [productWomenFront, productWomenBack],
  men: [productMenFront, productMenBack],
  accessories: [productAccessoriesFront, productAccessoriesBack],
  unisex: [productUnisexFront, productUnisexBack],
};

const categorySizeMap = {
  women: ['XS', 'S', 'M', 'L', 'XL'],
  men: ['S', 'M', 'L', 'XL', 'XXL'],
  accessories: ['S', 'M', 'L'],
  unisex: ['S', 'M', 'L', 'XL'],
};

function parseSizes(sizeValue, category) {
  if (Array.isArray(sizeValue) && sizeValue.length > 0) {
    return sizeValue;
  }

  if (typeof sizeValue === 'string' && sizeValue.trim()) {
    return sizeValue
      .split(',')
      .map((size) => size.trim())
      .filter(Boolean);
  }

  return categorySizeMap[category] || ['S', 'M', 'L', 'XL'];
}

function buildProductImages(product) {
  if (product?.image) {
    return [product.image, product.image];
  }

  return categoryImageMap[product?.category] || [cardNeutral, cardNeutral];
}

export function mapDbProductToUi(product) {
  if (!product) return null;

  const uiCategory = product.category || 'accessories';
  const images = buildProductImages(product);
  const title = product.title || product.name || 'Product';
  const description = product.description || `Premium ${title.toLowerCase()} crafted for everyday wear.`;
  const stock = Number(product.totalStock ?? product.stock ?? 0);

  return {
    ...product,
    id: product.id,
    _id: product.id,
    title,
    name: title,
    description,
    category: uiCategory,
    brand: product.brand || uiCategory,
    color: product.size || uiCategory,
    price: Number(product.price || 0),
    salePrice: Number(product.salePrice || 0),
    totalStock: stock,
    stock,
    currency: 'LKR',
    sizes: parseSizes(product.size, uiCategory),
    images,
    isNew: false,
    isBestSeller: false,
  };
}

export function mapDbProductsToUi(products) {
  return (products || []).map(mapDbProductToUi).filter(Boolean);
}