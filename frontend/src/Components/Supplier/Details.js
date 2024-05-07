import React, { useEffect, useState, useRef } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import MailIcon from "@mui/icons-material/Mail";
import InventoryIcon from "@mui/icons-material/Inventory";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink, useParams, useNavigate } from "react-router-dom"; // Changed import
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Profile from '../Assets/profile.png'
import AdminFooter from '../AdminFooter/Footer'
import Navbar from "./Navbar/Navbar";

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productValue: "",
    quantity: "",
    date: "",
    stock: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [emailAddress, setEmailAddress] = useState("");
  const componentRef = useRef(null); // Ref for accessing component DOM
  const { id } = useParams();
  const navigate = useNavigate(); // Changed from useHistory
  const [maxDate, setMaxDate] = useState(new Date());

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
        }
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`http://localhost:4000/supplierdetails/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deleteuser = await res2.json();

      if (res2.status === 422 || !deleteuser) {
        console.log("error");
      } else {
        console.log("user deleted");
        setAlertMessage("User deleted successfully!"); // Set alert message for user deletion
        navigate("/suppliermanagement"); // Changed from history.push
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const addProductDetails = async () => {
    try {
      // Check if all fields are filled
      if (
        !newProduct.productName ||
        !newProduct.productValue ||
        !newProduct.quantity ||
        !newProduct.date
      ) {
        setAlertMessage("Please fill in all fields!"); // Set alert message for incomplete fields
        return;
      }

      const stock = newProduct.productValue * newProduct.quantity;
      const res = await fetch(`http://localhost:4000/supplierdetails/addProductDetails/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newProduct, stock }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        console.log("error adding product details");
      } else {
        console.log("product details added");
        setAlertMessage("Stock added successfully!"); // Set alert message

        // Show success message after a brief delay
        setTimeout(() => {
          setAlertMessage(""); // Clear the alert message after 3 seconds
        }, 3000);

        setNewProduct({
          productName: "",
          productValue: "", // Reset productValue after adding
          quantity: "",
          date: "",
          stock: "",
        });

        // You may choose to refetch the product details after adding a new one
        getdata();

        setShowForm(false); // Close the form after adding details
      }
    } catch (error) {
      console.error("Error adding product details", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`http://localhost:4000/supplierdetails/deleteProduct/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedProduct = await res.json();

      if (res.status === 422 || !deletedProduct) {
        console.log("error deleting product");
      } else {
        console.log("product deleted");
        // Refetch the product details after deleting one
        getdata();

        // Set alert message for product deletion
        setAlertMessage("Stock deleted successfully!");

        // Show success message after a brief delay
        setTimeout(() => {
          setAlertMessage(""); // Clear the alert message after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const sendEmail = async () => {
    try {
      const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${getuserdata.email}`;
      window.open(emailUrl, "_blank");
    } catch (error) {
      console.error("Error opening Gmail", error);
    }
  };

  const handleProductValueChange = (value) => {
    setNewProduct({
      ...newProduct,
      productValue: value,
      stock: value * newProduct.quantity, // Calculate stock value based on productValue and quantity
    });
  };

  const handleQuantityChange = (value) => {
    setNewProduct({
      ...newProduct,
      quantity: value,
      stock: newProduct.productValue * value, // Calculate stock value based on productValue and quantity
    });
  };

  return (
    <div>
      <Navbar/>
    <div className="container mt-5" ref={componentRef}>
      <center>
        <h1 style={{ fontWeight: 400 }}>Supplier Details</h1>
      </center>

      <div className="row">
        <div className="left_view col-lg-6 col-md-6 col-12">
          <img src={Profile} style={{ width: 100 }} />

          <h3 className="mt-5">
            <PersonIcon /> Supplier Name : <span>{getuserdata.name}</span>
          </h3>
          <h3 className="mt-3">
            <StoreIcon /> Company : <span>{getuserdata.company}</span>
          </h3>
          <p className="mt-3">
            <MailIcon /> Email: <span>{getuserdata.email}</span>{" "}
            <button
              className="btn btn-success mx-3"
              onClick={sendEmail}
              disabled={!getuserdata.email} // Disable the button if email is empty
            >
              Send Email
            </button>
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

        <div className="right_view col-lg-5 col-md-6 col-12">
          <div className="add_btn d-flex justify-content-end">
            <NavLink to={`/edit/${getuserdata._id}`}>
              <button className="btn btn-primary mx-3">
                <CreateIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => deleteuser(getuserdata._id)}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>

    
      <div className="mt-3">
        <NavLink to={`/detailsReport/${id}`} className="btn btn-primary">
          View Supplier's Report
        </NavLink>
      </div>

      {showForm && (
        <div className="row mt-5">
          <center>
            <h3>Add Stock Details</h3>
          </center>
          {alertMessage && (
            <div className="alert alert-danger" role="alert">
              {alertMessage}
            </div>
          )}
          <form className="mt-4 w-50 mx-auto">
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    productName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productValue" className="form-label">
                Product Value (Rs.)
              </label>
              <input
                type="text"
                className="form-control"
                id="productValue"
                value={newProduct.productValue}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    productValue: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={newProduct.date}
                max={maxDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <center>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addProductDetails}
              >
                Add Stock Details
              </button>
            </center>
          </form>
        </div>
      )}

      <div>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="mt-5"
        />
      </div>

      {alertMessage && (
        <div
          className={`alert ${
            alertMessage.includes("added") ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {alertMessage}
        </div>
      )}

      <div className="row mt-5">
        <div>
          <center>
            <h3>Stock Details</h3>
          </center>
          <button
            className="btn btn-success mx-3"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Stock
          </button>
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
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <ClearIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <AdminFooter/>
    </div>
  );
};

export default Details;
