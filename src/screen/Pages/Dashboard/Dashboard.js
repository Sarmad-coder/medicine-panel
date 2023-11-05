import React from 'react';
import "./Dashboard.css"
import FirstSectionDashBoard from './FirstSection';
import SecondSectionDashBoard from './SecondSectionDashBoard';
import ThirdSectionDashBoard from './ThirdSectionDashboard';

const Dashboard = () => {
    return (
        <div className="content-section">
            <p className='dashboadHeading' > Dashboard</p >
            <hr className='dashboardLine' />
            <div id="section_Dashboard">
                <FirstSectionDashBoard />
                {/* <SecondSectionDashBoard /> */}
                {/* <ThirdSectionDashBoard /> */}
            </div>
        </div >
    );
};

export default Dashboard;
