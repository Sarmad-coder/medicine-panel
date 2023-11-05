import React from "react";
import { useEffect } from "react";
import axios from "axios";
import URL from "../../Url";
import { useState } from "react";
const FirstSectionDashBoard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allsupplier, setAllSupplir] = useState([]);
  const [allmedicine, setAllMedicine] = useState([]);
  const [allcategory, setAllCategory] = useState([]);
  const [profilt, setProfit] = useState([]);
  const [today, setToday] = useState([]);
  const [purchase, setPurchase] = useState([]);

  useEffect(() => {
    // users api
    axios.get(`${URL}user/getAll`).then((res) => {
      console.log(res);
      setAllUsers(res?.data);
    });

    axios.get(`${URL}supplier/getAll`).then((res) => {
      console.log(res);
      setAllSupplir(res?.data);
    });

    axios.get(`${URL}medicine/getAll`).then((res) => {
      console.log(res);
      setAllMedicine(res?.data);
    });

    axios.get(`${URL}category/getAll`).then((res) => {
      console.log(res);
      setAllCategory(res?.data);
    });

    axios.get(`${URL}directSale/profit`).then((res) => {
      console.log(res);
      setProfit(res?.data);
    });

    axios.get(`${URL}directSale/todayReports`).then((res) => {
      console.log(res);
      setToday(res?.data);
    });

    axios.get(`${URL}saleVia/todaySupplierReports`).then((res) => {
      console.log(res);
      setPurchase(res?.data);
    });

  }, []);

  const singleProfit = profilt.map((item)=>item?.profit);


  const totalProfit = singleProfit.reduce((accumulator, currentValue) => {
      return parseInt(accumulator) + parseInt(currentValue);
    }, 0);



    const todayReport = today.map((item)=>item?.totalBill);


  const totalToday = todayReport.reduce((accumulator, currentValue) => {
      return parseInt(accumulator) + parseInt(currentValue);
    }, 0);


    const purchaseData = purchase.map((item)=>item?.totalBill);


  const totalPurchase = purchaseData.reduce((accumulator, currentValue) => {
      return parseInt(accumulator) + parseInt(currentValue);
    }, 0);


  return (
    <div className="row">
      <div className="col-lg-6 col-md-12 mb-4">
        <div className="dashboardSectionBox ms-4 p-4 d-flex flex-row align-items-center justify-content-between">
          <div>
            <p className="text-primary fw-semibold mb-1">
              Good Morning, Royal Poultry Services!
            </p>
            <p className="p-0 mb-4 dashboardTxt">
              Here’s what happening with your store today!
            </p>
            <div className="dashboard_today_purchases">
              <p className="mb-1 dashboardTxtHead">{totalPurchase}</p>posly
              <p className="p-0 mb-4 dashboardTxt">Today’s total Purchases</p>
            </div>
            <div>
              <p className="mb-1 dashboardTxtHead">{totalToday}</p>
              <p className="p-0 m-0 dashboardTxt">Today’s total Sales</p>
            </div>
          </div>
          <img
            className="pe-lg-3"
            width="194"
            height="170"
            src="https://posly.getstocky.com/images/overview.png"
            alt=""
          />
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <div className="row me-3">
          <div className="col-md-6 col-sm-6">
            <div className="mb-4 dashboardSectionBox ps-4">
              <p className="dashboardTxt">Total Customer</p>
              <h4 className="dashboardTxtHead">{allUsers.length}</h4>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="mb-4 dashboardSectionBox ps-4">
              <p className="dashboardTxt">Total Supplier</p>
              <h4 className="dashboardTxtHead">{allsupplier.length}</h4>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="mb-4 dashboardSectionBox ps-4">
              <p className="dashboardTxt">Total Medicine</p>
              <h4 className="dashboardTxtHead">{allmedicine.length}</h4>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="mb-4 dashboardSectionBox ps-4">
              <p className="dashboardTxt">Medicine Category</p>
              <h4 className="dashboardTxtHead">{allcategory.length}</h4>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="mb-4 dashboardSectionBox ps-4">
              <p className="dashboardTxt">Total Profit</p>
              <h4 className="dashboardTxtHead">{totalProfit}</h4>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="mb-4 dashboardSectionBox ps-4">
              <p className="dashboardTxt">Today Sale</p>
              <h4 className="dashboardTxtHead">{totalToday}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSectionDashBoard;
