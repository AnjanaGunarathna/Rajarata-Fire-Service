import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './Orderupdate.css';

export default function OrderUpdates() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        function getOrders() {
            axios.get("http://localhost:4000/order/allorder").then((res) => {
                setOrders(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getOrders();
    }, []);

    const deleteOrder = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:4000/order/delete/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            alert("Order Closed Successfully")
        }
    }

    return (
        <div className="order-container">

           

            <div className="order-table-container">
                <br />
                <form className="order-search-form">
                    <input
                        className="order-search-input form-control me-2"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by Order Number"
                        aria-label="Search"
                    />
                </form>
                <br />
                <div>
                    <table className="order-table table table-danger table-striped">
                        <thead className="order-table-header">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Order Number</th>
                                <th scope="col">Address</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.filter((order) => {
                                return search.trim() === '' ? order : order.onumber.toString().toLowerCase().includes(search);
                            }).map((order, index) => (
                                <tr key={order._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td><a href={`/get/${order._id}`} style={{ textDecoration: 'none', color: 'black' }}>{order.name} </a> </td>
                                    <td>{order.onumber}</td>
                                    <td>{order.address}</td>
                                    <td>{order.tell}</td>
                                    <td style={{ color: 'blue' }}>{order.ostatus}</td>
                                    <td>
                                        <a className="btn btn-success" href={`/update/${order._id}`}>
                                            <i className="fas fa-edit"></i>&nbsp;Update
                                        </a>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>
                                            <i className="fas fa-xmark"></i>&nbsp;Cancel Order
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
