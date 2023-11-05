import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    if (email.value === "") {
      toast.error("Enter Your Email");
    } else if (password.value === "") {
      toast.error("Enter Your Password");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <div
        className="heroSection d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f2f2f2", width: "100%", height: "100vh" }}
      >
        <div className="container">
          <div className="row align-items-cetner justify-content-center">
            <div
              className="col-md-5 px-3 py-5 border bg-white d-flex align-items-center text-center flex-column "
              style={{
                borderRadius: "10px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <h4 className="fw-bold uppercase">Royal Poultry Farm</h4>
              <img
                src="https://i.ibb.co/Hp7LJsc/ROYAL-CHICKS-LOGO-01-01-01.png"
                alt=""
                style={{ width: "130px" }}
              />

              <input
                type="email"
                name=""
                className=" mt-5"
                placeholder="Email"
                id="email"
              />

              <div className="w-100 relative">
                <input
                  type="password"
                  name=""
                  className=""
                  id="password"
                  placeholder="Password"
                />
                <i
                  className="fa-solid fa-eye absolute "
                  style={{ fontSize: "14px", color: "gray" }}
                ></i>
              </div>

              <button onClick={nextPage} type="submit">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Login;
