import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Link } from 'react-router-dom';
import './OrderReport.css'; // Import CSS file
import firelogo from '../Assets/firelogo_big.png'

export default function Report() {

    const conponentPDF = useRef();
    const [search, setSearch] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        function getOrders() {
            axios.get("http://localhost:4000/order/allreport").then((res) => {
                setOrders(res.data);
                console.log(res);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getOrders();
    }, []);

    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: "userdata",
        onAfterPrint: () => alert("Download Successfully")
    });

    return (
        <div>

          

            <div class="order-r-container">
                <div class="order-report-container">
                    <div ref={conponentPDF}>
                        <h1 class="order-title"><img src={firelogo} alt="..." />&nbsp;&nbsp;<b>Rajarata Fire Service</b></h1>
                        <h3 class="order-title2"><b>Order Report</b></h3>
                        <br />
                        <table class="order-table">
                            <thead class="order-table-header">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Order Number</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.filter((order) => {
                                    return search.toString().toLowerCase() === '' ? order : order.onumber.toString().toLowerCase().includes(search);
                                }).map((order, index) => {
                                    return (
                                        <tr key={order._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td><a href={`/get/${order._id}`} class="order-name-link">{order.name}</a></td>
                                            <td>{order.onumber}</td>
                                            <td>{order.address}</td>
                                            <td>{order.email}</td>
                                            <td>{order.tell}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <div className="ordercomp"><h6>2015 Rajarata Fire Service (PVT) Ltd.</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div class="order-btn-container">
                <button class="btn btn-download" onClick={generatePDF}>
                    <i class="fas fa-download"></i>&nbsp;Download
                </button>
            </div>

            <br />
            <br />
            <br />
        </div>
    )
}
