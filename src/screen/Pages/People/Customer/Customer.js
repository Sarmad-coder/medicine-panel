import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import URL from '../../../Url';

const Customer = () => {
    const navigate = useNavigate()
    const [allCustomer, setAllCustomer] = useState([])
    useEffect(() => {
        axios.get(`${URL}/customer`).then((res) => {
            setAllCustomer(res?.data?.data)
        })
    }, [])
    return (
        <div className="content-section p-3">
            <p className='dashboadHeading' >Customers</p>
            <hr className='dashboardLine' />

            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => navigate("/customer/create")}>
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
                                            <th style={{ width: "105px" }}>Name</th>
                                            <th style={{ width: "120px" }}>Phone</th>
                                            <th style={{ width: "105px" }}>City</th>
                                            <th>Total Purchase Due</th>
                                            <th>Total Purchase Return Due</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allCustomer && allCustomer?.map((item) => (
                                            <tr>
                                                <td>{item?.name}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.city}</td>
                                                <td>$ 0</td>
                                                <td>$ 0</td>
                                                <td>
                                                    <a id="1" className="edit cursor-pointer ul-link-action text-success" data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <i className="" data-bs-toggle="modal" data-bs-target="#exampleModal"> <FiEye /></i>
                                                    </a>&nbsp;&nbsp;
                                                    <a id="1" className="delete cursor-pointer ul-link-action text-danger" data-toggle="tooltip" data-placement="top" title="Remove">
                                                        <i className="i-Close-Window"><FiDelete /></i>
                                                    </a>&nbsp;&nbsp;
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

export default Customer;
