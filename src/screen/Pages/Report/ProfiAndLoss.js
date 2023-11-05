import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiDelete, FiEye } from 'react-icons/fi';
import URL from '../../Url';

const ProftAndLoss = () => {
const [profilt,setProfilt] = useState([])

    useEffect(()=>{
         
        axios.get(`${URL}directSale/profit`).then((res)=>{
            console.log(res.data);
 
            setProfilt(res.data)
        })
    },[])


    const singleProfit = profilt.map((item)=>item?.profit);


    const totalProfit = singleProfit.reduce((accumulator, currentValue) => {
        return parseInt(accumulator) + parseInt(currentValue);
      }, 0);


    return (
        <div class="content-section p-3">
        <div class="breadcrumb">
            <h1>Profit and Loss</h1>
        </div>
    
        <div class="separator-breadcrumb border-top"></div>
    
        <div id="profit_report">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-end mr-3">
                        <a class="btn btn-success">
                            <i class="i-Billing"></i>
                            Print
                        </a>
                    </div>
                </div>
            </div>
    
            <div id="print_section">
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="warehouse_id">Warehouse</label>
                        <select name="warehouse_id" id="warehouse_id" class="form-control">
                            <option value="0">All</option>
                            <option value="1">Warehouse 1</option>
                            <option value="2">Warehouse 2</option>
                        </select>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-end mb-5">
                            <a id="reportrange">
                                <i class="fa fa-calendar"></i>&nbsp;
                                <span>August 31, 2023 - August 31, 2023</span>
                                <i class="fa fa-caret-down"></i>
                            </a>
                        </div>
                    </div>
                </div>
    
                {/* <!-- Cards displaying profit and loss information -->
                <!-- You've provided a lot of content here, but I'm including only a few lines as an example --> */}
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                        <div class="card card-icon-big text-center mb-30">
                            <div class="card-body">
                                <i class="i-Shopping-Cart"></i>
                                <div class="content">
                                    <p class="text-muted mt-2 mb-0">(1) Sales</p>
                                    <p class="text-primary text-24 line-height-1 mb-2">Rs-/{totalProfit}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Add more card sections as needed --> */}
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default ProftAndLoss;
