import React, { useState } from 'react';
import { api } from '../../config';

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    size: '',
    stock: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/products', formData);
      onProductAdded();
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-4">Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            name="size"
            placeholder="Size"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
            required
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 mt-4"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
