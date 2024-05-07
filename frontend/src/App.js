
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSignup from './Pages/LoginSignup';
import Listproduct from './Components/Listproduct/Listproduct';
import Addproduct from './Components/Addproduct/Addproduct';
import Updateproduct from './Components/Updateproduct/Updateproduct';
import Dashboard from './Pages/Dashboard';
import AdminFooter from './Components/AdminFooter/Footer';
import AdminNavbar from './Components/AdminNavbar/Navbar';
import Supplier from './Components/Supplier/Supplier';
import Details from './Components/Supplier/Details';
import DetailsReport from './Components/Supplier/DetailsReport';
import Edit from './Components/Supplier/Edit';
import Register from './Components/Supplier/Register';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/shops" element={<Navbar />} />
          <Route path="/product" element={<Navbar />} />
          <Route path="/loginsignup" element={<Navbar />} />
          <Route path="/cart" element={<Navbar />} />
          <Route path="/admin" element={<AdminNavbar />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shops" element={<Shop />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/productmanagement" element={<Listproduct />} />
          <Route path="/listproduct" element={<Listproduct />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/updateproduct" element={<Updateproduct />} />

          
          <Route path="/suppliermanagement" element={<Supplier />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/suppliermanagement/view/:id" element={<Details />} />
          <Route path="/detailsReport/:id" element={<DetailsReport />}/>
        </Routes>
        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/shops" element={<Footer />} />
          <Route path="/product" element={<Footer />} />
          <Route path="/loginsignup" element={<Footer />} />
          <Route path="/cart" element={<Footer />} />
          <Route path="/admin" element={<AdminFooter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
