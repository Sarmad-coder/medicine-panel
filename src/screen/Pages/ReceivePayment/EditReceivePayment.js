import axios from "axios";
import React, { useState } from "react";
import URL from "../../Url";
import { useEffect } from "react";

const EditReceivePayment = ({
  Modal,
  getData,
  Button,
  createPaymentModal,
  setCreatePaymentModal,
  setAllUser,
  toast,
}) => {
  const [customer, setCustomer] = useState("");
  const [accountType, setAccountType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    axios.get(`${URL}user/getAll`).then((res) => {
      console.log(res);
      setAllUsers(res?.data);
    });
  }, []);
  // console.log(getData);
  const fn_submit = () => {
   
    const params = {
      customerId: customer,
      amount: amount,
      paymentType: accountType,
      discription: description,
      id: getData?._id,
    };
    axios.put(`${URL}receivePayment/updateById`, params).then((res) => {
      if (res?.status === 200) {
        toast.success("Payment Updated");
        setCreatePaymentModal(false);

        axios.get(`${URL}receivePayment/getAll`).then((res) => {
          setAllUser(res.data);
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
           
            <option value={"Cash"}>Cash</option>
            <option value={"Bank"}>Bank</option>
          </select>
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Amount*</label>
          <input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            // value={amount}
            className="productCreateInput"
            id="paymentAmount"
            defaultValue={getData.amount}
            placeholder="Must Enter Amount "
            required
            // defaultValue={singlePurchase?.amount}
          />
        </div>
        <div className="col-md-6 d-flex flex-column px-3 mb-3">
          <label className="productCreateTxt">Description*</label>
          <input
            type="text"
            // value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="productCreateInput"
            id="paymentAmount"
            defaultValue={getData.discription}
            placeholder="Must Enter Description"
            required
            // defaultValue={singlePurchase?.due}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditReceivePayment;
