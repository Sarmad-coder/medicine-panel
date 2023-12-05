import React from "react";
import { Link } from "react-router-dom";
function ScrollableSection({ left }) {
  return (
    <>
      <div
        id="sidebar_mobile"
        className="sidebar p-3 pt-3 "
        style={{ left: left, backgroundColor: "#131314" }}
      >
        <div className=" d-flex align-items-center justify-content-center">
           <img
            src='https://i.ibb.co/Hp7LJsc/ROYAL-CHICKS-LOGO-01-01-01.png'
            width="100px"
            height=""
            alt=""
           style={{cursor:'pointer', width:'120px'}}
          />
        </div>
        <ul className="pb-5 mt-5">
          <li className="nav-item">
            <Link to="/" className="fw-semi-bold nav-link active pt-0">
              <i class="fa-solid fa-table-cells-large"></i>Dashboard
            </Link>
          </li>
          {/* medicine */}
          <li className="nav-item">
            <Link
              to="/user"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-users"></i>Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/supplier"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-truck-field"></i>Suppliers
            </Link>
          </li>

          {/* medicine */}
          <li className="nav-item">
            <Link
              to="medicine"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-tablets"></i>Medicine
            </Link>
          </li>
          {/* Company */}
          <li className="nav-item">
            <Link
              to="/company"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-table-cells-large"></i>Company
            </Link>
          </li>
          {/* category */}
          <li className="nav-item">
            <Link
              to="/medicine_category"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-database"></i>Category
            </Link>
          </li>
          {/* unit */}
          {/* <li className="nav-item">
            <Link
              to="/unit_tab"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-table-cells-large"></i>Unit
            </Link>
          </li> */}
          {/* medicine Pos */}
          <li className="nav-item">
            <Link
              to="/expense"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
             <i class="fa-solid fa-sack-dollar"></i>Daily Book
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/area"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-map-location-dot"></i>Area
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/account_type"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-user"></i>Account Type
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              to="/receive_payment"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-money-bill"></i>Receive Payment
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/to_payment"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-wallet"></i>To Payment
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              to="/medicine_pos"
              className="fw-semi-bold nav-link active "
              aria-current="page"
            >
              <i class="fa-solid fa-cart-plus"></i>Medicine POS
            </Link>
          </li>
          <div class="accordion accordion-flush" id="accordionFlushExample511">
            <div class="accordion-item" style={{ backgroundColor: "#131314" }}>
              <h2 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button collapsed p-0 pe-3 onfocus-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive11"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive11"
                >
                  <li className="nav-item">
                    <Link
                      to="#"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      <i class="fa-solid fa-people-carry-box"></i>Reports
                    </Link>
                  </li>
                </button>
              </h2>
              <div
                id="flush-collapseFive11"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo11"
                data-bs-parent="#accordionFlushExample511"
              >
                <div class="accordion-body">
                  <li className="nav-item">
                    <Link
                      to="/trailBalance"
                      className="fw-semi-bold nav-link active pt-0"
                      aria-current="page"
                    >
                      Trail Balance
                    </Link>
                    {/* <Link
                      to="/daily_reports"
                      className="fw-semi-bold nav-link active pt-0"
                      aria-current="page"
                    >
                      Daily Reports
                    </Link>

                    <Link
                      to="/salereport"
                      className="fw-semi-bold nav-link active pt-0"
                      aria-current="page"
                    >
                      Total Sale Report
                    </Link>
                    <Link
                      to="/purchasereport"
                      className="fw-semi-bold nav-link active pt-0"
                      aria-current="page"
                    >
                      Total Purchase Report
                    </Link> */}
                    {/* <Link
                      to="/total_customers"
                      className="fw-semi-bold nav-link active pt-0"
                      aria-current="page"
                    >
                      Total customers
                    </Link>
                    <Link
                      to="/total_supplier"
                      className="fw-semi-bold nav-link active pt-0"
                      aria-current="page"
                    >
                      Total Supplier
                    </Link> */}
                    {/* <Link
                      to="/overall"
                      className="fw-semi-bold nav-link active pt-0"
                      aria-current="page"
                    >
                      OverAll
                    </Link> */}
                    {/* <Link to="/supplierreport" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Supplier Report
                    </Link>
                    <Link to="/paymentsale" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Payment Sale
                    </Link>
                    <Link to="/paymentpurchase" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Payment Purchase
                    </Link>
                    <Link to="/paymentsalereturn" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Payment Sale Return
                    </Link>
                    <Link to="/paymentpurchasereturn" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Payment Purchase Return
                    </Link>
                    <Link to="/productquantityalert" className="fw-semi-bold nav-link active pt-0" aria-current="page">
                      Product Quantity Alerts
                    </Link> */}
                  </li>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}

export default ScrollableSection;
