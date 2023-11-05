import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowsMove } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";

function Nav({ press }) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  return (
    <>
      <div
        className={`px-3 shadow-sm bg-white d-flex justify-content-between align-items-center`}
        style={{ height: "80px" }}
      >
        <div className="navBarBtnTxt">
          <i className="fa-solid fa-bars-staggered menuIconNavbar" onClick={press} id="toggle_desktop" style={{backgroundColor:"#FCDB3C"}}></i>
          {/* <p className="navbarTextAddNew">+&nbsp;Add New</p> */}
          <a
            class="btn btn-primary"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
            id="toggle_mobile"
          >
            <i class="fa-solid fa-bars "></i>
          </a>
        </div>
        <div className="nav">
          {/* <button className="posBtnNavbar" onClick={() => navigate("/pos")}>POS</button> */}
          {/* <BsArrowsMove /> */}
          {/* <TfiWorld /> */}
          <div className="p-2" >
            <i className="fa-solid fa-user userIconNavbar" style={{backgroundColor:"#FCDB3C"}} type="button" onClick={() => setShow(!show)}></i>
          </div>
          {show && (
            <div class="userDropdown">
              <p>Profile</p>
              <p>Setting</p>
              <p>Logout</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
