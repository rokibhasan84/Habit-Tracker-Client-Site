

import React from "react";
import { Link } from "react-router";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-base-200 py-10">
     
      <div className="max-w-[1140px] mx-auto px-5 flex flex-col md:flex-row justify-between gap-8">
        
       
        <div className="flex-1">
          <Link to='/'><h2 className="text-2xl font-bold text-primary mb-2">🌻 SkillSwap</h2></Link>
          <p className="text-sm text-gray-600 leading-relaxed">
            SkillSwap helps you connect, share, and grow through knowledge exchange.
            <br />
            Learn new things and collaborate with passionate learners around the world.
          </p>
        </div>

       
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-primary">Quick Links</h3>
          <ul className="space-y-1">
            <Link to='/'><li className="hover:underline">Home</li></Link>
            <Link to=''>
                   <li className="hover:underline">About</li>
            </Link>
                 
            <Link to='/allSkills'>
                  <li className="hover:underline">Skills</li>
            </Link>
            
            <Link>
                  <li className="hover:underline">Contact</li>
            </Link>
          </ul>
        </div>

       
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-primary">Contact Us</h3>
          <p className="text-sm text-[#167cc0]">
            📍 Dhaka, Bangladesh <br />
            📞 +880 1712 345 678 <br />
            ✉ support@habittracker.com
          </p>
          <div className="flex gap-3 mt-3">
            <a href="#" className="hover:text-primary"><FaFacebook /></a>
            <a href="#" className="hover:text-primary"><BsInstagram /></a>
            <a href="#" className="hover:text-primary"><FaSquareTwitter /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 mt-8 pt-4 text-center text-lg text-[#aa34ee]">
        © <span className="text-[#14bcda]">{new Date().getFullYear()}</span> SkillSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


