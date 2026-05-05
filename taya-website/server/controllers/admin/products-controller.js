const { imageUploadUtil } = require("../../helpers/cloudinary");
const prisma = require("../../helpers/prisma-client");

const normalizeProductForClient = (product) => ({
  ...product,
  _id: product.id,
});

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      name,
      description,
      category,
      brand,
      size,
      price,
      salePrice,
      stock,
      totalStock,
      averageReview,
      subcategory,
    } = req.body;

    const resolvedTitle = title || name;
    if (!resolvedTitle) {
      return res.status(400).json({
        success: false,
        message: "Product title or name is required",
      });
    }

    const resolvedPrice = Number(price || 0);
    const resolvedStock = Number(totalStock ?? stock ?? 0);

    const newlyCreatedProduct = await prisma.product.create({
      data: {
        image: image || null,
        title: resolvedTitle,
        name: name || resolvedTitle,
        description: description || null,
        category: category || null,
        subcategory: subcategory || null,
        brand: brand || null,
        size: size || null,
        price: resolvedPrice,
        salePrice: Number(salePrice || 0),
        stock: resolvedStock,
        totalStock: resolvedStock,
        averageReview: Number(averageReview || 0),
      },
    });

    res.status(201).json({
      success: true,
      data: normalizeProductForClient(newlyCreatedProduct),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: listOfProducts.map(normalizeProductForClient),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      name,
      description,
      category,
      brand,
      size,
      price,
      salePrice,
      stock,
      totalStock,
      averageReview,
      subcategory,
    } = req.body;

    let findProduct = await prisma.product.findUnique({ where: { id } });

    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct = await prisma.product.update({
      where: { id },
      data: {
        title: title ?? name ?? findProduct.title,
        name: name ?? title ?? findProduct.name,
        description: description ?? findProduct.description,
        category: category ?? findProduct.category,
        subcategory: subcategory ?? findProduct.subcategory,
        brand: brand ?? findProduct.brand,
        size: size ?? findProduct.size,
        price: price === "" ? 0 : Number(price ?? findProduct.price),
        salePrice:
          salePrice === "" ? 0 : Number(salePrice ?? findProduct.salePrice),
        stock: Number(stock ?? totalStock ?? findProduct.stock),
        totalStock: Number(totalStock ?? stock ?? findProduct.totalStock),
        image: image ?? findProduct.image,
        averageReview: Number(averageReview ?? findProduct.averageReview),
      },
    });

    res.status(200).json({
      success: true,
      data: normalizeProductForClient(findProduct),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    await prisma.product.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};