import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import './Allorders.css';

export default function AllRequests() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        function getOrders() {
            axios.get("http://localhost:4000/order/all").then((res) => {
                setOrders(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getOrders();
    }, []);

    return (
        <div className="order-container">
           

            <div className="order-search-container">
                <form className="order-search-form">
                    <input
                        className="order-search-input"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by Order Number"
                        aria-label="Search"
                    />
                </form>
            </div>

            <div className="order-table-container">
                <table className="order-table">
                    <thead className="order-table-header">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Order Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.filter((order) => {
                            return search.trim() === '' ? order : order.onumber.toString().toLowerCase().includes(search.toLowerCase());
                        }).map((order, index) => (
                            <tr key={order._id}>
                                <th scope="row">{index + 1}</th>
                                <td><Link to={`/get/${order._id}`} className="order-link">{order.name}</Link></td>
                                <td>{order.onumber}</td>
                                <td>{order.email}</td>
                                <td className="order-status">{order.ostatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
