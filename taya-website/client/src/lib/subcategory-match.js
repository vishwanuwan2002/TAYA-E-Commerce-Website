const SUBCATEGORY_KEYWORDS = {
  tees: ['tee', 't-shirt', 't shirt', 'crew neck'],
  shirts: ['shirt', 'jersey'],
  polos: ['polo'],
  shorts: ['short'],
  tanks: ['tank'],
  compressions: ['compression'],
  'hoodies-jackets': ['hoodie', 'jacket', 'crewneck'],
  'joggers-pants': ['jogger', 'pant', 'pants', 'cargo', 'legging', 'jeggings'],
  'crop-tops': ['crop'],
  'sports-bras': ['sports bra', 'bra'],
  leggings: ['legging', 'jeggings'],
  skirts: ['skirt'],
  athleisure: ['athleisure', 'lounge', 'jogger', 'legging'],
  essentials: ['essential', 'classic'],
  seamless: ['seamless'],
  premium: ['premium'],
  oversize: ['oversize', 'oversized'],
};

function normalizeText(value) {
  return String(value || '').toLowerCase();
}

export function matchesSubcategorySlug(product, slug) {
  if (!slug) return true;

  const productSubcategory = normalizeText(product?.subcategory).trim();
  if (productSubcategory && productSubcategory === normalizeText(slug)) {
    return true;
  }

  const keywords = SUBCATEGORY_KEYWORDS[slug] || [slug.replace(/-/g, ' ')];
  const searchable = [
    normalizeText(product?.title),
    normalizeText(product?.name),
    normalizeText(product?.description),
  ].join(' ');

  return keywords.some((keyword) => searchable.includes(keyword));
}
