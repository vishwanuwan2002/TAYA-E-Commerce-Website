const prisma = require("../../helpers/prisma-client");

function toArrayParam(value) {
  if (Array.isArray(value)) {
    return value.flatMap((item) => String(item).split(",")).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

const getFilteredProducts_endpoint = async (req, res) => {
  try {
    const {
      category = [],
      brand = [],
      sortBy = "price-lowtohigh",
      subcategory = [],
    } = req.query;

    const categoryFilter = toArrayParam(category);
    const brandFilter = toArrayParam(brand);
    const subcategoryFilter = toArrayParam(subcategory);

    let where = {};
    if (categoryFilter?.length > 0 && categoryFilter[0] !== "") {
      where.category = { in: categoryFilter };
    }
    if (brandFilter?.length > 0 && brandFilter[0] !== "") {
      where.brand = { in: brandFilter };
    }
    if (subcategoryFilter?.length > 0 && subcategoryFilter[0] !== "") {
      where.subcategory = { in: subcategoryFilter };
    }

    let orderBy = {};
    switch (sortBy) {
      case "price-lowtohigh":
        orderBy = { price: "asc" };
        break;
      case "price-hightolow":
        orderBy = { price: "desc" };
        break;
      case "title-atoz":
        orderBy = { title: "asc" };
        break;
      case "title-ztoa":
        orderBy = { title: "desc" };
        break;
      default:
        orderBy = { price: "asc" };
        break;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
    });

    res.status(200).json({
      success: true,
      products,
      data: products,
      currentPage: 1,
      totalPages: 1,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
        const product = await prisma.product.findUnique({ where: { id } });

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts_endpoint, getProductDetails };