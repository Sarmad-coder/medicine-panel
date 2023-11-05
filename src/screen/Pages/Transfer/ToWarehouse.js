import React, { useEffect, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd'
import { AiOutlineCheckCircle } from "react-icons/ai"
import { toast } from "react-toastify";
import axios from "axios";

const ToWarehouse = ({ allProduct, URL, allWarehouse }) => {
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectWarehouse, setSelectWarehouse] = useState("")
    const fn_selectProduct = (e) => {
        if (e?.target?.checked) {
            selectedProduct.push({ id: e?.target?.value, qty: "" })
        } else {
            const filter = selectedProduct?.filter(item => item?.id !== e?.target?.value)
            setSelectedProduct(filter)
        }
    }
    const fn_proQty = (e) => {
        console.log(e?.target?.name)
        console.log(selectedProduct)
        // selectedProduct?.map((i) => {
        //     if (i?.id === e?.target?.name) {

        //     }
        // })
    }
    const fn_Transfer = () => {
        if (selectedProduct?.length === 0) {
            return toast.error("Select Product")
        } else if (selectWarehouse === "") {
            return toast.error("Select Warehouse")
        } else {
            const params = {
                prodIds: selectedProduct,
                warehouseId: selectWarehouse
            }
            console.log(params)
            // axios.patch(`${URL}/warehouse/productshift`, params).then((res) => {
            //     if (res?.data?.status === 200) {
            //         return toast.success("Product Shifted")
            //     } else {
            //         return toast.error(res?.data?.message)
            //     }
            // })
        }
    }
    return (
        <>
            <div className="productMainBox">
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt mb-1">Products</label>
                    <Space.Compact size="large" style={{ backgroundColor: "rgba(40, 129, 201, 0.055)" }}>
                        <Input addonBefore={<SearchOutlined />} placeholder="Search Product" />
                    </Space.Compact>
                </div>
                <div className="table-responsive-md mt-5 mx-3">
                    <table className="table">
                        <thead>
                            <tr className="table-primary">
                                <td className="productCreateTxt fw-semibold">Select</td>
                                <td className="productCreateTxt fw-semibold">Product Image</td>
                                <td className="productCreateTxt fw-semibold">Product Name</td>
                                <td className="productCreateTxt fw-semibold">Group</td>
                                <td className="productCreateTxt fw-semibold">Net Unit Cost</td>
                                <td className="productCreateTxt fw-semibold">Current Stock</td>
                                <td className="productCreateTxt fw-semibold">Quantity to Transfer</td>
                            </tr>
                        </thead>
                        <tbody>
                            {allProduct && allProduct?.map((item) => (
                                <tr>
                                    <td><input type="checkbox" value={item?._id} onChange={(e) => fn_selectProduct(e)} /></td>
                                    <td>
                                        <div>
                                            <img src={`http://192.168.18.47:8003/images/${item?.imageUrl}`} height={"50px"} />
                                        </div>
                                    </td>
                                    <td>{item?.productName}</td>
                                    <td>{item?.group}</td>
                                    <td>${item?.productPrice}</td>
                                    <td>{item?.quantity} {item?.unitProduct}</td>
                                    <td>
                                        <input
                                            className="productCreateInput"
                                            name={item?._id}
                                            style={{ width: "160px" }}
                                            placeholder="Enter Quantity to Transfer"
                                            onChange={(e) => fn_proQty(e)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="productMainBox">
                <div className="d-flex flex-column px-3 mb-3">
                    <label className="productCreateTxt">Select Warehouse</label>
                    <select className="productCreateInput" name="productType" required onChange={(e) => setSelectWarehouse(e?.target?.value)}>
                        <option selected value={""}>---Select Warehouse---</option>
                        {allWarehouse && allWarehouse?.map((item) => (
                            <option value={item?._id}>{item?.name}</option>
                        ))}
                    </select>
                </div>
                <button className="productSubmitBtn ms-3 mt-3" onClick={fn_Transfer}><AiOutlineCheckCircle className="submitProductIcon" />Submit</button>
            </div>
        </>
    )
}

export default ToWarehouse