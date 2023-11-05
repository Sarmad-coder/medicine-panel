import axios from "axios"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"


const UpdateWarehouse = ({ Modal, Button, updateModalOpen, setUpdateModalOpen, URL, setAllWarehouse, warehouseDetails }) => {
    const [propsDetails, setPropsDetails] = useState()
    useEffect(() => {
        setPropsDetails(warehouseDetails)
    }, [warehouseDetails])
    const fn_handleUpdate = () => {
        const params = {
            name: document.getElementById("warehouseName").value,
            phone: document.getElementById("warehousePhone").value,
            country: document.getElementById("warehouseCountry").value,
            city: document.getElementById("warehouseCity").value,
            email: document.getElementById("warehouseEmail").value,
            zipCode: document.getElementById("warehouseZipCode").value
        }
        axios.patch(`${URL}/warehouse/${propsDetails?._id}`, params).then((res) => {
            if (res?.data?.status === 200) {
                toast.success("Updated")
                setUpdateModalOpen(false)
                axios.get(`${URL}/warehouse`).then((res) => {
                    setAllWarehouse(res?.data?.data?.reverse())
                })
            } else {
                toast.error(res?.data?.message)
            }
        })
    }
    return (
        <Modal
            title="Update Warehouse"
            style={{ top: 20 }}
            open={updateModalOpen}
            onOk={() => setUpdateModalOpen(false)}
            onCancel={() => setUpdateModalOpen(false)}
            width={800}
            footer={[
                <Button key="cancel" onClick={() => setUpdateModalOpen(false)}>Cancel</Button>,
                <Button key="ok" type="primary" onClick={() => {
                    fn_handleUpdate()
                }}>Update</Button>
            ]}
        >
            <hr />
            <div className="row">
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Name*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Name" id="warehouseName" required defaultValue={propsDetails?.name} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Phone*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Phone" id="warehousePhone" required defaultValue={propsDetails?.phone} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Country*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Country" id="warehouseCountry" required defaultValue={propsDetails?.country} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">City*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse City" id="warehouseCity" required defaultValue={propsDetails?.city} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Email*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Email" id="warehouseEmail" required defaultValue={propsDetails?.email} />
                </div>
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Zip Code*</label>
                    <input type="text" className="productCreateInput" placeholder="Enter Warehouse Zip Code" id="warehouseZipCode" required defaultValue={propsDetails?.zipCode} />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateWarehouse