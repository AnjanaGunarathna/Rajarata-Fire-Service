
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import LoginSignup from './Pages/LoginSignup';
import Listproduct from './Components/Listproduct/Listproduct';
import Addproduct from './Components/Addproduct/Addproduct';
import Updateproduct from './Components/Updateproduct/Updateproduct';
import Dashboard from './Pages/Dashboard';
import AdminFooter from './Components/AdminFooter/Footer';
import AdminNavbar from './Components/AdminNavbar/Navbar';
import Supplier from './Components/Supplier/Supplier';
import Suppleredit from './Components/Supplier/Edit';
import Details from './Components/Supplier/Details';
import DetailsReport from './Components/Supplier/DetailsReport';
import Register from './Components/Supplier/Register';
import Complain from './Pages/Complain';
import User from './Components/Feedback/getfeed/User';
import Add from './Components/Feedback/addfeedback/Add';
import Feedbackedit from './Components/Feedback/updatefeed/Edit';
import Optfeed from './Components/Feedback/feedopt/Optfeed'
import Teamfeed from './Components/Feedback/teamfeed/Teamfeed';
import Feechart from './Components/Feedback/feedchart/Feechart';
import Feedbackdashboard from './Components/Feedback/feedbackdashboard/Feedbackdashboard';


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
          <Route path="/complain" element={<Navbar />} />
          <Route path="/feedbacks" element={<Navbar />} />

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
          <Route path="/edit/:id" element={<Suppleredit />} />
          <Route path="/suppliermanagement/view/:id" element={<Details />} />
          <Route path="/detailsReport/:id" element={<DetailsReport />}/>


          <Route path='/complain' element={<Complain/>}/>

          <Route path='/user' element={<User/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/edit/:id' element={<Feedbackedit/>}/>
          <Route path='/feedbacks' element={<Optfeed/>}/>
          <Route path='/teamfeed' element={<Teamfeed/>}/>
          <Route path='/feechart' element={<Feechart/>}/>
          <Route path='/feedbackmanagement' element={<Feedbackdashboard/>}/>
          
          


        </Routes>

        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/shops" element={<Footer />} />
          <Route path="/product" element={<Footer />} />
          <Route path="/loginsignup" element={<Footer />} />
          <Route path="/cart" element={<Footer />} />
          <Route path="/complain" element={<Footer />} />
          <Route path="/feedbacks" element={<Footer />} />
        
          <Route path="/admin" element={<AdminFooter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
