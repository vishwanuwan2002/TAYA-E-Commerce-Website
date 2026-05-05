const fs = require("fs/promises");
const path = require("path");
const prisma = require("../helpers/prisma-client");

async function seedUsers() {
  const usersPath = path.join(__dirname, "..", "data", "users.json");

  try {
    const raw = await fs.readFile(usersPath, "utf8");
    const users = JSON.parse(raw);

    if (!Array.isArray(users)) return;

    for (const user of users) {
      if (!user.email || !user.password || !user.userName) continue;

      await prisma.user.upsert({
        where: { email: user.email.toLowerCase().trim() },
        update: {
          userName: user.userName,
          password: user.password,
          role: user.role || "customer",
        },
        create: {
          userName: user.userName,
          email: user.email.toLowerCase().trim(),
          password: user.password,
          role: user.role || "customer",
        },
      });
    }
  } catch {
    // users.json may not exist yet
  }
}

async function seedProducts() {
  const productsPath = path.join(__dirname, "..", "data", "products.json");

  try {
    const raw = await fs.readFile(productsPath, "utf8");
    const products = JSON.parse(raw);

    if (!Array.isArray(products)) return;

    for (const product of products) {
      if (!product.title) continue;

      await prisma.product.create({
        data: {
          image: product.image || null,
          title: product.title,
          description: product.description || null,
          category: product.category || null,
          brand: product.brand || null,
          price: Number(product.price || 0),
          salePrice: Number(product.salePrice || 0),
          totalStock: Number(product.totalStock || 0),
          averageReview: Number(product.averageReview || 0),
        },
      });
    }
  } catch {
    // products.json may not exist yet
  }
}

async function main() {
  const userCount = await prisma.user.count();
  const productCount = await prisma.product.count();

  if (userCount === 0) {
    await seedUsers();
  }

  if (productCount === 0) {
    await seedProducts();
  }

  const adminExists = await prisma.user.findFirst({ where: { role: "admin" } });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        userName: "Admin",
        email: "admin@example.com",
        password: "$2a$12$2nXfTjA7r8V7m6brE6brTeEJq8A5s4A7Q2y3SkvW76x6v1rI2W5zy",
        role: "admin",
      },
    });
    // Password for seeded admin above is "admin123".
  }

  console.log("SQL seed complete.");
}

main()
  .catch((error) => {
    console.error("SQL seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
