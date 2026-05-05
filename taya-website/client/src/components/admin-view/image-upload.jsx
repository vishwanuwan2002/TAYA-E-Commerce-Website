import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { API_BASE_URL } from "../../config/api.js";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${API_BASE_URL}/admin/products/upload-image`,
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <div className="mb-4 flex items-center justify-between">
        <Label className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">Product image</Label>
        <span className="text-xs text-zinc-500">JPG, PNG, WEBP</span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-70" : ""
        } group rounded-3xl border border-dashed border-white/15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_45%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))] p-5 shadow-inner shadow-black/30 transition-colors hover:border-white/25`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`$
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-4 text-center text-zinc-300 transition-colors group-hover:bg-black/30`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
              <UploadCloudIcon className="h-7 w-7" />
            </div>
            <span className="text-sm font-medium text-zinc-200">Drag & drop or click to upload image</span>
            <span className="text-xs text-zinc-500">Choose a clear product photo for the card preview.</span>
          </Label>
        ) : imageLoadingState ? (
          <div className="space-y-3">
            <Skeleton className="h-56 rounded-2xl bg-white/10" />
            <Skeleton className="h-5 w-48 rounded-full bg-white/10" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <img
                src={URL.createObjectURL(imageFile)}
                alt={imageFile.name}
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <FileIcon className="h-8 w-8 shrink-0 text-white" />
                <p className="truncate text-sm font-medium text-zinc-100">{imageFile.name}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:bg-red-500/10 hover:text-red-300"
                onClick={handleRemoveImage}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;