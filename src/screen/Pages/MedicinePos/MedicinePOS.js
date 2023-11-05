import React from "react";
import { useEffect, useState } from "react";
import { FiEye, FiDelete } from "react-icons/fi";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import URL from "../../Url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const MedicinePOS = () => {
  const [item, setItem] = useState();
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [radioValue, setRadioValue] = useState("option1"); // Default selected radio value
  const [showInputs, setShowInputs] = useState(false);
  const [data, setData] = useState("");
  const [selectedMedicineIds, setSelectedMedicineIds] = useState([]);
  const [total, setTotal] = useState(1);
  const [priceQty, setPriceQty] = useState(1);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [medicineData, setMedicineData] = useState([]);
  const [creditorDebit, setCreditorDebit] = useState("Debit");
  const [todayDate, setTodayDate] = useState("");
  const [userId, setUserId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  console.log(supplierId);
  const navigate = useNavigate();

  console.log(selectedMedicineIds);
  // console.log(total);

  useEffect(() => {
    axios
      .get(`${URL}user/getAll`)
      .then((res) => {
        setUsers(res?.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}supplier/getAll`)
      .then((res) => {
        setSuppliers(res?.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (data.length) {
      axios
        .get(`${URL}medicine/getById/${data}`)
        .then((res) => {
          // console.log(res?.data);
          setSelectedMedicineIds((preVal) => [...preVal, res?.data]);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("efffff");
    }
    return () => {
      setData("");
    };
  }, [data]);

  useEffect(() => {
    // console.log("effect");
    const NewPrice = selectedMedicineIds.reduce((accumulator, item) => {
      return (
        parseInt(accumulator) + parseInt(item.qty) * parseInt(item.salePrice)
      );
    }, 0);
    setTotal(NewPrice);
  }, [priceQty, selectedMedicineIds?.length]);

  const price = selectedMedicineIds.map((item) => item.salePrice);

  const NewPrice = price.reduce((accumulator, currentValue) => {
    return parseInt(accumulator) + parseInt(currentValue);
  }, 0);
  // console.log(NewPrice * priceQty);

  // const handleIncrement = (id) => {

  //   setSelectedMedicineIds(prevData => prevData.map(item => 
  //     item._id === id ? { ...item, value:item.value + 1 } : item

  //   ));


  // };




  // const handleDecrement = (id) => {
  //   setSelectedMedicineIds(prevData => prevData.map(item => 
  //     item._id === id ? { ...item, value: item.value - 1 } : item
  //   ));
  // };


  // function incrementValue(index) {
  //   setSelectedMedicineIds(prevData => {
  //     const newData = [...prevData];
  //     newData[index]++;
  //     return newData;
  //   });
  // }

  // function decrementValue(index) {
  //   setSelectedMedicineIds(prevData => {
  //     const newData = [...prevData];
  //     if (newData[index] > 0) {
  //       newData[index]--;
  //     }
  //     return newData;
  //   });
  // }



  const handleInputChange = (quantity, productId) => {
    setSelectedMedicineIds(prevData =>
      prevData.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  }


  console.log(selectedMedicineIds);



  const removeItem = (id) => {
    setSelectedMedicineIds((preVal) =>
      preVal.filter((medicine) => medicine._id !== id)
    );
  };



  const getValFromCheckBox = (e) => {
    setCreditorDebit(e);
  };



  const purchaseData = selectedMedicineIds?.map((item) => item?.purchasePrice);



  const purchaseBill = purchaseData.reduce((accumulator, currentValue) => {
    return parseInt(accumulator) + parseInt(currentValue);
  }, 0);


  console.log(purchaseBill, 'purchaseBill');




  console.log(parseInt(NewPrice) - parseInt(purchaseBill), 'pur');


  const newAray = selectedMedicineIds.map((obj) => {
    return {
      medicineId: obj._id,
      quantity: obj.quantity,
      salePrice: obj.salePrice,
      profit: (parseInt(obj?.salePrice) * obj?.quantity) - (parseInt(obj?.purchasePrice) * obj?.quantity),
    };
  });
  // console.log(newAray);
  const saleNow = () => {
    let date = document.getElementById("date");

    if (date.value === "") {
      toast.error("Enter the Date ");
    } else if (selectedMedicineIds.length === 0) {
      toast.error("Select the Medicine ");
    } else if (userId.length === 0) {
      toast.error("Select the User Id ");
    } else {
      const params = {
        product: newAray,
        totalBill: NewPrice,
        todayDate: todayDate,
        profit: parseInt(NewPrice) - parseInt(purchaseBill),
        userId: userId,
        method: creditorDebit,
      };
      console.log(params);
      axios
        .post(`${URL}directSale/create`, params)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Direct Sale Successfully !");
          }
        })
        .catch((err) => {
          console.log(err);

            toast.error(err.response.data.message)
        
        });
    }
  };
  const saleVia = () => {
    let date = document.getElementById("date");

    if (date.value === "") {
      toast.error("Enter the Date ");
    } else if (selectedMedicineIds.length === 0) {
      toast.error("Select the Medicine ");
    } else if (supplierId.length === 0) {
      toast.error("Select the Supplier Id ");
    } else {
      const params = {
        product: newAray,
        totalBill: parseInt(NewPrice) - parseInt(purchaseBill),
        todayDate: todayDate,
        supplierId: supplierId,
        method: creditorDebit,
      };
      console.log(params);
      axios
        .post(`${URL}SaleVia/create`, params)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Sale Via Successfully !");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setRadioValue(selectedValue);

    if (selectedValue === "option2") {
      setShowInputs(true);
    } else {
      setShowInputs(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${URL}medicine/getAll`)
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="content-section p-3">
        {/* <CreateMedicine Modal={Modal} Button={Button} modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
        <div className="breadcrumb">
          <h5>Medicine POS</h5>
        </div>

        <div className="separator-breadcrumb border-top"></div>

        <div id="section_Warehouse_list" className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex">
                  <div className="d-flex align-items-center">
                    <label htmlFor="" className="me-3">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name=""
                      id="date"
                      onChange={(e) => setTodayDate(e.target.value)}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <input
                        type="radio"
                        value="option1"
                        checked={radioValue === "option1"}
                        onChange={handleRadioChange}
                        className="ms-3 me-2"
                        style={{ cursor: "pointer" }}
                        name=""
                        id=""
                      />
                      <label htmlFor="">Sale Direct</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="option2"
                        checked={radioValue === "option2"}
                        onChange={handleRadioChange}
                        className="ms-3 me-2"
                        style={{ cursor: "pointer" }}
                        name=""
                        id=""
                      />
                      <label htmlFor="">Sale Via</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex  align-items-center mt-2">
                  <div className="d-flex align-items-center">
                    <label htmlFor="" className="me-3">
                      Bill
                    </label>
                    <input type="text" className="form-control" name="" id="" />
                  </div>
                  <div className="d-flex ms-3 align-items-center mt-2">
                    <input
                      type="checkbox"
                      value="Credit"
                      checked={creditorDebit === "Credit"}
                      className="me-2"
                      name=""
                      id=""
                      onClick={(e) => getValFromCheckBox(e.target.value)}
                    />
                    <label htmlFor="">Credit</label>
                  </div>
                  <div className="d-flex ms-3 align-items-center mt-2">
                    <input
                      type="checkbox"
                      value="Debit"
                      checked={creditorDebit === "Debit"}
                      className="me-2"
                      name=""
                      id=""
                      onClick={(e) => getValFromCheckBox(e.target.value)}
                    />
                    <label htmlFor="">Debit</label>
                  </div>
                </div>
                <div className="row border mt-2 py-3">
                  <div className="col-md-6 ">
                    <p>to</p>
                    <div className="row">
                      <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="" className="me-2">
                          Customer Code
                        </label>
                        <div>
                          {" "}
                          <input
                            type="text"
                            className="form-control "
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                      <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="" className="me-2">
                          Name
                        </label>
                        <div>
                          {" "}
                          <input
                            type="text"
                            className="form-control "
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {showInputs && (
                    <div className="col-md-6  ">
                      <p>from</p>
                      <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                          <label htmlFor="" className="me-2">
                            Customer Code
                          </label>
                          <div>
                            {" "}
                            <input
                              type="text"
                              className="form-control "
                              name=""
                              id=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                          <label htmlFor="" className="me-2">
                            Name
                          </label>
                          <div>
                            {" "}
                            <input
                              type="text"
                              className="form-control "
                              name=""
                              id=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="row justify-content-between my-3">
                  <div className="col-md-4 d-flex align-items-center">
                    <label htmlFor="" className="me-3">
                      Select Medicine :
                    </label>

                    <select
                      name=""
                      id=""
                      className="form-control"
                      onChange={(e) => {
                        setData(e.target.value);
                        console.log(data);
                      }}
                    >
                      <option>--select medicine ---</option>
                      {options?.map((option) => {
                        return (
                          <>
                            <option value={option?._id}>
                              {option?.companyName}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  {showInputs ? (
                    <div className="col-md-4 d-flex align-items-center">
                      <label htmlFor="" className="me-3">
                        Select Supplier :
                      </label>

                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={(e) => {
                          setSupplierId(e.target.value);
                          console.log(supplierId);
                        }}
                      >

                        <option>--select supplier--</option>
                        {suppliers?.map((supplier) => {
                          return (
                            <>
                              <option value={supplier?._id}>
                                {supplier?.fullName}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    <div className="col-md-4 d-flex align-items-center">
                      <label htmlFor="" className="me-3">
                        Select User :
                      </label>

                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={(e) => {
                          setUserId(e.target.value);
                        }}
                      >
                        <option>--select Customer---</option>
                        {users?.map((user) => {
                          return (
                            <>
                              <option value={user?._id}>
                                {user?.fullName}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  {/* --------------- */}
                </div>
                <h6 className="mt-4">Item detail</h6>
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
                          aria-label="Name: activate to sort column ascending"
                        >
                          Medicine Name
                        </th>

                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Phone: activate to sort column ascending"
                        >
                          Qty
                        </th>

                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Phone: activate to sort column ascending"
                        >
                          Sale Price
                        </th>

                        <th
                          className="sorting"
                          tabIndex="0"
                          aria-controls="warehouse_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Phone: activate to sort column ascending"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                      {selectedMedicineIds?.map((medicine, index) => {
                        return (
                          <>
                            <tr key={medicine?._id}>
                              <td>{index + 1}</td>
                              <td>{medicine?.companyName}</td>
                              <td>
                                {/*                                
                                <button
                                  className="px-2 py-1 border-0 bg-info rounded-3 me-2"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    background: "#83baf9",
                                    color: "white",
                                    fontWeight: "bold",
                                  }}
                                 
                                  onClick={() => {
                                    // incrementValue(index)
                                   }}
                                >
                                  +
                                </button> */}
                                {selectedMedicineIds?.qty}
                                {/* <button
                                  className="px-2 py-1 border-0 bg-info rounded-3 ms-2"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    background: "#83baf9",
                                    color: "white",
                                    fontWeight: "bold",
                                  }}
                                  onClick={() => {
                                  //  decrementValue(index)
                                  }}
                               
                                >
                                  -
                                </button> */}

                                <input placeholder={`Product ${index + 1} Price`} value={medicine.quantity || ''}
                                  onChange={(e) => handleInputChange(e.target.value, medicine._id)} />
                              </td>
                              <td>
                                {Number(medicine?.quantity) * Number(medicine?.salePrice)}
                                {medicine.name}, Quantity: {medicine.quantity}, Price: {medicine.salePrice}
                              </td>
                              <td>
                                <i
                                  className="fa-solid fa-trash text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    removeItem(medicine?._id);
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

        <div className="conatiner border p-2 mt-3">
          <div className="row mt-3">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex align-items-center mt-2 justify-content-end ">
                  <label htmlFor="" className="me-2">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    className="form-control  "
                    style={{ width: "210px" }}
                    disabled
                    value={NewPrice}
                  />
                </div>
                <div className="d-flex align-items-center mt-2 justify-content-end  ">
                  <label htmlFor="" className="me-2">
                    Discont
                  </label>
                  <input
                    type="text"
                    className="form-control  "
                    style={{ width: "210px" }}
                  />
                </div>
                <div className="d-flex align-items-center mt-2 justify-content-end ">
                  <label htmlFor="" className="me-2">
                    Other exp
                  </label>
                  <input
                    type="text"
                    className="form-control  "
                    style={{ width: "210px" }}
                  />
                </div>
                <div className="d-flex align-items-center mt-2 justify-content-end ">
                  <label htmlFor="" className="me-2">
                    Net Amount
                  </label>
                  <input
                    type="text"
                    className="form-control  "
                    style={{ width: "210px" }}
                  />
                </div>
                <div className="d-flex mt-3 justify-content-end align-items-center">
                  {showInputs ? (
                    <button
                      className="border-0 px-3 py-1 bg-warning rounded-2 text-white  fw-bold"
                      onClick={saleVia}
                    >
                      Sale Via
                    </button>
                  ) : (
                    <button
                      className="border-0 px-3 py-1 bg-warning rounded-2 text-white  fw-bold"
                      onClick={saleNow}
                    >
                      Direct Sale
                    </button>
                  )}
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

export default MedicinePOS;
