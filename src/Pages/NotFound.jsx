import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
<motion.h1
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="text-6xl font-bold text-gray-800 mb-4"
>
404
</motion.h1>


<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.3, duration: 0.6 }}
className="text-xl text-gray-600 mb-8"
>
Page Not Found
</motion.p>


<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.5, duration: 0.6 }}
>
<Link
to="/"
className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
>
Go Back Home
</Link>
</motion.div>
</div>
        </div>
    );
};

export default NotFound;