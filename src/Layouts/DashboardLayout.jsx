import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar></Sidebar>

      {/* Main content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;