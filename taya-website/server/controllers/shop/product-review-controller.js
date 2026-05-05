const prisma = require("../../helpers/prisma-client");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

        const order = await prisma.order.findFirst({
      where: {
        userId,
        cartItems: {
          array_contains: [{ productId }],
        },
        // orderStatus: { in: ["confirmed", "delivered"] },
      },
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await prisma.productReview.findUnique({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = await prisma.productReview.create({
      data: {
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue,
      },
    });

    const reviews = await prisma.productReview.findMany({
      where: { productId },
    });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await prisma.product.update({
      where: { id: productId },
      data: { averageReview },
    });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

        const reviews = await prisma.productReview.findMany({ where: { productId } });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductReview, getProductReviews };