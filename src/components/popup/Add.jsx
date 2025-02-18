import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AddProduct = ({ isOpen, onClose, onAdd }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(), // Generates a unique ID based on timestamp
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock, 10),
      sales: parseInt(product.sales, 10),
    };
    onAdd(newProduct);
    onClose();
    setProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      sales: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="absolute inset-0"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white p-6 rounded-lg shadow-xl w-96 relative z-10"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add New Car
        </h2>

        <form onSubmit={handleSubmit}>
          {["name", "category", "price", "stock"].map((field, index) => (
            <div key={index} className="mb-3">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}:
              </label>
              <input
                type={
                  field === "price" || field === "stock" || field === "sales"
                    ? "number"
                    : "text"
                }
                name={field}
                value={product[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>
          ))}

          {/* Image Upload Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Car Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-3 flex justify-center">
              <img
                src={imagePreview}
                alt="Car Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <motion.button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Car
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
