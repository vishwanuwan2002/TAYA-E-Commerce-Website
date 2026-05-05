const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const count = await prisma.product.count();
    const first = await prisma.product.findFirst({ orderBy: { createdAt: 'asc' } });
    console.log(JSON.stringify({ count, first: first ? { id: first.id, title: first.title, category: first.category, stock: first.stock } : null }, null, 2));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
