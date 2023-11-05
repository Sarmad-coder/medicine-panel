import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateMedicine from "../Medicine/CreateMedicine";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import CreateArea from "./CreateArea";
import { toast } from "react-toastify";
import EditArea from "./EditArea";
import URL from "../../Url";

const Area = () => {
  const { confirm } = Modal;
  const [item, setItem] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  let [Data, setData] = useState({});
  // get the data of medicine
  const [medicineData, setMedicineData] = useState([]);
  const navigate = useNavigate();
  const getData = () => {
    axios
      .get(`${URL}area/getAll`)
      .then((res) => {
        console.log(res);
        setMedicineData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // deleting Data

  




  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this Area?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete(`${URL}area/deleteById/${id}`).then((res) => {
          console.log(res?.data);
          if (res?.status === 200) {
            toast.success("Area Deleted");
            axios
            .get(`${URL}area/getAll`)
            .then((res) => {
              console.log(res);
              setMedicineData(res.data);
            })
            .then((err) => {
              console.log(err);
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
    <>
      <div className="content-section p-3">
        <CreateArea
          Modal={Modal}
          Button={Button}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setAllUsers={setMedicineData}
         
        />

        <EditArea
          Modal={Modal}
          Button={Button}
          modalOpen={updateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          Data={Data}
          setAllUsers={setMedicineData}
        />

        <div className="breadcrumb">
          <h5>Area</h5>
        </div>

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
                  <table
                    id="warehouse_table"
                    className="display table dataTable no-footer"
                    aria-describedby="warehouse_table_info"
                    style={{ width: "995px" }}
                  >
                    {/* Table Header */}
                    <thead>
                      <tr>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Name: activate to sort column ascending"
                        >
                          #
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Phone: activate to sort column ascending"
                        >
                          Area Name
                        </th>
                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                      {medicineData?.map((medicine, index) => {
                        return (
                          <>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{medicine.name}</td>
                              <td>
                                <i
                                  className="fa-solid text-danger fa-trash "
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    showDeleteConfirm(medicine._id)
                                  }
                                ></i>
                                <i
                                  className="fa-solid text-warning fa-pen-to-square ms-2 "
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    Data=medicine
                                    setData(Data);
                                    setUpdateModalOpen(true);
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

        {/* Modal for Creating Warehouse */}
       

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
    </>
  );
};

export default Area;
