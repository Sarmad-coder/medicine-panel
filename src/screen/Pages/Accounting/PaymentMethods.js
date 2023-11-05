import React, { useEffect, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import { Button, Modal } from 'antd';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import URL from '../../Url';
import { toast } from 'react-toastify';


const PaymentMethod = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [title, setTitle] = useState("")
    const [allMethod, setAllMethod] = useState([])
    useEffect(() => {
        axios.get(`${URL}/paymentmethod`).then((res) => {
            setAllMethod(res?.data?.data)
        })
    }, [])
    const fn_submit = () => {
        setLoader(true)
        axios.post(`${URL}/paymentmethod`, { title }).then((res) => {
            if (res?.data?.status === 200) {
                setLoader(false)
                setModalOpen(false)
                toast.success("Payment method Added")
                setTitle("")
                axios.get(`${URL}/paymentmethod`).then((res) => {
                    setAllMethod(res?.data?.data)
                })
            } else {
                setLoader(false)
                toast.error(res?.data?.message)
            }
        })
    }
    return (
        <div className="content-section p-3 pt-0">
            <p className='dashboadHeading' >Payment Method</p >
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
                            <div className="table-responsive">
                                <table
                                    id="warehouse_table"
                                    className="display table dataTable no-footer"
                                    aria-describedby="warehouse_table_info"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr >
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allMethod && allMethod?.map(item => (
                                            <tr className="odd">
                                                <td>{item?.title}</td>
                                                <td>
                                                    <FiEye className='text-success' style={{ cursor: "pointer" }} />
                                                    &nbsp;&nbsp;
                                                    <FiDelete className='text-danger' style={{ cursor: "pointer" }} />
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

            <Modal
                title="Add Payment Method"
                style={{ top: 20 }}
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                width={500}
                footer={[
                    <div>
                        {loader === true ? (
                            <div className="row">
                                <div className="col-10">
                                    <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>
                                    <Button key="ok" type="primary" onClick={fn_submit}>Create</Button>
                                </div>
                                <div className="col-2 text-end">
                                    <Oval
                                        height={33}
                                        width={33}
                                        color="#4fa94d"
                                        visible={true}
                                        secondaryColor="#4fa94d"
                                        strokeWidth={6}
                                        strokeWidthSecondary={7}
                                        style={{
                                            display: 'block',
                                            margin: '0 auto',
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>
                                <Button key="ok" type="primary" onClick={fn_submit}>Create</Button>
                            </>
                        )}
                    </div>
                ]}
            >
                <hr />
                <div className="row">
                    <div className="d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Title*</label>
                        <input type="text" className="productCreateInput" placeholder="Enter Payment Method" required value={title} onChange={(e) => setTitle(e?.target?.value)} />
                    </div>
                </div>
            </Modal>

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

export default PaymentMethod;
