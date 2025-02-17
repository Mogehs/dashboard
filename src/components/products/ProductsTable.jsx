import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import AlertDialog from "../alert/AlertDialog";
import Update from "../popup/Update";
import AddProduct from "../popup/Add";

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Tesla Model 3",
    category: "Electric",
    price: 99.99,
    stock: 143,
    sales: 1200,
  },
  {
    id: 2,
    name: "Ford Mustang",
    category: "Sports",
    price: 149.99,
    stock: 89,
    sales: 800,
  },
  {
    id: 3,
    name: "BMW X5",
    category: "SUV",
    price: 199.99,
    stock: 56,
    sales: 650,
  },
  {
    id: 4,
    name: "Toyota Corolla",
    category: "Sedan",
    price: 59.99,
    stock: 210,
    sales: 950,
  },
  {
    id: 5,
    name: "Mercedes-Benz E-Class",
    category: "Luxury",
    price: 179.99,
    stock: 78,
    sales: 720,
  },
];

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(PRODUCT_DATA);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      )
    );
  };

  const handleDelete = () => {
    if (selectedProductId !== null) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProductId)
      );
      setFilteredProducts((prev) =>
        prev.filter((product) => product.id !== selectedProductId)
      );
      setDialogOpen(false);
      setSelectedProductId(null);
    }
  };

  const handleUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setFilteredProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setFilteredProducts((prev) => [...prev, newProduct]);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => setAddProductOpen(true)}
        className="px-4 py-2 mb-10 bg-blue-700 text-white rounded-lg hover:bg-blue-500 transition"
      >
        + Add New Car
      </motion.button>
      <motion.div
        className="bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-blue-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-blue-700">Cars List</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search cars..."
              className="bg-white text-blue-700 placeholder-blue-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search
              className="absolute left-3 top-2.5 text-blue-700"
              size={18}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Cars
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Rentals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700 flex gap-2 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                      alt="Product img"
                      className="size-10 rounded-full"
                    />
                    {product.name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                    <button
                      className="text-indigo-500 hover:text-indigo-300 mr-2"
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setUpdateOpen(true);
                      }}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-300"
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setDialogOpen(true);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <AlertDialog
          message="Do you really want to delete this item?"
          isOpen={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setSelectedProductId(null);
          }}
          onConfirm={handleDelete}
        />
      </motion.div>
      <Update
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        productId={selectedProductId}
        onUpdate={handleUpdate}
      />
      <AddProduct
        isOpen={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onAdd={handleAddProduct}
      />
    </>
  );
};

export default ProductsTable;
