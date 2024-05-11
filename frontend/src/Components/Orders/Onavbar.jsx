import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/Logofiretrans.png';
import { Link, useLocation } from 'react-router-dom';

const Onavbar = () => {

    const [menu, setMenu] = useState("home");
    
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
                    <img src={logo} alt=""/>
                    <p>Rajarata Fire</p>
                </div>
                <ul className="nav-manu">
                    <li onClick={() => { setMenu("shops") }}>
                        <Link style={menu === "shops" ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }} to='/all'>Dasboard</Link>
                        {menu === "shops" ? <hr /> : <></>}
                    </li>
                    <li onClick={() => { setMenu("projects") }}>
                        <Link style={menu === "projects" ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }} to='/allorder'>Orders</Link>
                        {menu === "projects" ? <hr /> : <></>}
                    </li>
                    <li onClick={() => { setMenu("branches") }}>
                        <Link style={menu === "branches" ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'black' }} to='/allreport'>Report</Link>
                        {menu === "branches" ? <hr /> : <></>}
                    </li>
                </ul>
            </div>
        </div>
    );
};


export default Onavbar
