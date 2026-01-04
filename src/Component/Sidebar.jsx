import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  
  const role = "user";

  return (
    <div className="w-64 bg-white shadow-lg p-5">
      <h2 className="text-xl font-bold mb-6 mt-5">Dashboard</h2>

      {/* User Routes */}
      <NavLink to="/dashboard" className="block mb-3">
        Overview
      </NavLink>

      <NavLink to="/dashboard/my-habits" className="block mb-3">
        My Habits
      </NavLink>
      <NavLink to="/dashboard/admin-habits" className="block mb-3">
        Habits
      </NavLink>
      <NavLink to="/dashboard/admin-users" className="block mb-3">
       Users
      </NavLink>


      {/* Admin Routes */}
      {role === "admin" && (
        <>
          <hr className="my-4" />
          <NavLink to="/dashboard/admin-habits" className="block mb-3">
            All Habits
          </NavLink>
          <NavLink to="/dashboard/admin-users" className="block mb-3">
            All Users
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;