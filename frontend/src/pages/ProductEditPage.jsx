import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../features/productsApiSlice";
import { Button, InputField } from "../components";
import { toast } from "react-hot-toast";
import {
  AiOutlineShoppingCart,
  AiOutlineDollar,
  AiOutlineFileImage,
  AiOutlineTags,
  AiOutlineAppstore,
  AiOutlineNumber,
  AiOutlineFileText,
} from "react-icons/ai";

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return toast.error(error?.data?.message || error.error);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="text"
            fieldName="name"
            label="Product Name"
            placeholder="Enter product name"
            icon={AiOutlineShoppingCart}
            value={productData.name}
            onChange={handleInputChange}
          />

          <InputField
            type="number"
            fieldName="price"
            label="Price"
            placeholder="Enter price"
            icon={AiOutlineDollar}
            value={productData.price}
            onChange={handleInputChange}
          />

          <InputField
            type="text"
            fieldName="image"
            label="Image URL"
            placeholder="Enter image URL"
            icon={AiOutlineFileImage}
            value={productData.image}
            onChange={handleInputChange}
          />

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

          <InputField
            type="number"
            fieldName="countInStock"
            label="Count In Stock"
            placeholder="Enter stock count"
            icon={AiOutlineNumber}
            value={productData.countInStock}
            onChange={handleInputChange}
          />

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <AiOutlineFileText className="size-5" />
              </div>
              <textarea
                id="description"
                rows="4"
                value={productData.description}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                placeholder="Enter product description"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              className="bg-gray-500 hover:bg-gray-600"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </Button>
            <Button type="submit">
              {loadingUpdate ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
