import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import URL from "../../Url";
const OverAll = () => {
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}directSale/todayCustomerReports`)
      .then((res) => {
        console.log(res.data);
        setCustomer(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteCustomer = (id) => {
    axios
      .delete(`${URL}directSale/deleteById/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully");
          axios
            .get(`${URL}directSale/todayCustomerReports`)
            .then((res) => {
              console.log(res.data);
              setCustomer(res?.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}SaleVia/todaySupplierReports`)
      .then((res) => {
        console.log(res.data);
        setSupplier(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCustomerTwo = (id) => {
    axios
      .delete(`${URL}SaleVia/deleteById/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully");
          axios
            .get(`${URL}SaleVia/todaySupplierReports`)
            .then((res) => {
              console.log(res.data);
              setSupplier(res?.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="content-section p-3">
        <div className="breadcrumb">
          <h5>OverAll</h5>
        </div>

        <div className="separator-breadcrumb border-top"></div>

        <div className="tabs">
          <div>
            <ul
              className="nav nav-tabs align-items-center justify-content-center"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Total Customers
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Total Suppliers
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                {/* --------------- customers---------------- */}
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
                          Name
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Country: activate to sort column ascending"
                        >
                          Address
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="City: activate to sort column ascending"
                        >
                          Phone
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Email: activate to sort column ascending"
                        >
                          Method
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Zip Code: activate to sort column ascending"
                        >
                          Today Date
                        </th>
                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action"
                        >
                          Total Price
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
                      {customer?.map((singleCustomer, index) => {
                        return (
                          <>
                            <tr key={singleCustomer._id}>
                              <td>{index + 1}</td>
                              <td>{singleCustomer?.userId?.fullName}</td>
                              <td>{singleCustomer?.userId?.address}</td>
                              <td>{singleCustomer?.userId?.phone}</td>
                              <td>{singleCustomer?.method}</td>
                              <td>{singleCustomer?.todayDate}</td>
                              <td>{singleCustomer?.totalBill}</td>
                              <td>
                                <i
                                  className="fa-solid fa-trash text-danger"
                                  onClick={() => {
                                    deleteCustomer(singleCustomer?._id);
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
                {/* ------------------------------- */}
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                {/* ----------total suppliers----- */}
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
                          Name
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Country: activate to sort column ascending"
                        >
                          Address
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="City: activate to sort column ascending"
                        >
                          Phone
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Email: activate to sort column ascending"
                        >
                          Method
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Zip Code: activate to sort column ascending"
                        >
                          Today Date
                        </th>
                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action"
                        >
                          Total Price
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
                      {supplier?.map((singleSupplier, index) => {
                        return (
                          <>
                            <tr key={singleSupplier._id}>
                              <td>{index + 1}</td>
                              <td>{singleSupplier?.supplierId?.fullName}</td>
                              <td>{singleSupplier?.supplierId?.address}</td>
                              <td>{singleSupplier?.supplierId?.phone}</td>
                              <td>{singleSupplier?.method}</td>
                              <td>{singleSupplier?.todayDate}</td>
                              <td>{singleSupplier?.totalBill}</td>
                              <td>
                                <i
                                  className="fa-solid fa-trash text-danger"
                                  onClick={() => {
                                    deleteCustomerTwo(singleSupplier?._id);
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
                {/* -------------------------- */}
              </div>
            </div>
          </div>
        </div>

        {/* <div id="section_Warehouse_list" className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="text-end mb-3">
                  <a className="new_Warehouse btn btn-outline-primary btn-md m-1">
                    <i className="i-Add me-2 font-weight-bold"></i>Create
                  </a>
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
                          Name
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
                          Phone
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          style={{ width: "105px" }}
                          aria-label="Country: activate to sort column ascending"
                        >
                          Country
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          style={{ width: "105px" }}
                          aria-label="City: activate to sort column ascending"
                        >
                          City
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          style={{ width: "161px" }}
                          aria-label="Email: activate to sort column ascending"
                        >
                          Email
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          style={{ width: "105px" }}
                          aria-label="Zip Code: activate to sort column ascending"
                        >
                          Zip Code
                        </th>
                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          style={{ width: "105px" }}
                          aria-label="Action"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                 
                    <tbody>
                      <tr className="odd">
                        <td>Warehouse 2</td>
                        <td>240-737-7321</td>
                        <td>USA</td>
                        <td>New york</td>
                        <td>warehouse2@example.com</td>
                        <td>342A34</td>
                      </tr>
                      <tr className="even">
                        <td>Warehouse 1</td>
                        <td>240-737-7321</td>
                        <td>USA</td>
                        <td>Washington</td>
                        <td>warehouse1@example.com</td>
                        <td>7321</td>
                        <td></td>
                      </tr>
                    
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}

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
                <h5 className="modal-title">Create</h5>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="btn-close"
                ></button>
              </div>
              <div className="modal-body">
                <form enctype="multipart/form-data">
                  <div className="row">
                    {/* Form Fields */}
                    <div className="form-group col-md-6">
                      <label htmlFor="name">
                        Name <span className="field_required">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Warehouse Name"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="mobile">Phone </label>
                      <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter Warehouse Phone"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="country">Country </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="Enter Warehouse Country"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="city">City </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Enter Warehouse City"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Email </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter Warehouse Email"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="zip">Zip Code </label>
                      <input
                        type="text"
                        name="zip"
                        id="zip"
                        placeholder="Enter Warehouse Zip Code"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <button
                        type="submit"
                        className="btn "
                        style={{ backgroundColor: "#4E97FD", color: "white" }}
                      >
                        <i className="i-Yes me-2 font-weight-bold"></i> Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="app-footer">
          <div class="row">
            <div class="col-md-9">
              <p>
                <strong>Posly - POS With Ultimate Inventory</strong>
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

export default OverAll;
