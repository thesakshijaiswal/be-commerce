import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadFileHandlerMutation,
} from "../features/productsApiSlice";
import { Button, InputField } from "../components";
import { toast } from "react-hot-toast";
import {
  AiOutlineShoppingCart,
  AiOutlineFileImage,
  AiOutlineTags,
  AiOutlineAppstore,
  AiOutlineNumber,
  AiOutlineFileText,
} from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { getImageSource } from "../utils/helper";

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
  });

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: uploadLoading }] =
    useUploadFileHandlerMutation();

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        ...productData,
      }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/i)) {
      toast.error("File type not supported. Please upload JPEG, PNG or WebP");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB");
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await uploadProductImage({ image: reader.result }).unwrap();
        toast.success(res.message);
        setProductData({
          ...productData,
          image: res.image,
        });
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    };
  };

  if (isLoading)
    return <div className="text-center text-secondary">Loading...</div>;
  if (error) return toast.error(error?.data?.message || error.error);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="gap-4 md:flex">
            <div className="flex flex-col gap-7 md:w-1/2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-medium text-primary">
                  General Information
                </h3>

                <InputField
                  type="text"
                  fieldName="name"
                  label="Product Name"
                  placeholder="Enter product name"
                  icon={AiOutlineShoppingCart}
                  value={productData.name}
                  onChange={handleInputChange}
                />

                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="select-none px-1 py-2 text-base text-gray-700"
                  >
                    Description
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <AiOutlineFileText className="size-5" />
                    </div>
                    <textarea
                      id="description"
                      rows="6"
                      value={productData.description}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                      placeholder="Enter product description"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-medium text-primary">Brand and Category</h3>

                <InputField
                  type="text"
                  fieldName="brand"
                  label="Brand"
                  placeholder="Enter brand"
                  icon={AiOutlineTags}
                  value={productData.brand}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  fieldName="category"
                  label="Category"
                  placeholder="Enter category"
                  icon={AiOutlineAppstore}
                  value={productData.category}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-7 md:mt-0 md:w-1/2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-medium text-primary">
                  Pricing and Inventory
                </h3>

                <InputField
                  type="number"
                  fieldName="price"
                  label="Price"
                  placeholder="Enter price"
                  icon={BsCurrencyRupee}
                  value={productData.price}
                  onChange={handleInputChange}
                />

                <InputField
                  type="number"
                  fieldName="countInStock"
                  label="Count In Stock"
                  placeholder="Enter stock count"
                  icon={AiOutlineNumber}
                  value={productData.countInStock}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-medium text-primary">Product Media</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="relative">
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-primary">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex h-28 w-12 items-center justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary">
                            <AiOutlineFileImage className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="cursor-pointer font-medium text-primary hover:underline">
                            Click to upload
                          </span>
                          <span className="text-gray-500">
                            {" "}
                            or drag and drop
                          </span>
                        </div>
                      </div>

                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={uploadFileHandler}
                        disabled={uploadLoading}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </div>

                    {uploadLoading && (
                      <div className="mt-2 text-center text-sm text-gray-500">
                        Uploading image...
                      </div>
                    )}
                  </div>

                  <div className="flex min-h-32 items-center justify-center rounded-lg bg-gray-100">
                    {productData.image ? (
                      <img
                        src={getImageSource(productData.image)}
                        alt="Product Preview"
                        className="max-h-32 max-w-full rounded-lg object-contain p-2 text-secondary"
                      />
                    ) : (
                      <div className="text-sm text-gray-400">
                        Preview will appear here
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              className="bg-gray-500 hover:bg-gray-600"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/products");
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loadingUpdate}>
              {loadingUpdate ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
