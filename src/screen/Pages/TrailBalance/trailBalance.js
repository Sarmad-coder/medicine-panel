import axios from "axios";
import React, { useEffect, useState } from "react";

import URL from "../../Url";

import moment from "moment";



const TrailBalance = () => {
  

  const [loader, setLoader] = useState(false);
  
  // const [userDetail, setUserDetail] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  
  const [date, setDate] = useState({ from: "", to: "" })
  const [data, setData] = useState(false)
  const [total, setTotal] = useState(0)
  const getAllExpense = async () => {
    try {
      let data = []
      const resp = await axios.get(`${URL}expense/getAllTrailExpense`);

      console.log(resp)
      setAllUsers(resp.data);
      
    } catch (error) {
      console.log(error);
    }


  }
  useEffect(() => {
    getAllExpense()
   
  }, []);
  

 
  
  useEffect(() => {
    if (date.from && date.to) {
      fn_onDateChange()

      setData(true)
    }
  }, [date.from, date.to])


  function fn_onDateChange() {
  
      const data = allUsers?.filter(item => {


        return item.createdAt >= date.from && item.createdAt <= date.to

      })
      setAllUsers(data)
      console.log(data)

      let balance=0
      data.forEach((item)=>{
        balance+= +item.cBalance
      })
      setTotal(balance)

   
  }


 
  return (
    <div className="content-section p-3">
      <p className="dashboadHeading">Trail Balance</p>
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



              {data&&<div className="table-responsive">
                <table
                  id="warehouse_table"
                  className="table mt-3 w-100"
                  aria-describedby="warehouse_table_info"
                >
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Account's Name</th>
                      <th>Opening</th>
                      <th>Credit</th>
                      <th>Debit</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers &&
                      allUsers?.map((item, index) => (
                        <tr style={{ lineHeight: "4rem" }}>
                          <td>{ item.userCode.accountNo }</td>
                          {/* <td>{item?.amount}</td> */}
                          <td>{item.userCode.customerName}</td>
                          <td>{item.lBalance}</td>
                          <td>{item?.type == "Credit" ? item?.amount : 0}</td>
                          <td>{item?.type == "Debit" ? item?.amount : 0}</td>
                          <td>
                          {item.cBalance}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><b> Total Balance</b></td>
                        <td>{total}</td>
                      </tr>
                  </tbody>
                </table>
              </div>}
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

export default TrailBalance;
