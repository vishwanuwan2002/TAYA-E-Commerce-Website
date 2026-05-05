const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const products = require('../data/products-for-seed.js');

async function main() {
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: {
        title: product.name,
        name: product.name,
        price: product.price,
        category: product.category,
        size: product.sizes.join(','),
        totalStock: product.stock,
        stock: product.stock,
        description: product.description,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
