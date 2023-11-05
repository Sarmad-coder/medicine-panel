import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../Url";
const CreateCategory = ({
  Modal,
  Button,
  modalOpen,
  setModalOpen,
  setMedicineData,
  getData,
}) => {
  const [categoryName, setCategoryName] = useState("");
  

  const navigate = useNavigate();
  const addMecicine = () => {
    if (!categoryName) {
      toast.error("Enter Amount");
    } else {
      const param = {
        categoryName: categoryName,
      };
      axios
        .post(`${URL}category/create`, param)
        .then((res) => {
          console.log(res);
          axios.get(`${URL}category/getAll`).then((res) => {
            if (res?.status === 200) {
             setMedicineData(res.data);  
             setModalOpen(false);
             console.log(res);
            }
          });
          // navigate("/medicine_category");

          
        })
        .then((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Modal
        title="Create Category"
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={600}
        footer={[
          <div>
            <Button key="cancel" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button key="ok" onClick={addMecicine} type="primary">
              Create
            </Button>
          </div>,
        ]}
      >
        <hr />
        <div className="row">
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Category Name*</label>
            <input
              type="text"
              className="productCreateInput"
              value={categoryName}
              placeholder="category"
              id="fullName"
              required
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <hr />
        </div>
      </Modal>
    </>
  );
};
export default CreateCategory;
