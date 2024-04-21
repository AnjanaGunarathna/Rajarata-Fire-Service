import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Listproduct.css';
import UpdateProduct from '../Updateproduct/Updateproduct';
import add_product_icon from '../../assets/Product_Cart.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Listproduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      });
      await fetchInfo();
      toast.success('Product removed successfully');
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error('Failed to remove product');
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  return (
    <div className='listproduct'>
      <div className="listproduct-header">
        <h1>All Products List</h1>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
          <div className="add-product-button">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
          </div>
        </Link>
      </div>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Quantity</p>
        <p>Actions</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allProducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>Rs.{product.old_price}</p>
              <p>Rs.{product.new_price}</p>
              <p>{product.quantity}</p>
              <button className="update-button" onClick={() => handleUpdateClick(product)}>Update</button>
              <button className="listproduct-remove-icon" onClick={() => removeProduct(product.id)}>✖︎</button>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
      {isUpdateModalOpen && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setUpdateModalOpen(false)}
          fetchInfo={fetchInfo} // Pass fetchInfo function as a prop
        />
      )}
    </div>
  );
};

export default Listproduct;
