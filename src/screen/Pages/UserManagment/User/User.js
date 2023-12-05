import axios from "axios";
import React, { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import URL from "../../../Url";
import { FiDelete, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

const User = () => {
  const move=useNavigate()
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [getData, setGetData] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [updateUsers, setUpdateUsers] = useState([]);
  useEffect(() => {
    axios.get(`${URL}user/getCustomer`).then((res) => {
      console.log(res);
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
        axios.delete(`${URL}user/deleteById/${id}`).then((res) => {
          console.log(res?.data);
          if (toast.success("Customer Deleted")) {
            axios.get(`${URL}user/getCustomer`).then((res) => {
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
      <CreateUser
        Modal={Modal}
        Button={Button}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        URL={URL}
        toast={toast}
        setAllUsers={setAllUsers}
        Oval={Oval}
  
      />
      <UpdateUser
        Modal={Modal}
        Button={Button}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        // setUpdateModalOpen={setUpdateModalOpen}
        URL={URL}
        toast={toast}
        setAllUsers={setAllUsers}
        userDetail={userDetail}
        getData={getData}
        setUpdateUsers={setUpdateUsers}
      />
      <p className="dashboadHeading">User</p>
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
                  className="table mt-3"
                  aria-describedby="warehouse_table_info"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Address</th>
                     
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers &&
                      allUsers?.map((item) => (
                        <tr style={{ lineHeight: "4rem" }}>
                          <td>{item?.accountNo}</td>
                        
                          <td>{item?.customerName}</td>
                          <td>{item?.address}</td>
                         
                          <td>
                            <i
                              className="fa-solid text-danger fa-trash "
                              onClick={() => {
                                setUserDetail(item);

                                showDeleteConfirm(item?._id);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {" "}
                            </i>
                            <i
                              className="fa-solid text-warning fa-pen-to-square ms-2 "
                              onClick={() => {
                                setUpdateModalOpen(true);
                                setGetData(item);
                              }}
                              style={{ cursor: "pointer" }}
                            ></i>
                           
                             <i
                             class="fa-solid fa-eye ms-2"
                              onClick={() => {
                                move(`/accountLedger/${item._id}`)
                              }}
                              style={{ cursor: "pointer" }}
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
                style={{ maxWidth: "120px" }}
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

export default User;
