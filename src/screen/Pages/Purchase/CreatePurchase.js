import React, { useEffect, useState } from "react";
import { Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai"
import axios from "axios";
import URL from "../../Url";
import { Oval } from 'react-loader-spinner';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePurchase = () => {
    const navigate = useNavigate()
    const [proloader, setProLoader] = useState(false)
    const [allSupplier, setAllSupplier] = useState([])
    const [allWarehouse, setAllWarehouse] = useState([])
    const [allProduct, setAllProduct] = useState([])
    const [supplierId, setSupplierId] = useState("")
    const [warehouseId, setWarehouseId] = useState("")
    const [test, setTest] = useState([]);
    useEffect(() => {
        axios.get(`${URL}/supplier`).then((res) => {
            setAllSupplier(res?.data?.data)
        })
        axios.get(`${URL}/warehouse`).then((res) => {
            setAllWarehouse(res?.data?.data)
        })
    }, [])
    const searchProduct = (e) => {
        if (e?.target?.id === "supplierId") {
            setSupplierId(e?.target?.value)
        } else if (e?.target?.id === "warehouseId") {
            setWarehouseId(e?.target?.value)
        }
    }
    const fn_searchProduct = () => {
        setAllProduct([])
        setProLoader(true)
        axios.post(`${URL}/purchasereport`, {
            supplierId: supplierId,
            warehouseId: warehouseId
        }).then((res) => {
            setProLoader(false)
            for (var i = 0; i < (res?.data?.data[1]?.qtyResult?.length); i++) {
                test.push(res?.data?.data[1]?.qtyResult[i][0]?.productIds)
            }
            setAllProduct(res?.data?.data[0]?.allPurchaseProducts)
        })
    }
    const fn_submit = () => {
        if (supplierId === "") {
            return toast.error("Select Supplier")
        } else if (warehouseId === "") {
            return toast.error("Select Warehouse")
        }
        const params = allProduct?.map(item => ({
            ...item,
            whQty: test?.filter(i => i?.proId === item?._id)[0]?.qty,
            wh: warehouseId
        }))
        axios.post(`${URL}/purchasedetail/create`, params).then((res) => {
            console.log(res?.data)
            if (res?.data?.status === 200) {
                toast.success("Purchase Created")
                navigate("/allpurchase")
            }
        })
    }
    return (
        <div>
            <p className='dashboadHeading' >Add Purchase</p >
            <hr className='dashboardLine' />
            <div className="productMainBox">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Supplier*</label>
                        <select className="productCreateInput" id="supplierId" onChange={(e) => searchProduct(e)}>
                            <option selected value={""}>---Choose Supplier---</option>
                            {allSupplier && allSupplier?.map((item) => (
                                <option value={item?._id}>{item?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-5 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Warehouse*</label>
                        <select className="productCreateInput" id="warehouseId" onChange={(e) => searchProduct(e)}>
                            <option selected value={""}>---Choose Warehouse---</option>
                            {allWarehouse && allWarehouse?.map((item) => (
                                <option value={item?._id}>{item?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 d-flex flex-column px-3 mb-3">
                        <button type="submit" className="btn btn-info btn-md ms-3 mt-3" style={{ width: "120px" }} onClick={fn_searchProduct}>
                            <AiOutlineSearch className="submitProductIcon text-dark" />Search
                        </button>
                    </div>
                </div>
            </div>
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
                                <td scope="col" className="productCreateTxt fw-semibold">#</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Image</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Product Name</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Unit Cost</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Available Stock</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Grand Total</td>
                                <td scope="col" className="productCreateTxt fw-semibold">Action</td>
                            </tr>
                        </thead>
                        {proloader === true && (
                            <Oval
                                height={33}
                                width={33}
                                color="#0F5ABB"
                                visible={true}
                                secondaryColor="#B2C4FF"
                                strokeWidth={6}
                                strokeWidthSecondary={7}
                                style={{
                                    display: 'block',
                                    margin: '0 auto',
                                }}
                            />
                        )}
                        {allProduct && allProduct?.map((item, index) => (
                            <tr style={{ height: "2rem", borderBottom: "1px solid rgba(128, 128, 128, 0.253)" }}>
                                <td className="ps-2 productCreateTxt">{index + 1}</td>
                                <td className="ps-2 productCreateTxt">
                                    <div>
                                        <img src={`http://192.168.18.47:8003/images/${item?.imageUrl}`} height={"50px"} />
                                    </div>
                                </td>
                                <td className="ps-2 productCreateTxt">{item?.productName}</td>
                                <td className="ps-2 productCreateTxt">${item?.productPrice}</td>
                                <td className="ps-2 productCreateTxt">
                                    {test?.filter(i => i?.proId === item?._id)[0]?.qty} {item?.unitProduct}
                                </td>
                                <td className="ps-2 productCreateTxt">
                                    ${item?.productPrice * test?.filter(i => i?.proId === item?._id)[0]?.qty}
                                </td>
                                <td className="ps-2 productCreateTxt">Action</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <div className="productMainBox">
                <div className="row">
                    <div className="col-12 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Please Prove any Details*</label>
                        <textarea type="number" className="productCreateTextArea" placeholder="Please Prove any Details" />
                    </div>
                </div>
            </div>
            <button className="btn btn-info btn-md ms-4" style={{ width: "120px" }} onClick={fn_submit} >
                <AiOutlineCheckCircle className="submitProductIcon text-dark" />Submit
            </button>
            <br /><br />
        </div>
    )
}

export default CreatePurchase