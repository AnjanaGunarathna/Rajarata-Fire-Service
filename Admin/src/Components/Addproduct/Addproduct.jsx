import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    quantity: "",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    if (!productDetails.name || !productDetails.quantity || !productDetails.new_price || !productDetails.old_price || !image) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }

    let responsData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responsData = data;
      });

    if (responsData.success) {
      product.image = responsData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            alert("Product Added");
            window.location.href = "/listproduct"; // Navigate to product list page
          } else {
            alert("Failed to add product");
          }
        });
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
        />
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
          />
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
          />
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
        />
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
