import axios from "axios";
import React, { useEffect, useState } from "react";
import URL from "./../../Url";
import { useForm } from 'react-hook-form';
import Select from 'react-select';
const EditExpense = ({
  Modal,
  Button,
  modalOpen,
  setModalUpdateOpen,
  setModalOpen,
  toast,
  setAllUsers,
  getData,
  Oval,
}) => {
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  let [options, setOptions] = useState([])
  let { handleSubmit, register, reset } = useForm()
  const getAccount = async () => {
    try {
      let data = []
      let user = await axios.get(`${URL}user/getAll`)
      let supplier = await axios.get(`${URL}supplier/getAll`)
      data = [...user.data, ...supplier.data]
      options = []
      data.forEach((item) => {
        let obj = {}
        if (item.customerName) {
          obj = { value: { id: item._id, user: true }, label: `${item.accountNo} ${item.customerName}` }
        } else {
          obj = { value: { id: item._id, supplier: true }, label: `${item.accountNo} ${item.supplierName}` }
        }
        options.push(obj)
      })
      setOptions(options)
      console.log(options)


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAccount()


  }, [])
  useEffect(() => {
    if (getData != {}) {
      reset(getData)
      if (getData.supplierCode) {
        selectedOption.value = { id: getData.supplierCode._id, supplier: true }
        selectedOption.label = getData.supplierCode.accountNo + " " + getData.supplierCode.supplierName
      } else if(getData.userCode){
        selectedOption.value = { id: getData.userCode._id, user: true }
        selectedOption.label = getData.userCode.accountNo + " " + getData.userCode.customerName
      }
      setSelectedOption({ ...selectedOption })
    }

  }, [getData])

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
  };

  const submit = async (data, e) => {
    if (selectedOption.value.user) {
      data.userCode = selectedOption.value.id
    } else {
      data.supplierCode = selectedOption.value.id
    }
    data.id=getData._id
    setLoader(true)
    axios.put(`${URL}expense/updateById`, data).then((res) => {
      if (res?.status === 200) {
        toast.success("Customer Created");
        setLoader(false);
        reset()
        setModalOpen(false);
        axios.get(`${URL}expense/getAll`).then((res) => {
          console.log(res);
          setAllUsers(res?.data);
        });
      } else {
        return toast.error(res?.data?.message);
      }
    });
  }
  return (
    <Modal
      title="Create Expense"
      style={{ top: 20 }}
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      width={600}
      footer={[


      ]}
    >
      <hr />
      <form onSubmit={handleSubmit(submit)}>
        <div className="">

          <div className="form-group tw-mt-2">

            <div>Type</div>
            <select
              {...register("type")}
              className="form-select" aria-label="Default select example"
              required>
              <option value="">Select The Type</option>
              <option value="Credit">Credit </option>
              <option value="Debit">Debit</option>

            </select>

          </div>

          <div className="form-group tw-mt-2">
            <div>Code</div>
            <Select

              options={options}
              isSearchable={true}
              isClearable={true}
              maxMenuHeight={200} // Adjust the maximum height as needed
              placeholder="Select The Code"
              required
              value={selectedOption}
              onChange={handleSelectChange}
            />
          </div>




          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Amount</label>
            <input
              {...register("amount")}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Amount"
              required
            />
          </div>









          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Description</label>
            <input
              {...register("description")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Description"
              required
            />
          </div>



        </div>



        <div className="tw-mt-4 tw-flex tw-items-center tw-gap-4 tw-justify-end">
          <Button key="cancel" disabled={loader} onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <button className=" tw-w-20 tw-h-8 tw-text-cyan-50 tw-rounded-md" id="submit" disabled={loader} style={{ "background-color": "#0b9444" }}>
            Update
          </button>

          {loader ? <div class="spinner-border text-primary" role="status">
            {/* <span class="sr-only">Loading...</span> */}
          </div> : null}
        </div>



      </form>
    </Modal>
  );
};

export default EditExpense;
