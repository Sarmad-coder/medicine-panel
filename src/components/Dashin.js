import React, { useState } from "react";
import ScrollableSection from "./DashMain";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
function Dashin({ children }) {
  const [togg, setTogg] = useState(false)

  const changeTogg = () => {
    setTogg(!togg)
  }

  return (
    <>
      <div className="container-fluid p-0">
        <div className="">
          <div className="">

            <ScrollableSection left={togg ? '-100%' : '0'} />
          </div>

          <div className="" id="common_bar" style={{ marginLeft: togg ? '0px' : '250px' }} >
            <Nav press={changeTogg} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashin;
