import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Listproduct.css';
import UpdateProduct from '../Updateproduct/Updateproduct';
import add_product_icon from '../../assets/Product_Cart.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';
import Navbar from './Navbar';
import Adminfooter from '../AdminFooter/Footer';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Reporthead from '../Assets/firehead.png'

const Listproduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const componentRef = useRef();

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/products/all');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
    const interval = setInterval(() => {
      fetchInfo();
    }, 40000); // Fetch data every minute (60000 milliseconds)
    return () => clearInterval(interval);
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/products/remove/${id}`, {
        method: 'DELETE',
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

  const generatePDF = () => {
    const doc = new jsPDF();

    const logoImg = new Image() 
    logoImg.src = Reporthead; // Change this to your logo source
    logoImg.onload = () => {
      const imgWidth = 210; // Adjust the width of the logo as needed
      const imgHeight = 50;
      doc.addImage(logoImg, 'PNG', 0, 0, imgWidth, imgHeight);
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      doc.setFontSize(10);
      doc.text("Date: " + date, 10, 55);

      // Add title
      doc.setTextColor("black");
      doc.setFontSize(20);
      doc.setFont("bold");
      doc.text("Inventory Report 2024", 105, 65, { align: "center" });

      // Table headers
      const headers = [
        'Product',
        'Title',
        'Old Price',
        'New Price',
        'Quantity',
      ];

      // AutoTable options
      const tableOptions = {
        startY: 80, // Start position for the table
        head: [headers], // Include table headers
        styles: {
          cellPadding: 5,
          fontSize: 12,
          valign: 'middle', // vertical alignment
          halign: 'center', // horizontal alignment
          textColor: [0, 0, 0], // Text color
          fillColor: [211, 211, 211] // Fill color
        },
      };

      // Table data (user details)
      const userData = allProducts.map((product,index) => [
        index+1,
        product.name,
        product.old_price,
        product.new_price,
        product.quantity,
      ]); 

      // Add table data to options
      tableOptions.body = userData;

      // Add table
      doc.autoTable(tableOptions);

      // Save PDF
      doc.save("product_report.pdf");
    };
  };

  return (
    <div>
      <Navbar/>
      <div className="space"></div>
      <div className='listproduct' ref={componentRef}>
        <div className="listproduct-header">
          <h1>All Products List</h1>
          <button className="generate-pdf-button" onClick={generatePDF}>Generate Report</button>
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
                <p>Rs.{product.old_price.toFixed(2)}</p>
                <p>Rs.{product.new_price.toFixed(2)}</p>
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
            fetchInfo={fetchInfo}
          />
        )}
      </div>
      <div className="space"></div>
      <Adminfooter/>
    </div>
  );
};

export default Listproduct;
