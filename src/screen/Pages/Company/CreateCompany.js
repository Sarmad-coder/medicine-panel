import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import URL from "../../Url"
import { useForm } from 'react-hook-form';
const CreateCompany = ({
    Modal,
    Button,
    modalOpen,
    setModalOpen,
    setGetSuplier,
}) => {
    const [loader, setLoader] = useState(false);
  
    const { confirm } = Modal;

    let { handleSubmit, register, reset } = useForm()

    

    const fn_handleCreate = (data) => {
       

        axios.post(`${URL}company/create`, data).then((res) => {
            if (res?.status === 200) {
                toast.success("Company Created");
                reset()
                axios
                    .get(`${URL}company/getAll`)
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
            title="Create Company"
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
                        <label htmlFor="exampleInputEmail1">Company Name</label>
                        <input
                            {...register("companyName")}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Company Name"
                            required

                        />

                    </div>

                    <div className="form-group tw-mt-2">
                        <label htmlFor="exampleInputPassword1">Number</label>
                        <input
                            {...register("number")}
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Number"
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

export default CreateCompany;


