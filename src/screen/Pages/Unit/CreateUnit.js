import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const CreateUnit = ({ Modal, Button, modalOpen, setModalOpen }) => {
    const [unitName, setUnitName] = useState('')

    const navigate = useNavigate()
    const addMecicine = () => {
        // const param = {
        //     'name': name,
        //     'price': price,
        //     'description': description
        // }
        // axios.post('http://192.168.18.47:8003/api/v1/medicine/create', param).then((res) => {
        //     navigate('/medicine')
        //     window.location.reload()
        // }).then((err) => { console.log(err); })

    }
    return (
        <>
            <Modal
                title="Create Unit"
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
                        <label className="productCreateTxt">Unit Name*</label>
                        <input type="text" className="productCreateInput" value={unitName} placeholder="Unit" id="fullName" required onChange={(e) => setUnitName(e.target.value)} />

                    </div>

                    <hr />
                </div>

            </Modal>
        </>
    )


}
export default CreateUnit