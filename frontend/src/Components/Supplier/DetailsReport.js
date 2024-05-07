import React, { useEffect, useState, useRef } from "react";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import MailIcon from "@mui/icons-material/Mail";
import InventoryIcon from "@mui/icons-material/Inventory";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import DescriptionIcon from "@mui/icons-material/Description";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import AdminFooter from '../AdminFooter/Footer'
import Fireheader from '../Assets/firehead.png'
import Navbar from './Navbar/Navbar'

const DetailsReport = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const componentRef = useRef(null); // Ref for accessing component DOM

  const { id } = useParams();
  const navigate = useNavigate(); // Changed from useHistory

  const getdata = async () => {
    try {
      // Fetch user details
      const userRes = await fetch(`http://localhost:4000/supplierdetails/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await userRes.json();

      if (userRes.status === 422 || !userData) {
        console.log("error fetching user details");
      } else {
        setUserdata(userData);

        // Fetch product details associated with the user
        const productRes = await fetch(`http://localhost:4000/supplierdetails/getProductDetails/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const productData = await productRes.json();

        if (productRes.status === 422 || !productData) {
          console.log("error fetching product details");
        } else {
          setProductDetails(productData);
          generatePDF(); // Generate PDF after fetching data
        }
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const generatePDF = () => {
    console.log("Generating PDF...");
    const element = componentRef.current;
    if (!element) {
      console.error("Component DOM element not found.");
      return;
    }
    console.log("Element found:", element);

    // Create a new div for the PDF content with the header image and margin
    const pdfContent = document.createElement("div");
    pdfContent.innerHTML = `
      <div style="margin: 20px;"> <!-- Add margin here -->
        <div style="text-align: center;">
          <img src=${Fireheader} alt="Supplier Logo" style="width: 750px; height: 185px;" />
        </div>
        <h1></h1>
        ${element.innerHTML}
      </div>
      
    `;

    // Use html2pdf to generate PDF
    html2pdf().from(pdfContent).set({ dpi: 300 }).save();
  };
  
  return (
    <div>
      <Navbar/>
    <div id="detailsReport" className="mt-5">
      <div className="container mt-5" ref={componentRef}>
        <br></br>
        <center>
          <h2> Supplier Details</h2>
        </center>
        <div className="row">
          <div className="left_view col-lg-6 col-md-6 col-12">
            <br></br>
            <p className="mt-3">
              <PersonIcon /> Supplier Name : <span>{getuserdata.name}</span>
            </p>
            <p className="mt-3">
              <StoreIcon /> Company : <span>{getuserdata.company}</span>
            </p>
            <p className="mt-3">
              <MailIcon /> Email: <span>{getuserdata.email}</span>{" "}
            </p>
            <p className="mt-3">
              <InventoryIcon /> Product Type: <span>{getuserdata.type}</span>
            </p>
            <p className="mt-3">
              <PhoneIcon /> Contact number:
              <span> +94 {getuserdata.mobile} </span>
            </p>
            <p className="mt-3">
              <PlaceIcon /> Address: <span> {getuserdata.add} </span>
            </p>
            <p className="mt-3">
              <DescriptionIcon /> Description: <span>{getuserdata.desc}</span>
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div>
            <center>
              <h3>Stock Details</h3>
            </center>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Value</th>
                <th scope="col">Quantity</th>
                <th scope="col">Stock Value (Rs.)</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map((product, index) => (
                <tr key={index}>
                  <td>{product.date}</td>
                  <td>{product.productName}</td>
                  <td>{product.productValue}</td>
                  <td>{product.quantity}</td>
                  <td>{product.stock}.00</td>{" "}
                  {/* Render the calculated stock value */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <AdminFooter/>
    </div>
  );
};

export default DetailsReport;

