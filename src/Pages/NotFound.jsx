import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import errorImg from "../assets/App-Error.png"

const NotFound = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center p-6 text-center mt-20">
<motion.h1
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="text-7xl font-bold text-[#ee0707] mb-4"
>
Oops!
</motion.h1>


<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.3, duration: 0.6 }}
className="text-xl text-gray-600 mb-8"
>
<img src={errorImg} alt="" />
</motion.p>


<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.5, duration: 0.6 }}
>
<Link
to="/"
className="px-6 py-3 btn btn-outline btn-primary rounded-2xl shadow  transition"
>
Go Back Home
</Link>
</motion.div>
</div>
        </div>
    );
};

export default NotFound;