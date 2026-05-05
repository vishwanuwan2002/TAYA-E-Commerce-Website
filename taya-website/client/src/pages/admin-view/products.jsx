import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapDbProductToUi } from "@/lib/product-map";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const selectedProduct =
    currentEditedId !== null
      ? productList?.find((product) => (product.id || product._id) === currentEditedId)
      : null;
  const selectedPreviewProduct = selectedProduct ? mapDbProductToUi(selectedProduct) : null;
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(formData, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem.id || productItem._id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="w-full overflow-y-auto border-l border-white/10 bg-zinc-950 p-0 text-zinc-100 sm:max-w-2xl">
          <div className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_28%),linear-gradient(180deg,_#111111_0%,_#090909_100%)]">
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <SheetHeader className="space-y-3 text-left">
                <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                  {currentEditedId !== null ? "Edit Mode" : "Create Mode"}
                </div>
                <SheetTitle className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {currentEditedId !== null ? "Refine Product Details" : "Add a New Product"}
                </SheetTitle>
                <p className="max-w-xl text-sm leading-6 text-zinc-400">
                  {currentEditedId !== null
                    ? "Update the product and keep the storefront in sync instantly."
                    : "Create a polished product entry with pricing, stock, and imagery in one flow."}
                </p>
              </SheetHeader>
            </div>

            <div className="space-y-5 px-6 py-6 sm:px-8">
              {currentEditedId !== null ? (
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/25">
                  <div className="flex items-center gap-4 p-4">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                      <ImageWithFallback
                        src={selectedPreviewProduct?.images?.[0] || selectedPreviewProduct?.image || ""}
                        alt={selectedPreviewProduct?.title || "Selected product"}
                        fallbackText={selectedPreviewProduct?.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">Editing</p>
                      <h3 className="truncate text-base font-semibold text-white">
                        {selectedProduct?.title || "Selected product"}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        LKR {Number(selectedProduct?.price || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Live sync
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
                <ProductImageUpload
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadedImageUrl={setUploadedImageUrl}
                  setImageLoadingState={setImageLoadingState}
                  imageLoadingState={imageLoadingState}
                  isEditMode={currentEditedId !== null}
                />
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
                <CommonForm
                  onSubmit={onSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText={currentEditedId !== null ? "Save Changes" : "Create Product"}
                  submitButtonClassName={
                    currentEditedId !== null
                      ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 hover:from-emerald-400 hover:via-emerald-300 hover:to-cyan-300"
                      : "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:from-sky-400 hover:via-blue-400 hover:to-indigo-400"
                  }
                  formControls={addProductFormElements}
                  isBtnDisabled={!isFormValid()}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;