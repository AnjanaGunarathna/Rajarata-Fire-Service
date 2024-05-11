
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Cookies from 'js-cookie'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import Employeedashboard from './Components/EmployeeSalary/Employeedashboard';
import Salary from './Components/EmployeeSalary/Salary/Salary';
import Profile from './Pages/Profile';
import Userdashboard from './Components/Usermanagement/Userdashboard';
import Branchdashboard from './Components/Branches/Branchdashboard';
import AllOrders from './Components/Orders/AllOrders';
import Report from './Components/Orders/Report';
import OrderUpdates from './Components/Orders/OrderUpdates';
import OnlineD from './Components/Orders/OnlineD';
import CashOnD from './Components/Orders/CashOnD';
import UpdateOrder from './Components/Orders/UpdateOrder';
import Onavbar from './Components/Orders/Onavbar';
import Branchhome from './Pages/Branch/Branch';








function App() {
  const [allProducts, setAllProducts] = useState([]);

  const[cookieVal,setCookieVal]=useState(Cookies.get("username"))

  useEffect(()=>{

    const interval=setInterval(() => {

      const updatedCookie=Cookies.get("username")
      if(updatedCookie!==cookieVal){
        setCookieVal(updatedCookie)
      }
      
    },1000)

    return()=>{clearInterval(interval)}

  },[cookieVal])
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
          <Route path="/product/:productId" element={<Navbar />} />
          <Route path="/admin" element={<AdminNavbar />} />
          <Route path='/projects' element={<Navbar/>}/>
          <Route path='/profile' element={<Navbar/>}/>
          <Route path='/ordermanagement' element={<Onavbar/>}/>
          <Route path="/allreport" element={<Onavbar/>}/>
          <Route path="/allorder" element={<Onavbar/>}/>
          <Route path="/all" element={<Onavbar/>}/>
          <Route path="/online" element={<Navbar/>}/>
          <Route path="/cashon" element={<Navbar/>}/>
          <Route path="/branches" element={<Navbar/>}/>
        
        </Routes>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shops" element={<Shop />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />

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

          
          
    



            <Route path='/employeemanagement' element={<Employeedashboard/>}/>
            <Route path='/salarymanage' element={<Salary/>}/>

            <Route path='/usermanagement' element={<Userdashboard/>}/>
         
            <Route path='/branchmanagement' element={<Branchdashboard/>}/>

            
            <Route path='/ordermanagement' element={<AllOrders/>}/>
            <Route path="/all" element={<AllOrders/>}/>
            <Route path="/allreport" element={<Report/>}/>
            <Route path="/allorder" element={<OrderUpdates/>}/>
            <Route path="/online" element={<OnlineD/>}/>
            <Route path="/cashon" element={<CashOnD/>}/>
            <Route path="/update/:id" element={<UpdateOrder/>}/>
            <Route path="/get/:id" element={<UpdateOrder/>}/>



            <Route path="/branches" element={<Branchhome/>}/>





          
        </Routes>

        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/shops" element={<Footer />} />
          <Route path="/product" element={<Footer />} />
          <Route path="/loginsignup" element={<Footer />} />
          <Route path="/cart" element={<Footer />} />
          <Route path="/complain" element={<Footer />} />
          <Route path="/feedbacks" element={<Footer />} />
          <Route path="/product/:productId" element={<Footer />} />
          <Route path="/admin" element={<AdminFooter />} />
          <Route path="/employeemanagement" element={<AdminFooter />} />
          <Route path="/salarymanage" element={<AdminFooter />} />
          <Route path="/usermanagement" element={<AdminFooter />} />
          <Route path="/branchmanagement" element={<AdminFooter />} />
    
          <Route path='/profile' element={<Footer/>}/>
          <Route path="/online" element={<Footer/>}/>
          <Route path="/cashon" element={<Footer/>}/>
          <Route path="/allreport" element={<AdminFooter/>}/>
          <Route path="/allorder" element={<AdminFooter/>}/>
          <Route path="/all" element={<AdminFooter/>}/>
          <Route path="/branches" element={<Footer/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}



export default App;
