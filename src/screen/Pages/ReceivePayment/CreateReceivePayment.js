import axios from "axios";
import React, { useState } from "react";
import URL from "../../Url";
import { useEffect } from "react";

const CreateReceivePayment = ({
  Modal,
  Button,
  createPaymentModal,
  setCreatePaymentModal,
  toast,
  singlePurchase,
  allPayment,
  setAllProduct,
}) => {
  const [customer, setCustomer] = useState("");
  const [accountType, setAccountType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    axios.get(`${URL}user/getAll`).then((res) => {
      // console.log(res);
      setAllUsers(res?.data);
    });
  }, []);

  const fn_submit = () => {
    if (!customer) {
      return toast.error("Slect your customer");
    } else if (!accountType) {
      return toast.error("Slect your Account Type");
    } else if (!amount) {
      return toast.error("Enter your Amount");
    } else if (!description) {
      return toast.error("Enter your Description");
    }

    const params = {
      customerId: customer,
      amount: amount,
      paymentType: accountType,
      discription: description,
    };
    axios.post(`${URL}receivePayment/create`, params).then((res) => {
      if (res?.status === 200) {
        toast.success("Payment Created");
        setCreatePaymentModal(false);

        axios.get(`${URL}receivePayment/getAll`).then((res) => {
          setAllProduct(res.data);
        });
      }
    });
  };
  return (
    <Modal
      title="Create Payment"
      style={{ top: 20 }}
      open={createPaymentModal}
      onOk={() => setCreatePaymentModal(false)}
      onCancel={() => setCreatePaymentModal(false)}
      width={600}
      footer={[
        <div>
          <Button key="cancel" onClick={() => setCreatePaymentModal(false)}>
            Cancel
          </Button>
          <Button key="ok" type="primary" onClick={fn_submit}>
            Create
          </Button>
        </div>,
      ]}
    >
      <hr />
      <div className="row">
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Customer*</label>
          <select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="productCreateInput"
            id="account"
          >
            <option selected>Select Customer</option>
            {allUsers?.map((item, index) => {
              return (
                <>
                  <option value={item?._id}>{item?.fullName}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Account Type*</label>

          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="productCreateInput"
            id="account"
          >
            <option selected value={""}>
              Select Account Type
            </option>
            <option value={"Global Account"}>Cash</option>
            <option value={"Global Account"}>Bank</option>
          </select>
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Amount*</label>
          <input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            className="productCreateInput"
            id="paymentAmount"
            placeholder="Must Enter Amount "
            required
            // defaultValue={singlePurchase?.amount}
          />
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Description*</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="productCreateInput"
            id="paymentAmount"
            placeholder="Must Enter Description"
            required
            // defaultValue={singlePurchase?.due}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateReceivePayment;
