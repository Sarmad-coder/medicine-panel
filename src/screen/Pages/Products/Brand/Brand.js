import React, { useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { Button, Modal } from 'antd';
import URL from '../../../Url';
import CreateBrand from './CreateBrand';

const Brands = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="content-section p-3">
            <CreateBrand Modal={Modal} Button={Button} modalOpen={modalOpen} setModalOpen={setModalOpen} URL={URL} />
            <p className='dashboadHeading' >Brands</p >
            <hr className='dashboardLine' />
            <div id="section_Warehouse_list" className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-end mb-3">
                                <button className="new_Warehouse btn btn-outline-primary btn-md m-1" onClick={() => setModalOpen(true)}>
                                    Create
                                </button>
                            </div>
                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex '>
                                    <label>
                                        <select class="form-select form-select-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="-1">All</option>
                                        </select>
                                    </label>

                                    <label style={{ marginLeft: "5px" }}>
                                        <select class="form-select form-select-sm">
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
                                        <tr>
                                            <th >Image</th>
                                            <th >Name</th>
                                            <th >Description</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

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

export default Brands;
