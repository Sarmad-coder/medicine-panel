import axios from "axios"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FiEye, FiDelete } from "react-icons/fi";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";           
import Medicine from './../Medicine/Medicine';

const CreatePurchaseMedicine = ({ Modal, Button, modalOpen, setModalOpen }) => {
    const [companyId, setCompanyId] = useState('')
    const [categoryId, setCategoyrId] = useState('')
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [salePrcie, setsalePrice] = useState('')
    const [purchasePrice, setPurchasePrice] = useState('')
    const [qty, setQty] = useState('')
    const [reorder, setReorder] = useState('')
    const [typeId, setTypeId] = useState('')






const [category,setCategory] = useState([])

    useEffect(()=>{

        
        axios.get('http://192.168.18.41:3002/category/getAll').then((res) => {

        setCategory(res.data)
        console.log(res);
    


        }).then((err) => { console.log(err); })

       

      },[])

    const navigate = useNavigate()
    const addMecicine = () => {


            if(!companyId){

              return toast.error('must company name')
            
            }
             else if(!categoryId){
                return toast.error('must select your category')
             }

             else if(!itemName){

                return toast.error('must enter item name')

             }



             else if(!salePrcie){

                return toast.error('must enter sale Prcie')

             }

             else if(!purchasePrice){

                return toast.error('must enter Purchase Price')

             }




             else if(!qty){

                return toast.error('must enter Qty')

             }




             
                
                

                

             
            else {
                const param = {
                    'companyName':companyId,
                    'categoryId':setCategoyrId,
                    'itemName':setItemName,
                    'salePrice':setsalePrice,
                    'purchasePrice':setPurchasePrice,
                    'reOrder':setReorder,
                    'qty':qty,
                    'type':setTypeId,
                    
                }
                axios.post('http://192.168.18.41:3002/medicine/create', param).then((res) => {

                    console.log(res);
                    // navigate('/medicine')
                    // window.location.reload()
                }).then((err) => { console.log(err); })

            }

       

    }
    return (
        <>
            <Modal
                title="Create Medicine"
                style={{ top: 20 }}
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                width={600}
                footer={[
                    <div>
                        <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button key="ok" onClick={addMecicine} type="primary" >
                            Create
                        </Button>

                    </div>
                ]}
            >
                <hr />
                <div className="row">
                <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Supplier Name*</label>
                       <select name="" id="" className="form-control"  value={categoryId} onChange={(e) => setCategoyrId(e.target.value)} >

                       <option  selected>---select Supplier---</option>
                        {category?.map((item,index)=>{
                            return (
                                <option  selected value={item?._id}>{item?.categoryName}</option>
                            )
                        })}
                       
                      
                       </select>
                    </div>
                    

                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Medicine Name*</label>
                       <select name="" id="" className="form-control"  value={categoryId} onChange={(e) => setCategoyrId(e.target.value)} >

                       <option  selected>---select Medicine---</option>
                        {category?.map((item,index)=>{
                            return (
                                <option  selected value={item?._id}>{item?.categoryName}</option>
                            )
                        })}
                       
                      
                       </select>
                    </div>

                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Product Price*</label>
                        <input type="text" className="productCreateInput" value={itemName} placeholder="Product Price" id="emailAddress" required onChange={(e) => setItemName(e.target.value)} />

                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Purchase Price*</label>
                        <input type="text" className="productCreateInput" value={purchasePrice} placeholder="Purchase Price" id="password" required onChange={(e) => setPurchasePrice(e.target.value)} />

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Sale Price*</label>
                        <input type="text" className="productCreateInput" value={salePrcie} onChange={(e) => setsalePrice(e.target.value)} placeholder="Sale Price" id="emailAddress" required />
                    </div>
                    <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Qty*</label>
                        <input type="text" className="productCreateInput" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Qty" id="password" required />
                    </div>
                </div>
                
            </Modal>
        </>
    )


}
export default CreatePurchaseMedicine