import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="group w-full max-w-sm mx-auto overflow-hidden rounded-[1.5rem] border-2 border-red-200/60 bg-white shadow-md shadow-red-200/20 transition-all duration-500 hover:border-red-300 hover:bg-white/95 hover:shadow-xl hover:shadow-red-300/40 hover:scale-105">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative overflow-hidden bg-gradient-to-b from-red-50 to-white h-[280px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white font-bold shadow-xl animate-pulse-red">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-xl">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white font-bold shadow-xl animate-pulse-red">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold mb-3 text-black line-clamp-2 group-hover:text-red-600 transition-all duration-300">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-3 gap-2">
            <span className="text-xs font-medium text-gray-700 bg-red-50/80 px-3 py-1 rounded-full border border-red-200/60 backdrop-blur-sm">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-xs font-medium text-gray-700 bg-red-50/80 px-3 py-1 rounded-full border border-red-200/60 backdrop-blur-sm">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through text-gray-400" : "text-red-600"
                } font-bold text-lg`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold text-red-600">
                  ${product?.salePrice}
                </span>
              ) : null}
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4">
        {product?.totalStock === 0 ? (
          <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed border-0">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold border-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/50 btn-modern"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
