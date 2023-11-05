import axios from "axios";
import CreateExpense from "./CreateExpense";
import React, { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import URL from "../../Url";
import { FiDelete, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import CreateUser from "../UserManagment/User/CreateUser";
import UpdateUser from "../UserManagment/User/UpdateUser";
import { Oval } from "react-loader-spinner";
import EditExpense from "./EditExpense";
import moment from "moment";
const { confirm } = Modal;

const Expense = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [getData, setGetData] = useState({});
  const [date, setDate] = useState({ from: "", to: "" })

  const getAllExpense = async () => {
    try {
      let data = []
      const resp = await axios.get(`${URL}expense/getAll`);

      console.log(resp.data);
      setAllUsers(resp.data);
    } catch (error) {
      console.log(error);
    }


  }
  useEffect(() => {
    getAllExpense()
  }, []);
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this Expense?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete(`${URL}expense/deleteById/${id}`).then((res) => {
          console.log(res?.data);
          if (res?.status === 200) {
            toast.success("Expense Deleted");
            axios.get(`${URL}expense/getAll`).then((res) => {
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

  function fn_onDateChange() {
    console.log(date);
    axios.get(`${URL}expense/getAll`).then((res) => {
      const data = res?.data?.filter(item => {

      
        return item.createdAt >= date.from && item.createdAt <= date.to
  
      })
      setAllUsers(data)
      console.log(data)
      
    });
    ;
  }
  useEffect(() => {
    if (date.from && date.to) {
      fn_onDateChange()
    }
  }, [date.from, date.to])
  return (
    <div className="content-section p-3">
      <CreateExpense
        Modal={Modal}
        Button={Button}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        URL={URL}
        toast={toast}
        setAllUsers={setAllUsers}
        Oval={Oval}
      />
      <EditExpense
        Modal={Modal}
        Button={Button}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}

        setAllUsers={setAllUsers}
        URL={URL}
        toast={toast}
        getData={getData}
      />
      <p className="dashboadHeading">Expense</p>
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
                {/* <div>
                  <label>
                    <input
                      type="search"
                      class="form-control form-control-sm"
                      placeholder="Search..."
                      aria-controls="warehouse_table"
                    />
                  </label>
                </div> */}

                <div className="date_wrapper">
                  <div className="form-group tw-mt-2">
                    <label htmlFor="exampleInputPassword1">From:</label>
                    <input

                      type="date"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Amount"
                      onChange={(e) => { setDate({ ...date, from: (e.target.value) }) }}
                    />
                  </div>
                  <div className="form-group tw-mt-2">
                    <label htmlFor="exampleInputPassword1">to:</label>
                    <input

                      type="date"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Amount"
                      onChange={(e) => { setDate({ ...date, to: (e.target.value) }) }}
                    />
                  </div>
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
                      <th>Code</th>
                      <th>Amount</th>
                      <th>type</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers &&
                      allUsers?.map((item, index) => (
                        <tr style={{ lineHeight: "4rem" }}>
                          <td>{item.userCode ? item.userCode.accountNo + " " + item.userCode.customerName : item.supplierCode.accountNo + " " + item.supplierCode.supplierName}</td>
                          <td>{item?.amount}</td>
                          <td>{item?.type}</td>
                          <td>
                            {moment(item?.createdAt).format("DD/MM/YYYY")}
                          </td>
                          <td>
                            <i
                              className="fa-solid text-danger fa-trash "
                              onClick={() => {
                                showDeleteConfirm(item?._id);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {" "}
                            </i>
                            <i
                              className="fa-solid text-warning fa-pen-to-square ms-2 "
                              onClick={() => {
                                setUserDetail(item);
                                setUpdateModalOpen(true);
                                setGetData(item);
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

export default Expense;
