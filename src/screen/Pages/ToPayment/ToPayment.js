import axios from "axios";

import React, { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import CreateExpense from "../DailyBook/CreateExpense";
import URL from "../../Url";
import { FiDelete, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import CreateUser from "../UserManagment/User/CreateUser";
import UpdateUser from "../UserManagment/User/UpdateUser";
import { Oval } from "react-loader-spinner";
import CreatePayment from "./../Purchase/CreatePayment";
import EditToPayment from "./EditToPayment";
const { confirm } = Modal;

const ToPayment = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(`${URL}toPayment/getAll`).then((res) => {
      console.log(res.data);
      setAllUsers(res?.data);
    });
  }, []);
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this User?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete(`${URL}ToPayment/deleteById/${id}`).then((res) => {
          // console.log(res?.data);
          if (res?.status === 200) {
            toast.success("User Deleted");
            axios.get(`${URL}toPayment/getAll`).then((res) => {
              console.log(res.data);
              setAllUsers(res?.data);
            });
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="content-section p-3">
      <CreatePayment
        Modal={Modal}
        Button={Button}
        createPaymentModal={modalOpen}
        setCreatePaymentModal={setModalOpen}
        URL={URL}
        toast={toast}
        setAllUser={setAllUsers}
        Oval={Oval}
      />
      <EditToPayment
        Modal={Modal}
        Button={Button}
        createPaymentModal={updateModalOpen}
        setCreatePaymentModal={setUpdateModalOpen}
        getData={data}
        URL={URL}
        toast={toast}
        setAllUser={setAllUsers}
        userDetail={userDetail}
      />
      <p className="dashboadHeading">To Payment</p>
      <hr className="dashboardLine" />
      <div className="separator-breadcrumb border-top"></div>
      <div id="section_Warehouse_list" className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="text-end mb-3">
                <button
                  className="new_Warehouse btn btn-outline-primary btn-md m-1"
                  onClick={() => setModalOpen(true)}
                >
                  Create
                </button>
              </div>
              <section
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="d-flex">
                  <label>
                    <select
                      name="warehouse_table_length"
                      aria-controls="warehouse_table"
                      class="form-select form-select-sm"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="-1">All</option>
                    </select>
                  </label>
                  <label style={{ marginLeft: "5px" }}>
                    <select
                      name="warehouse_table_length"
                      aria-controls="warehouse_table"
                      class="form-select form-select-sm"
                    >
                      <option value="10">Export</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="-1">All</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="search"
                      class="form-control form-control-sm"
                      placeholder="Search..."
                      aria-controls="warehouse_table"
                    />
                  </label>
                </div>
              </section>
              <div className="table-responsive">
                <table
                  id="warehouse_table"
                  className="table mt-3 w-100"
                  aria-describedby="warehouse_table_info"
                >
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Amount</th>
                      <th>Descripton</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers?.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.amount}</td>
                        <td>{item?.discription}</td>
                        <td>{item?.createdAt}</td>

                        <td>
                          <i
                            className="fa-solid text-danger fa-trash "
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              showDeleteConfirm(item?._id);
                            }}
                          >
                            {" "}
                          </i>
                          <i
                            className="fa-solid text-warning fa-pen-to-square ms-2 "
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdateModalOpen(true);
                              setData(item)
                            }}
                          ></i>
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
            <p>
              <strong>
                Royal Poultry Services - POS With Ultimate Inventory
              </strong>
            </p>
            <div class="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
            <img
                  class="logo"
                  src="https://i.ibb.co/Hp7LJsc/ROYAL-CHICKS-LOGO-01-01-01.png"
                  alt=""
                  style={{ width: "120px" }}
                />
              <div>
                <p class="m-0">© 2023 Posly v1.1</p>
                <p class="m-0">All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToPayment;
