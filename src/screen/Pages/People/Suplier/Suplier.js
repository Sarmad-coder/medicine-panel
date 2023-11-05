import React, { useState } from "react";
import { Button, Modal } from "antd";
import CreateSuplier from "./CreateSuplier";
import { useEffect } from "react";
import URL from "../../../Url";
import { ExclamationCircleFilled } from "@ant-design/icons";

import axios from "axios";

import { toast } from "react-toastify";
import EditSupplier from "./EditSupplier";

const Suplier = () => {
  const { confirm } = Modal;
  const [modalOpen, setModalOpen] = useState(false);
  const [getSuplier, setGetSuplier] = useState([]);
  const [updateModalOpen, setModalUpdateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [single, setSingle] = useState({});
  useEffect(() => {
    axios
      .get(`${URL}supplier/getAll`)
      .then((res) => {
        // console.log(res);
        setGetSuplier(res?.data);
      })
      .catch((error) => {
        console.error("Fetching data error : ", error);
      });
  }, []);
  




  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this Supplier?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete(`${URL}supplier/deleteByID/${id}`).then((res) => {
          console.log(res?.data);
          if (res?.status===200) {

            toast.success("Supplier Deleted")

            axios
      .get(`${URL}supplier/getAll`)
      .then((res) => {
        // console.log(res);
        setGetSuplier(res?.data);
      })
      .catch((error) => {
        console.error("Fetching data error : ", error);
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
    <div className="content-section p-3 pt-3">
      <CreateSuplier
        modalOpen={modalOpen}
        title={title}
        setTitle={setTitle}
        setModalOpen={setModalOpen}
        Modal={Modal}
        Button={Button}
        setGetSuplier={setGetSuplier}
      />
      <EditSupplier
        Modal={Modal}
        Button={Button}
        modalOpen={updateModalOpen}
        setModalOpen={setModalUpdateOpen}
        getData={single}

        setGetSuplier={setGetSuplier}
      />

      {/* <ViewSuplier getSuplier={getSuplier} /> */}
      <p className="dashboadHeading">Supplier</p>
      <hr className="dashboardLine" />
      <div id="section_Warehouse_list" className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="text-end mb-3">
                <button
                  className="new_Warehouse btn btn-outline-primary btn-md m-1"
                  onClick={() => {
                    setModalOpen(true);
                    setTitle("Create");
                  }}
                >
                  Create
                </button>
              </div>
              <section
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="d-flex ">
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
                <table className="display table dataTable no-footer">
                  <thead>
                  <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Address</th>
                     
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSuplier?.map((item, index) => {
                      return (
                        <>
                          <tr>
                          <td>{item?.accountNo}</td>
                        
                        <td>{item?.supplierName}</td>
                        <td>{item?.address}</td>

                            <td>
                              <i
                                className="fa-solid text-danger fa-trash "
                                style={{ cursor: "pointer" }}
                                onClick={() => showDeleteConfirm(item._id)}
                              ></i>
                              <i
                                className="fa-solid text-warning fa-pen-to-square ms-2 "
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setModalUpdateOpen(true);
                                  setSingle(item);
                                }}
                              ></i>
                            </td>
                          </tr>
                        </>
                      );
                    })}
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
              <strong>Royal Poultry Services - POS With Ultimate Inventory</strong>
            </p>
            <div class="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
              <img
                class="logo"
                src="https://i.ibb.co/Hp7LJsc/ROYAL-CHICKS-LOGO-01-01-01.png"
                style={{width:'120px'}}
                alt=""
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

export default Suplier;
