import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };





  return (
    <div className="max-w-md mx-auto mt-45 mb-45 p-6 shadow-lg border rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;