import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const MainLayout = () => {
    return (
        <div>
           <Navbar></Navbar>
           <div className='mt-12'>
            <Outlet></Outlet>
           </div>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;