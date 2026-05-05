import { Button } from "@/components/ui/button";
// Using new SVG banners
const bannerOne = "/images/banner-1.svg";
const bannerTwo = "/images/banner-2.svg";
const bannerThree = "/images/banner-3.svg";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-white via-red-50 to-red-100">
        {true
          ? [bannerOne, bannerTwo, bannerThree].map((banner, index) => (
              <img
                src={banner}
                key={index} // Added key prop here
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + 3) %
                3
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 glass-modern border-red-300/50 text-red-600 hover:bg-white/90 hover:scale-110 transition-all duration-300 shadow-xl animate-fade-in-left"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % 3
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 glass-modern border-red-300/50 text-red-600 hover:bg-white/90 hover:scale-110 transition-all duration-300 shadow-xl animate-fade-in-right"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-black animate-fade-in-up delay-300">
            Shop by category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categoriesWithIcon.map((category) => (
              <Card
                onClick={() => handleNavigateToListingPage(category, "category")}
                key={category.id}
                className="cursor-pointer overflow-hidden rounded-[1.5rem] border-2 border-red-200/60 bg-white shadow-md shadow-red-200/20 transition-all duration-500 hover:bg-white/95 hover:shadow-lg hover:shadow-red-300/40 hover:border-red-300 hover:scale-105"
              >
                <CardContent className="flex flex-col items-center justify-center p-8 group">
                  <category.icon size={56} className="mb-4 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:text-red-600 animate-float" />
                  <h3 className="text-lg font-semibold text-black text-center group-hover:text-red-600 transition-all duration-300 group-hover:scale-105">
                    {category.label}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full px-4 py-12 md:px-6 lg:py-16 bg-gradient-to-b from-gray-50/50 to-white">
        <h2 className="text-3xl font-bold mb-8 text-black text-center animate-fade-in-up delay-200">Shop by Brand</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brandsWithIcon.map((brand) => (
            <Card
              onClick={() => handleNavigateToListingPage(brand, "brand")}
              key={brand.id}
              className="cursor-pointer overflow-hidden rounded-[1.5rem] border-2 border-red-200/60 bg-white shadow-md shadow-red-200/20 transition-all duration-500 hover:bg-white/95 hover:shadow-lg hover:shadow-red-300/40 hover:border-red-300 hover:scale-105"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 group">
                <brand.icon size={50} className="mb-3 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:text-red-600 animate-float" />
                <h3 className="text-base font-semibold text-black text-center group-hover:text-red-600 transition-all duration-300 group-hover:scale-105">
                  {brand.label}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-black animate-fade-in-up delay-300">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <ShoppingProductTile
                    key={`${productItem.id}-${index}`}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
