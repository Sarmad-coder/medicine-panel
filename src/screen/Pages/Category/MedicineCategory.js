import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

import { FiEye, FiDelete } from "react-icons/fi";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import CreateCategory from "./CreateCategory";
import moment from "moment";
import axios from "axios";
import URL from "../../Url";
import EditCategory from "./EditCategory";
const MedicineCategory = () => {
  const { confirm } = Modal;

  const [item, setItem] = useState();
  console.log(item);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setModalUpdateOpen] = useState(false);
  // get the data of medicine
  const [medicineData, setMedicineData] = useState([]);
  const [single, setSingle] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}category/getAll`)
      .then((res) => {
        setMedicineData(res.data);
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this Category?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete(`${URL}category/deleteById/${id}`).then((res) => {
          console.log(res);
          if (res?.status === 200) {
            toast.success("Category  Deleted!");
            axios
              .get(`${URL}category/getAll`)
              .then((res) => {
                setMedicineData(res.data);
                console.log(res);
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
        <CreateCategory
          Modal={Modal}
          Button={Button}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setMedicineData={setMedicineData}
          getData={medicineData}
        />
        <EditCategory
          Modal={Modal}
          Button={Button}
          modalOpen={updateModalOpen}
          setModalOpen={setModalUpdateOpen}
          setMedicineData={setMedicineData}
          getData={single}
        />
        <div className="breadcrumb">
          <h5>Category Name</h5>
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
                          style={{ width: "105px" }}
                          aria-label="Name: activate to sort column ascending"
                        >
                          Medicine
                        </th>

                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          style={{ width: "105px" }}
                          aria-label="Name: activate to sort column ascending"
                        >
                          Crated At
                        </th>

                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          style={{ width: "105px" }}
                          aria-label="Phone: activate to sort column ascending"
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
                            <tr className="even">
                              <td>{medicine.categoryName}</td>
                              <td>
                                {moment(medicine.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </td>
                              <td>
                                <i
                                  className="fa-solid text-danger fa-trash "
                                  onClick={() =>
                                    showDeleteConfirm(medicine?._id)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {" "}
                                </i>
                                <i
                                  className="fa-solid text-warning fa-pen-to-square ms-2 "
                                  onClick={() => {
                                    setModalUpdateOpen(true);
                                    setSingle(medicine);
                                  }}
                                  style={{ cursor: "pointer" }}
                                ></i>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Creating Warehouse */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div role="document" className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update</h5>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="btn-close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    {/* Form Fields */}
                    <div className="form-group col-md-6">
                      <label htmlFor="name">
                        Medicine Name <span className="field_required"></span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={item?.name}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="mobile">Price </label>
                      <input
                        type="text"
                        name="mobile"
                        id="price"
                        defaultValue={item?.price}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="country">Description </label>
                      <input
                        type="text"
                        name="country"
                        id="description"
                        defaultValue={item?.description}
                        className="form-control"
                      />
                    </div>
                  </div>
                </form>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn "
                      style={{ backgroundColor: "#4E97FD", color: "white" }}
                    >
                      {/* onClick={() => updateData(item?._id)}    */}
                      <i className="i-Yes me-2 font-weight-bold"></i> Submit
                    </button>
                  </div>
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
                  src="https://posly.getstocky.com/images/logo-default.svg"
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
    </>
  );
};

export default MedicineCategory;
