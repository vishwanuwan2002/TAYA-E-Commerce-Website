import ImageWithFallback from '../ImageWithFallback';
import { mapDbProductToUi } from '../../lib/product-map';
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function formatLkrPrice(value) {
  const numericValue = Number(value || 0);
  return `LKR ${numericValue.toLocaleString()}`;
}

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const displayProduct = mapDbProductToUi(product) || product;
  const productImage = displayProduct?.images?.[0] || displayProduct?.image || '';

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <ImageWithFallback
            src={productImage}
            alt={displayProduct?.title}
            fallbackText={displayProduct?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{displayProduct?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                displayProduct?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {formatLkrPrice(displayProduct?.price)}
            </span>
            {displayProduct?.salePrice > 0 ? (
              <span className="text-lg font-bold">{formatLkrPrice(displayProduct?.salePrice)}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(displayProduct?._id || displayProduct?.id);
              setFormData(displayProduct);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(displayProduct?._id || displayProduct?.id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;