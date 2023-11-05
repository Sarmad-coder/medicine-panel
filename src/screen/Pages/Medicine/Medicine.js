import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEye, FiDelete } from "react-icons/fi";
import CreateMedicine from "./CreateMedicine";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import URL from "../../Url";
import Edit_medicine from "./Edit_medicine";
import { toast } from "react-toastify";

const Medicine = () => {
  const [item, setItem] = useState();
  console.log(item);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [stockModal, setOutStockModal] = useState(false);
  // get the data of medicine
  const [medicineData, setMedicineData] = useState([]);
  const [Data, setData] = useState({});
  console.log(medicineData);
  const navigate = useNavigate();
  const getData = () => {
    axios
      .get(`${URL}medicine/getAll`)
      .then((res) => {
        setMedicineData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const [stock,setStock] = useState('')
  // deleting Data
  const deleteMedicine = (id) => {
    axios
      .delete(`${URL}medicine/deleteById/${id}`)
      .then((res) => {
        console.log(res);
        getData();
      })
      .then((err) => {
        console.log(err);
      });
  };

  // update data

  const [stockSingle,setStockSingle] = useState('')
  const updateData = (id) => {

    console.log(id);
    const param = {
      id:stockSingle,
      qty:stock,
    };
    console.log(param);
    axios
      .put(`${URL}medicine/updateById`, param)
      .then((res) => {

        if(res?.status===200){

          toast.success('stock Add Successfully!');

          axios
          .get(`${URL}medicine/getAll`)
          .then((res) => {
            setMedicineData(res.data);
          })
          .then((err) => {
            console.log(err);
          });

          setOutStockModal(false)


        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };







  
  return (
    <>
      <div className="content-section p-3">
        <CreateMedicine
          Modal={Modal}
         
          Button={Button}
          modalOpen={modalOpen}
          setMedicineData={setMedicineData}
          setModalOpen={setModalOpen}
        />
        <Edit_medicine
          Modal={Modal}
          getData={Data}
          Button={Button}
          modalOpen={modalUpdateOpen}
          setMedicineData={setMedicineData}
          setModalOpen={setModalUpdateOpen}
        />
        <div className="breadcrumb">
          <h5>All Medicines</h5>
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
                          Company Name
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Country: activate to sort column ascending"
                        >
                          Category Name
                        </th>
                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="City: activate to sort column ascending"
                        >
                          Name
                        </th>

                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action"
                        >
                          Purchase Price
                        </th>
                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action"
                        >
                          Sale Price
                        </th>
                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action"
                        >
                          Qty
                        </th>
                        
                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action"
                        >
                          Type
                        </th>
                        <th
                          className="not_show sorting_disabled"
                          rowspan="1"
                          colspan="1"
                          aria-label="Action"
                        >
                          Add Stock
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
                            <tr className="even">
                              <td>{index + 1}</td>
                              <td>{medicine?.companyName}</td>
                              <td>{medicine?.categoryId?.categoryName}</td>
                              <td>{medicine?.itemName}</td>
                              <td>{medicine?.purchasePrice}</td>
                              <td>{medicine?.salePrice}</td>
                              <td>{medicine?.qty}</td>
                            
                              <td>{medicine.type}</td>

                              <td>
                                <button type="button" className="btn btn-warning text-white" 
                                
                                
                                onClick={() => {setOutStockModal(true)
                                  setStockSingle(medicine._id)
                                }}
                                > Add Stock </button>
                              </td>


                              <td>
                                <i
                                  onClick={() => deleteMedicine(medicine._id)}
                                  className="fa-solid text-danger fa-trash "
                                  style={{ cursor: "pointer" }}
                                >
                                  {" "}
                                </i>
                                <i
                                  onClick={() => {setModalUpdateOpen(true)
                                    setData(medicine)
                                  }}
                                  className="fa-solid text-warning fa-pen-to-square ms-2 "
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
                    <div className="form-group col-md-6">
                      <label htmlFor="country">Description </label>
                      <input
                        type="text"
                        name="country"
                        id="description"
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
                      // onClick={() => updateData(item?._id)}
                    >
                      <i className="i-Yes me-2 font-weight-bold"></i> Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <Modal
        title="Add Stock"
        style={{ top: 20 }}
        open={stockModal}
        onOk={() => setOutStockModal(false)}
        onCancel={() => setOutStockModal(false)}
        width={600}
        footer={[
          <div>
            <Button key="cancel" onClick={() => setOutStockModal(false)}>
              Cancel
            </Button>
            <Button key="ok" onClick={updateData} type="primary">
              Update
            </Button>
          </div>,
        ]}
      >
        
        <div className="row">
         
          <div className="col-md-12 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Add Stock*</label>
            <input
              type="text"
              className="productCreateInput"
              value={stock}
              placeholder="Enter Quantity..."
              id="password"
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        
       
      </Modal>

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
    </>
  );
};

export default Medicine;
