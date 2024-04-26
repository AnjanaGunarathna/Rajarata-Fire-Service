import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addproduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    quantity: '',
    new_price: '',
    old_price: ''
  });
  const [errors, setErrors] = useState({});

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    // Reset the error message when the user starts typing again
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const { name, quantity, new_price, old_price } = productDetails;
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Product title is required';
    }
    if (!quantity.trim()) {
      errors.quantity = 'Quantity is required';
    } else if (!/^\d+$/.test(quantity)) {
      errors.quantity = 'Quantity must be a number';
    }
    if (!new_price.trim()) {
      errors.new_price = 'Offer Price is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(new_price)) {
      errors.new_price = 'Invalid Offer Price';
    }
    if (!old_price.trim()) {
      errors.old_price = 'Price is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(old_price)) {
      errors.old_price = 'Invalid Price';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const Add_Product = async () => {
    if (!validateForm() || !image) {
      toast.error('Please fill in all fields correctly and upload an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('product', image);

      const uploadResponse = await fetch('http://localhost:4000/api/products/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const productData = { ...productDetails, image: uploadData.image_url };

        const addProductResponse = await fetch('http://localhost:4000/api/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          toast.success('Product added successfully');
          window.location.href = '/listproduct'; 
        } else {
          toast.error('Failed to add product');
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          required
          className={errors.name && 'error'}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
            required
            className={errors.old_price && 'error'}
            pattern="^\d+(\.\d{1,2})?$"
          />
          {errors.old_price && <div className="error-message">{errors.old_price}</div>}
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
            required
            className={errors.new_price && 'error'}
            pattern="^\d+(\.\d{1,2})?$"
          />
          {errors.new_price && <div className="error-message">{errors.new_price}</div>}
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Quantity</p>
        <input
          value={productDetails.quantity}
          onChange={changeHandler}
          type="text"
          name="quantity"
          placeholder="Type here"
          required
          className={errors.quantity && 'error'}
          pattern="[0-9]*"
        />
        {errors.quantity && <div className="error-message">{errors.quantity}</div>}
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-image"
            alt=""
            required
          />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <div>
        <button onClick={Add_Product} className="addproduct-btn">
          ADD
        </button>
        <Link to="/listproduct">
          <button className="addproduct-cancel-btn">
            CANCEL
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Addproduct;
