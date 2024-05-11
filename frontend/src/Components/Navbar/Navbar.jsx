import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/Logofiretrans.png'
import cart_icon from '../Assets/cart_icon.png'
import prole_icon from '../Assets/profile.png'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartItems } = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setMenu('home');
                break;
            case '/shops':
                setMenu('shops');
                break;
            case '/projects':
                setMenu('projects');
                break;
            case '/branches':
                setMenu('branches');
                break;
            case '/feedbacks':
                setMenu('feedbacks');
                break;
            default:
                setMenu('home');
        }
    }, [location.pathname]);

    return (
        <div>
            <div className="navbar">
                <div className="nav-log">
                    <img src={logo} alt="" />
                    <p>Rajarata Fire</p>
                </div>
                <ul className="nav-manu">
                    <li onClick={() => { setMenu("home") }}>
                        <Link style={menu === "home" ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }} to='/'>Home</Link>
                        {menu === "home" ? <hr /> : <></>}
                    </li>
                    <li onClick={() => { setMenu("shops") }}>
                        <Link style={menu === "shops" ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }} to='/shops'>Shop</Link>
                        {menu === "shops" ? <hr /> : <></>}
                    </li>
                    <li onClick={() => { setMenu("projects") }}>
                        <Link style={menu === "projects" ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }} to='/projects'>Project</Link>
                        {menu === "projects" ? <hr /> : <></>}
                    </li>
                    <li onClick={() => { setMenu("branches") }}>
                        <Link style={menu === "branches" ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }} to='/branches'>Branch</Link>
                        {menu === "branches" ? <hr /> : <></>}
                    </li>
                    <li onClick={() => { setMenu("feedbacks") }}>
                        <Link style={menu === "feedbacks" ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }} to='/feedbacks'>Feedback</Link>
                        {menu === "feedbacks" ? <hr /> : <></>}
                    </li>
                </ul>
                <div className="nav-login-cart">
                    {localStorage.getItem('auth-token')
                        ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                        : <Link to='/loginsignup'><button>Login</button></Link>}
                    <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                    <div className="nav-cart-counter">{getTotalCartItems()}</div>
                    <Link to='/profile'><img src={prole_icon} alt="" /></Link>
                </div>

            </div>
        </div>
    )
}

export default Navbar
