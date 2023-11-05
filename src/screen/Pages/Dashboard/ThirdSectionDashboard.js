import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ThirdSectionDashBoard = () => {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
                { y: 40, label: "Bever" },
                { y: 30, label: "Phyliss J. Polite" },
                { y: 20, label: "walk-in-customer" },
                { y: 14, label: "Fred C. Rasmussen" },
                { y: 10, label: "Thomas M. Martin" }
            ]
        }]
    }
    return (
        <div className="row mb-4 mx-4">
            <div className="col-lg-7 col-md-12">
                <p className="dashboardTxtHead">
                    Recent Sales
                </p>
                <div className="card-title me-3 dashboardSectionBox">
                    <table className="dashBoardTableSales">
                        <tr className="dashBoardTableSalesHead">
                            <td>Ref</td>
                            <td>Customer</td>
                            <td>Grand Total</td>
                            <td>Paid</td>
                            <td>Due</td>
                        </tr>
                        <tr className="dashBoardTableSalesTxt">
                            <td>3423452345235</td>
                            <td>Phyliss J. Polite</td>
                            <td>$ 203.00</td>
                            <td>$ 203.00</td>
                            <td>$ 0.00</td>
                        </tr>
                        <tr className="dashBoardTableSalesTxt">
                            <td>3423452345235</td>
                            <td>Phyliss J. Polite</td>
                            <td>$ 203.00</td>
                            <td>$ 203.00</td>
                            <td>$ 0.00</td>
                        </tr>
                        <tr className="dashBoardTableSalesTxt">
                            <td>3423452345235</td>
                            <td>Phyliss J. Polite</td>
                            <td>$ 203.00</td>
                            <td>$ 203.00</td>
                            <td>$ 0.00</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="col-lg-5 col-md-12 dashboardSectionBox">
                <p className="dashboardTxtHead">
                    Top Clients (Aug, 2023)
                </p>
                <div className="mx-5">
                    <CanvasJSChart options={options} />
                </div>
            </div>
        </div>
    )
}

export default ThirdSectionDashBoard