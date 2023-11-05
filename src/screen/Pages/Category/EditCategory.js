import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../Url";

const EditCategory = ({ Modal, Button, modalOpen, setModalOpen, getData ,setMedicineData}) => {
  console.log(getData?._id);
  const [categoryName, setCategoryName] = useState("");

  const navigate = useNavigate();
  const addMecicine = () => {
    
      const param = {
        categoryName: categoryName,
        id:getData?._id,
      };
      axios
        .put(`${URL}category/updateById`, param)
        .then((res) => {
          if (res?.status === 200) {

            console.log(res);
            axios.get(`${URL}category/getAll`).then((res) => {
              if (res?.status === 200) {
               setMedicineData(res.data);  
               setModalOpen(false);
               console.log(res);
              }
            });
            // navigate("/medicine_category");
  
            
          }
        })
        .then((err) => {
          console.log(err);
        });
    
  };
  return (
    <>
      <Modal
        title="Update Category"
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
              Update
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
              //   value={categoryName}

              placeholder="category"
              id="fullName"
              //   required
              onChange={(e) => setCategoryName(e.target.value)}
              defaultValue={getData?.categoryName}
            />
          </div>

          <hr />
        </div>
      </Modal>
    </>
  );
};
export default EditCategory;
