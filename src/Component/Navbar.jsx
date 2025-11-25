

import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const {menuOpen, setMenuOpen}=useState(false);

  // Active link style
  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold underline underline-offset-4"
      : "hover:text-primary";




      const handleLinkClick = () => setMenuOpen(false);
  return (
    <div className="bg-base-200 shadow-sm  fixed top-0 right-0 left-0 z-50">
      <div className='max-w-[1140px] mx-auto navbar px-4 md:px-10'>

      <div className="flex-1">
        <Link to="/" className="text-lg md:text-2xl font-bold text-primary">
          HabitTracker
        </Link>
      </div>
      <div className="dropdown dropdown-end md:hidden">
          
          <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          >
            {user && (
            <>
                <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
                  <img
                    src={user.photoURL || "https://i.postimg.cc/T3R9zTny/avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-primary md:hidden "
                  />
                 
                </div>
              
            </>
          )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user && <li><NavLink to="/profile" className={activeStyle}  onClick={handleLinkClick}>My Profile</NavLink></li>}
          
            {user && (
              <>
                <li><button onClick={logOut}>Logout</button></li>
              </>
            )}
          </ul>
          
        </div>

      <div className="flex-none">
        {/* --------- Mobile Dropdown --------- */}
        <div className="dropdown dropdown-end md:hidden">
          
          <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><NavLink to="/" className={activeStyle} onClick={handleLinkClick}>Home</NavLink></li>
             <li><NavLink to="/add-habit" className={activeStyle} onClick={handleLinkClick} >Add Habit</NavLink></li>
             <li><NavLink to="/my-habits" className={activeStyle} onClick={handleLinkClick}>My Habits</NavLink></li>
          <li><NavLink to="/public-habits" className={activeStyle} onClick={handleLinkClick}>Public Habits</NavLink></li>
         
            {!user && (
              <>
                <li><NavLink to="/login" className={activeStyle} onClick={handleLinkClick}>Login</NavLink></li>
                <li><NavLink to="/signup" className={activeStyle} onClick={handleLinkClick}>Signup</NavLink></li>
              </>
            )}
            
          </ul>
          
        </div>
        <input type="checkbox" className='toggle theme-controller md:hidden' value="dark" id="" />

        {/* --------- Desktop Menu --------- */}
        <ul className="menu menu-horizontal hidden md:flex gap-4 text-[16px] items-center">
          <li><NavLink to="/" className={activeStyle} onClick={handleLinkClick}>Home</NavLink></li>
          <li><NavLink to="/add-habit" className={activeStyle} onClick={handleLinkClick}>Add Habit</NavLink></li>
          <li><NavLink to="/my-habits" className={activeStyle} onClick={handleLinkClick}>My Habits</NavLink></li>
          <li><NavLink to="/public-habits" className={activeStyle} onClick={handleLinkClick}>Public Habits</NavLink></li>
          
          
          {!user && (
            <>
              <li><NavLink to="/login" className={`{activeStyle} btn btn-outline btn-secondary`}>Login</NavLink></li>
              <li><NavLink to="/register" className={`{activeStyle} btn btn-outline btn-secondary`}>Register</NavLink></li>
            </>
          )}
          <div className="dropdown dropdown-end">
          
          <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          >
            {user && (
            <>
                <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
                  <img
                    src={user.photoURL || "https://i.postimg.cc/T3R9zTny/avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-primary "
                  />
                 
                </div>
              
            </>
          )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user && <li><NavLink to="/profile" className={`{activeStyle}`} onClick={handleLinkClick}>My Profile</NavLink></li>}
          
            {user && (
              <>
                <li><button onClick={logOut}>Logout</button></li>
              </>
            )}
          </ul>
          
        </div>
            <input type="checkbox" className='toggle theme-controller' value="dark" id="" />

        </ul>
          
        
      </div>
            </div>
    </div>
  );
};

export default Navbar;

