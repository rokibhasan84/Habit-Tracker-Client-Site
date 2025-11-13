import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");
  const [showPassword, setShowPassword]=useState(false);
  const navigate = useNavigate();

   const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Google Login Successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/[A-Z]/.test(password)) return setError("Must include an uppercase letter!");
    if (!/[a-z]/.test(password)) return setError("Must include a lowercase letter!");
    if (password.length < 6) return setError("Password must be at least 6 characters!");

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo).then(() => {
          toast.success("Signup successful!");
          navigate("/");
        });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Toaster />
      <form onSubmit={handleSignup} className="bg-base-200 p-8 rounded-lg w-96 space-y-3 my-10">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        <input name="name" type="text" placeholder="Name" className="input input-bordered w-full" required />
        <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered w-full" required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
        <div className="relative">
        
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 z-10">
                  {
                    showPassword ? (<IoEye />) : (<IoMdEyeOff />)
                  }
        
                </button>
                </div>
        <p className="text-red-500 text-sm">{error}</p>
        <button className="btn btn-outline btn-primary w-full">Register</button>
        <button
          type="button"
          onClick={handleGoogle}
          className="btn btn-outline btn-secondary w-full"
        >
          Login with Google
        </button>
         <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
      </p>

      </form>
    </div>
  );
};

export default Register;