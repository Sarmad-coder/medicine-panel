import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import URL from "../../Url";
const EditArea = ({
  Modal,
  Button,
  modalOpen,
  setUpdateModalOpen,
  Data,
  setAllUsers
}) => {
  const [loader, setLoader] = useState(false);
  const [types, setTypes] = useState("");
  useEffect(() => {
   
    setTypes(Data.name)
  }, [Data])
  const fn_handleEdit = () => {
    if (!types) {
      toast.error("Enter Account Type");
    } else {
      const params = {
        id: Data._id,
        name: types,
      };
      axios.put(`${URL}area/updateById`, params).then((res) => {
        console.log(res);
        if (res?.status === 200) {

          setUpdateModalOpen(false)
          toast.success("Area Edited Successfully!");

          axios
            .get(`${URL}area/getAll`)
            .then((res) => {
              console.log(res);
              setAllUsers(res.data);
            })
            .then((err) => {
              console.log(err);
            });

          setUpdateModalOpen(false);
        } else {
          return toast.error(res?.data?.message);
        }
      });
    }
  };

  return (
    <Modal
      title="Update Area"
      style={{ top: 20 }} EditAccountType
      open={modalOpen}
      onOk={() => setUpdateModalOpen(false)}
      onCancel={() => setUpdateModalOpen(false)}
      width={600}
      footer={[
        <div>
          {loader === true ? (
            <div className="row">
              <div className="col-10">
                <Button key="cancel" onClick={() => setUpdateModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  key="ok"
                  type="primary"
                  onClick={() => {
                    fn_handleEdit();
                  }}
                >
                  Update
                </Button>
              </div>

            </div>
          ) : (
            <>
              <Button key="cancel" onClick={() => setUpdateModalOpen(false)}>
                Cancel
              </Button>
              <Button
                key="ok"
                type="primary"
                onClick={(e) => {
                  fn_handleEdit();
                }}
              >
                Update
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
          placeholder="Type"
          onChange={(e) => setTypes(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default EditArea;
