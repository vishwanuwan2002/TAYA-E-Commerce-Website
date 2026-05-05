const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const rows = await prisma.$queryRawUnsafe('PRAGMA table_info("Product")');
    console.log(rows.map((row) => ({ name: row.name, type: row.type, notnull: row.notnull })));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
