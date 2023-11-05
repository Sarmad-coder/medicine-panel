import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import URL from '../../Url';
import { useNavigate } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import CreatePayment from './CreatePayment';
import { toast } from 'react-toastify';
import { Button, Modal } from 'antd';
import ViewPayment from './ViewPayment';

const Purchase = () => {
    const navigate = useNavigate()
    const [viewPaymentModal, setViewPaymentModal] = useState(false);
    const [createPaymentModal, setCreatePaymentModal] = useState(false);
    const [singlePurchase, setSinglePurchase] = useState({})
    const [allProduct, setAllProduct] = useState([])
    const [allSupplier, setAllSupplier] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [allPayment, setAllPayment] = useState([])
    useEffect(() => {
        axios.get(`${URL}/purchasedetail/get`).then((res) => {
            setAllProduct(res?.data?.data)
        })
        axios.get(`${URL}/supplier`).then((res) => {
            setAllSupplier(res?.data?.data)
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
        axios.get(`${URL}/paymentmethod`).then((res) => {
            setAllPayment(res?.data?.data)
        })
    }, [])
    const fn_createPayment = (item) => {
        setSinglePurchase(item)
        setCreatePaymentModal(true)
    }
    const fn_viewPayment = (item) => {
        setSinglePurchase(item)
        setViewPaymentModal(true)
    }
    return (
        <div className="content-section p-3 pt-0">
            <ViewPayment Modal={Modal} Button={Button} viewPaymentModal={viewPaymentModal} setViewPaymentModal={setViewPaymentModal} URL={URL} toast={toast} singlePurchase={singlePurchase} allSupplier={allSupplier} allWarehouse={allWarehouse} />
            <CreatePayment Modal={Modal} Button={Button} createPaymentModal={createPaymentModal} setCreatePaymentModal={setCreatePaymentModal} URL={URL} toast={toast} singlePurchase={singlePurchase} allPayment={allPayment} setAllProduct={setAllProduct} />
            <p className='dashboadHeading' >Purchase</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/createpurchase")}>
                                    Create
                                </button>
                            </div>
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>
                                        <select name="warehouse_table_length" aria-controls="warehouse_table" class="form-select form-select-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="-1">All</option>
                                        </select>
                                    </label>

                                    <label style={{ marginLeft: "5px" }}>
                                        <select name="warehouse_table_length" aria-controls="warehouse_table" class="form-select form-select-sm">
                                            <option value="10">Export</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="-1">All</option>
                                        </select>
                                    </label>

                                </div>
                                <div>
                                    <label><input type="search" class="form-control form-control-sm" placeholder="Search..." aria-controls="warehouse_table" /></label>
                                </div>
                            </section>
                            <div className="table-responsive mt-3">
                                <table
                                    id="warehouse_table"
                                    className="display table dataTable no-footer"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr >
                                            <th>Date</th>
                                            <th>Supplier</th>
                                            <th>Warehouse</th>
                                            <th>Qty</th>
                                            <th>Grand Total</th>
                                            <th>Paid</th>
                                            <th>Due</th>
                                            <th>Payment Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allProduct && allProduct?.map(item => (
                                            <tr>
                                                <td>{new Date(item?.createdAt).toDateString()}</td>
                                                <td>{allSupplier?.filter(i => i?._id === item?.supplier)[0]?.name}</td>
                                                <td>{allWarehouse?.filter(i => i?._id === item?.wh)[0]?.name}</td>
                                                <td>{item?.whQty} {item?.unitProduct}</td>
                                                <td>${item?.whQty * item?.productPrice}</td>
                                                <td>${item?.paid}</td>
                                                <td>${item?.due}</td>
                                                <td style={{ textTransform: "capitalize" }}>{item?.paymentStatus}</td>
                                                <td>
                                                    <div class="dropdown drp_action">
                                                        <button class=" dropdown-toggle drp_suplier " type="button" data-bs-toggle="dropdown" >
                                                            <span>Action</span>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li style={{ cursor: "pointer" }} onClick={() => fn_viewPayment(item)}><BsEye />Purchase Details</li>
                                                            <li style={{ cursor: "pointer" }} onClick={() => fn_createPayment(item)}><FiEdit />Create Payment</li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="app-footer">
                <div class="row">
                    <div class="col-md-9">
                        <p><strong>Posly - POS With Ultimate Inventory</strong></p>
                        <div class="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
                            <img class="logo" src="https://posly.getstocky.com/images/logo-default.svg" alt="" />
                            <div>
                                <p class="m-0">© 2023  Posly v1.1</p>
                                <p class="m-0">All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
