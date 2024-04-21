import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/Logofiretrans.png'
import cart_icon from '../Assets/cart_icon.png'
import prole_icon from '../Assets/profile.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const [menu,setMenu] = useState("home");
    const {getTotalCartItems} = useContext(ShopContext);
  return (
    <div>
        <div className="navbar">
            <div className="nav-log">
                <img src={logo} alt="" />
                <p>Rajarata Fire</p>
            </div>
            <ul className="nav-manu">
                <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("shops")}}><Link style={{textDecoration: 'none'}} to='/shops'>Shop</Link>{menu==="shops"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("projects")}}><Link style={{textDecoration: 'none'}} to='/projects'>Project</Link>{menu==="projects"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("branches")}}>Branch{menu==="branches"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("feedbacks")}}>Feedback{menu==="feedbacks"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <button>Login</button>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-counter">{getTotalCartItems()}</div>
                <img src={prole_icon} alt="" />
            </div>
            
        </div>
    </div>
  )
}

export default Navbar
