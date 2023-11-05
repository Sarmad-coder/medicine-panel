import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../Url";

const Edit_medicine = ({ Modal, Button, modalOpen, setModalOpen,setMedicineData,getData }) => {
  const [companyId, setCompanyId] = useState(getData?.companyName);
  const [categoryId, setCategoyrId] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [salePrcie, setsalePrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [qty, setQty] = useState("");
  const [reorder, setReorder] = useState("");
  const [typeId, setTypeId] = useState("");

  const [category, setCategory] = useState([]);
  console.log(category);
  useEffect(() => {
    axios
      .get(`${URL}category/getAll`)
      .then((res) => {
        setCategory(res.data);
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  const addMecicine = () => {

      const param = {
        id:getData?._id,
        companyName:companyId,
        categoryId: categoryId,
        itemName: itemName,
        salePrice: salePrcie,
        purchasePrice: purchasePrice,
        reOrder: reorder,
        qty: qty,
        type: typeId,
      };


      axios
        .put(`${URL}medicine/updateById`, param)
        .then((res) => {
          
          if (res?.status === 200) {
          setModalOpen(false)
          


          axios
          .get(`${URL}medicine/getAll`)
          .then((res) => {
            setMedicineData(res.data);
          })
          .then((err) => {
            console.log(err);
          });

        }

        })
        .then((err) => {
          console.log(err);
        });
    
  };
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
            <Button key="cancel" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button key="ok" onClick={addMecicine} type="primary">
              Create
            </Button>
          </div>,
        ]}
      >
        <hr />
        <div className="row">
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Company Name*</label>
            <input
              type="text"
              className="productCreateInput"
              value={companyId}
              placeholder="Company Name"
              id="fullName"
              
            //   onChange={(e) => setCompanyId(e.target.value)}

            disabled
            />
          </div>

          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Category Name*</label>
            <select
              name=""
              id=""
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoyrId(e.target.value)}

            >
            
              {category?.map((item, index) => {
                return (
                  <option selected value={item?._id}>
                    {item?.categoryName}
                  </option>
                );
              })}
            </select>
          </div>

          <hr />
        </div>
        <div className="row">
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Item Name*</label>
            <input
              type="text"
              className="productCreateInput"
              value={itemName}
              placeholder="Item name"
              id="emailAddress"
            
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Purchase Price*</label>
            <input
              type="text"
              className="productCreateInput"
              value={purchasePrice}
              placeholder="Description"
              id="password"
              
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Sale Price*</label>
            <input
              type="text"
              className="productCreateInput"
              value={salePrcie}
              onChange={(e) => setsalePrice(e.target.value)}
              placeholder="Sale Price"
              id="emailAddress"
              
            />
          </div>
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Qty*</label>
            <input
              type="text"
              className="productCreateInput"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Qty"
              id="password"
              
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Reorder*</label>
            <input
              type="text"
              className="productCreateInput"
              value={reorder}
              onChange={(e) => setReorder(e.target.value)}
              placeholder="Reorder"
              id="emailAddress"
                
            />
          </div>
          {/* <div className="col-md-6 d-flex flex-column px-3 mb-3">
                        <label className="productCreateTxt">Type Id*</label>
                        <input type="text" className="productCreateInput" value={typeId} onChange={(e) => setTypeId(e.target.value)} placeholder="Type Id" id="password" required />
                    </div> */}
          <div className="col-md-6 d-flex flex-column px-3 mb-3">
            <label className="productCreateTxt">Medicine Type*</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={(e) => setTypeId(e.target.value)}
            >
              <option value="">Liquid</option>
              <option value="">Powder</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Edit_medicine;
