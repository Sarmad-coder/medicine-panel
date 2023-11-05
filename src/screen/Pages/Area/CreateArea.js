import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import URL from "../../Url";
const CreateArea = ({
  Modal,
  Button,
  modalOpen,
  setModalOpen,

  setAllUsers,
  Oval,
}) => {
  const [loader, setLoader] = useState(false);
  const [types, setTypes] = useState("");
 
  const fn_handleCreate = () => {
    if (!types) {
      toast.error("Enter Account Type");
    } else {
      const params = {
        name: types,
      };
      axios.post(`${URL}area/create`, params).then((res) => {
       
        if (res?.status ===200) {
          setTypes("")
          setModalOpen(false)
          toast.success("Area Created Successfully!");

          axios
          .get(`${URL}area/getAll`)
          .then((res) => {
            console.log(res);
            setAllUsers(res.data);
          })
          .then((err) => {
            console.log(err);
          });
          
          setModalOpen(false);
        } else {
          return toast.error(res?.data?.message);
        }
      });
    }
  };
  return (
    <Modal
      title="Create Area"
      style={{ top: 20 }}
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      width={600}
      footer={[
        <div>
          {loader === true ? (
            <div className="row">
              <div className="col-10">
                <Button key="cancel" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  key="ok"
                  type="primary"
                  onClick={() => {
                    fn_handleCreate();
                  }}
                >
                  Create
                </Button>
              </div>
              <div className="col-2 text-end">
                <Oval
                  height={33}
                  width={33}
                  color="#4fa94d"
                  visible={true}
                  secondaryColor="#4fa94d"
                  strokeWidth={6}
                  strokeWidthSecondary={7}
                  style={{
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <Button key="cancel" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                key="ok"
                type="primary"
                onClick={(e) => {
                  fn_handleCreate();
                }}
              >
                Create
              </Button>
            </>
          )}
        </div>,
      ]}
    >
      <hr />
      

      <div className="form-group tw-mt-2">
            <label className=" tw-font-medium tw-text-base" htmlFor="exampleInputPassword1">Area</label>
             <input
            type="text"
            className="form-control tw-mt-1"
            value={types}
            placeholder="Name"
            onChange={(e) => setTypes(e.target.value)}
          />
          </div>
    </Modal>
  );
};

export default CreateArea;
