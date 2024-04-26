import React, { useState } from 'react';
import './Updateproduct.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Updateproduct = ({ product, onClose, fetchInfo }) => {
  const [productDetails, setProductDetails] = useState({
    name: product.name,
    quantity: product.quantity,
    new_price: product.new_price,
    old_price: product.old_price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateproduct = async () => {
    if (
      !productDetails.name ||
      !productDetails.quantity ||
      !productDetails.new_price ||
      !productDetails.old_price
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/products/update/${product.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productDetails),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success('Product updated successfully');
        fetchInfo();
        onClose();
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  return (
    <div className="update-product-modal">
      <div className="update-product-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Update Product</h2>
        <div className="update-product-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={productDetails.quantity}
            onChange={handleChange}
          />
          <label htmlFor="new_price">New Price:</label>
          <input
            type="number"
            id="new_price"
            name="new_price"
            value={productDetails.new_price}
            onChange={handleChange}
          />
          <label htmlFor="old_price">Old Price:</label>
          <input
            type="number"
            id="old_price"
            name="old_price"
            value={productDetails.old_price}
            onChange={handleChange}
          />
          <button onClick={updateproduct}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Updateproduct;
