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
import EditExpense from "./EditDailyBook";
import moment from "moment";
import { useForm } from 'react-hook-form';
import Select from 'react-select';
const { confirm } = Modal;

const Expense = () => {
  let { handleSubmit, register, reset } = useForm()

  const [loader, setLoader] = useState(false);
  let [selectedOption, setSelectedOption] = useState(null);
  let [options, setOptions] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  // const [userDetail, setUserDetail] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [getData, setGetData] = useState({});
  const [lBalance, setLBalance] = useState(0)
  let [editId, setEditId] = useState("")
  let [type, setType] = useState("")
  const [date, setDate] = useState({ from: "", to: "" })

  const getAllExpense = async () => {
    try {
      let data = []
      const resp = await axios.get(`${URL}expense/getAll`);


      setAllUsers(resp.data);
    } catch (error) {
      console.log(error);
    }


  }
  useEffect(() => {
    getAllExpense()
    getAccount()
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

          if (res?.status === 200) {
            toast.success("Entry Deleted");
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

  // Getting user data for select option 

  const getAccount = async () => {
    try {
      let data = []
      let user = await axios.get(`${URL}user/getAll`)
      data = [...user.data]
      options = []
      data.forEach((item) => {
        let obj = {}
        if (item.customerName) {
          obj = { value: { id: item._id, user: true }, label: `${item.accountNo} ${item.customerName}` }
        }
        options.push(obj)
      })
      setOptions(options)



    } catch (error) {
      console.log(error)
    }
  }



  // Getting the value of Select 

  const handleSelectChange = async (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption.value.id);

    try {
      let resp = await axios.get(`${URL}expense/getLastBalance?id=${selectedOption.value.id}`)
      console.log(resp)
      if (resp.data.length) {
        setLBalance(resp?.data[0]?.totalBalance)
        reset({ "lBalance": (+resp?.data[0]?.totalBalance) })
      } else {
        reset({ "lBalance": 0 })
      }



    } catch (error) {
      console.log(error)
    }
  };

  // Crete Daily Book Entry 


  const submit = async (data, e) => {
    // setLoader(true)
    data.userCode = selectedOption.value.id
    data.lBalance = lBalance

    console.log(data)
    if (editId) {
      data.id = editId
      axios.put(`${URL}expense/updateById`, data).then((res) => {
        if (res?.status === 200) {
          toast.success("Entry Created");
          setLoader(false);
          reset()
          reset({ "cBalance": null })
          setSelectedOption(null)
          setType("")
          setEditId("")
          axios.get(`${URL}expense/getAll`).then((res) => {
            console.log(res);
            setAllUsers(res?.data);
          });
        } else {
          return toast.error(res?.data?.message);
        }
      });
    }else{
      axios.post(`${URL}expense/create`, data).then((res) => {
        if (res?.status === 200) {
          toast.success("Entry Updated");
          setLoader(false);
          reset()
          reset({ "cBalance": null })
          setSelectedOption(null)
          setType("")
  
          axios.get(`${URL}expense/getAll`).then((res) => {
            console.log(res);
            setAllUsers(res?.data);
          });
        } else {
          return toast.error(res?.data?.message);
        }
      });
  
    }
    
  }
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
              {/* <div className="text-end mb-3">
                <button
                  className="new_Warehouse btn btn-outline-primary btn-md m-1"
                  onClick={() => setModalOpen(true)}
                >
                  Create
                </button>
              </div> */}
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


              {/* Create Daily Book Entry */}

              <form className="" onSubmit={handleSubmit(submit)}>
                <div className=" ">

                  <div className="form-group tw-mt-2 tw-w-64">

                    <div>Pay Date</div>
                    <input
                      {...register("payDate")}
                      type="date"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Amount"
                      required
                    />

                  </div>

                  <div className="form-group tw-mt-2 tw-w-64">

                    <div>Type</div>
                    <select
                      {...register("type")}
                      className="form-select" aria-label="Default select example"
                      required onChange={(e) => {
                        type = e.target.value;
                        setType(type)
                      }}>
                      <option value="">Select The Type</option>
                      <option value="Credit">Credit </option>
                      <option value="Debit">Debit</option>

                    </select>

                  </div>


                  <div className=" tw-flex tw-justify-center tw-items-center">

                    <div className="form-group tw-mt-2 tw-w-full">
                      <div>Code</div>
                      <Select

                        options={options}
                        isSearchable={true}
                        isClearable={true}
                        maxMenuHeight={200} // Adjust the maximum height as needed
                        placeholder="Select The Code"
                        required
                        value={selectedOption}
                        onChange={handleSelectChange}
                      />
                    </div>







                    <div className="form-group tw-mt-2 tw-w-1/2">

                      <div>Last Balance</div>
                      <input
                        {...register("lBalance")}
                        type="number"
                        className="form-control"
                        id="lBalance"
                        placeholder="Last Balance"
                        required
                        disabled
                      />
                    </div>
                    <div className="form-group tw-mt-2 tw-w-1/2">

                      <div>Amount</div>
                      <input
                        {...register("amount")}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Amount"
                        required
                        onChange={(e) => {
                          if (type == "Debit") {
                            reset({ "cBalance": (lBalance + (+e?.target?.value)) })

                          } else if (type == "Credit") {
                            reset({ "cBalance": (lBalance - (+e?.target?.value)) })
                          } else {
                            toast.error("Please first Select the type of entry")
                            reset({ "amount": null })
                          }
                        }}
                      />
                    </div>

                    <div className="form-group tw-mt-2 tw-w-1/2">

                      <div>Current Balance</div>
                      <input
                        {...register("cBalance")}
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Current Balance"
                        disabled
                        required
                      />
                    </div>









                    <div className="form-group tw-mt-2 tw-w-full">

                      <div>Description</div>
                      <input
                        {...register("description")}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Description"
                        required
                      />
                    </div>


                    <button className=" tw-w-1/5 tw-mt-8 tw-h-9 tw-text-cyan-50 tw-rounded-md" id="submit" disabled={loader} style={{ "background-color": "#0b9444" }}>
                      {editId ? "Update" : "Add"}
                    </button>

                    {loader ? <div class="spinner-border text-primary" role="status">
                      {/* <span class="sr-only">Loading...</span> */}
                    </div> : null}

                  </div>



                </div>







              </form>



              <div className="table-responsive">
                <table
                  id="warehouse_table"
                  className="table mt-3 w-100"
                  aria-describedby="warehouse_table_info"
                >
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Credit</th>
                      <th>Debit</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers &&
                      allUsers?.map((item, index) => (
                        <tr style={{ lineHeight: "4rem" }}>
                          <td>{item.userCode ? item.userCode.accountNo + " " + item.userCode.customerName : item.supplierCode.accountNo + " " + item.supplierCode.supplierName}</td>
                          {/* <td>{item?.amount}</td> */}
                          <td>{item?.type == "Credit" ? item?.amount : 0}</td>
                          <td>{item?.type == "Debit" ? item?.amount : 0}</td>
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
                                // setUserDetail(item);

                                // setGetData(item);
                                setEditId(item._id)
                                reset(item)
                                selectedOption = { value: { id: item.userCode._id, user: true }, label: item.userCode.accountNo + " " + item.userCode.customerName }
                                // selectedOption.value = { id: item.userCode._id, user: true }
                                // selectedOption.label = item.userCode.accountNo + " " + item.userCode.customerName
                                setSelectedOption({ ...selectedOption })
                                setType(item.type)
                                setLBalance((+item.lBalance))
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
