import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import URL from "../../../Url";
import { useForm } from 'react-hook-form';
const CreateSuplier = ({
  Modal,
  Button,
  modalOpen,
  setModalOpen,
  setGetSuplier,
}) => {
  const [loader, setLoader] = useState(false);
  let [account, setAccount] = useState([]);
  const { confirm } = Modal;

  let { handleSubmit, register, reset } = useForm()

  useEffect(() => {
    

    axios
      .get(`${URL}amountType/getAll`)
      .then((res) => {
        console.log(res);
        setAccount(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, [])

  const fn_handleCreate = (data) => {
    console.log(data);
    data.balance=data.openingBalDr-data.openingBalCr
    data.type="suplier"
    axios.post(`${URL}user/create`, data).then((res) => {
        if (res?.status === 200) {
          toast.success("Supplier Created");
          reset()
          axios
            .get(`${URL}user/getSuplier`)
            .then((res) => {
              // console.log(res);
              setGetSuplier(res?.data);
            })
            .catch((error) => {
              console.error("Fetching data error : ", error);
            });


          setModalOpen(false)
        } else {
          return toast.error(res?.data?.message);
        }
      });
    
  };



  return (
    <Modal
      title="Create Supplier"
      style={{ top: 20 }}
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      width={600}
      footer={[


      ]}
    >
      <hr />
      <form onSubmit={handleSubmit(fn_handleCreate)}>
        <div className="">


          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Supplier Name</label>
            <input
              {...register("customerName")}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Customer Name"
              required

            />

          </div>


          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              {...register("address")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Address"
              required
            />
          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Phone 1</label>
            <input
              {...register("phone1")}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Phone 1"
              required
            />
          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Phone 2</label>
            <input
              {...register("phone2")}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Phone 2"
              required
            />
          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">fax</label>
            <input
              {...register("fax")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="fax"
              required
            />
          </div>







          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Opening Bal Dr</label>
            <input
              {...register("openingBalDr")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Opening Bal Dr"
              required
            />
          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Opening Bal Cr</label>
            <input
              {...register("openingBalCr")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Opening Bal Cr"
              required
            />
          </div>


          <div className="form-group tw-mt-2">

            <div>Account Type</div>
            <select
              {...register("accountType")}
              className="form-select" aria-label="Default select example"
              required>
              <option value="">Select The Account type</option>
              {account.map((item) => {
                return <option value={item._id}>{item.type}</option>
              })}
            </select>

          </div>

        </div>
        <div class="form-check tw-mt-2">
          <input  {...register("trailBalance")} class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
          <label class="form-check-label" for="flexCheckChecked">
            Show on Trail Balance
          </label>
        </div>



        <div className="tw-mt-4 tw-flex tw-items-center tw-gap-4 tw-justify-end">
          <Button key="cancel" disabled={loader} onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <button className=" tw-w-20 tw-h-8 tw-text-cyan-50 tw-rounded-md" id="submit" disabled={loader} style={{ "background-color": "#0b9444" }}>
            Create
          </button>

          {loader ? <div class="spinner-border text-primary" role="status">
            {/* <span class="sr-only">Loading...</span> */}
          </div> : null}
        </div>



      </form>
    </Modal>
  );
};

export default CreateSuplier;
