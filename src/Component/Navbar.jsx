import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">HabitTracker</Link>

      <div className="space-x-4">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        <NavLink to="/add-habit" className="hover:underline">Add Habit</NavLink>
        <NavLink to="/my-habits" className="hover:underline">My Habits</NavLink>
        <NavLink to="/browse" className="hover:underline">Browse</NavLink>

        {user ? (
          <>
            <span className="ml-2">{user.displayName}</span>
            <button onClick={logOut} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-2">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:underline">Login</NavLink>
            <NavLink to="/register" className="hover:underline">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;