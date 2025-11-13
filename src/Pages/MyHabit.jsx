import React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';


const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/habits/${user.email}`)
        .then((res) => {
          setHabits(res.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load habits!");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10 text-blue-600 font-semibold">Loading habits...</p>;
  }

  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:5000/habits/${id}`)
        .then((res) => {
          if (res.data.success) {
            // ✅ UI থেকে মুছে ফেলো
            setHabits("habits.filter((habit) => habit._id !== id)");
            Swal.fire("Deleted!", "Your habit has been deleted.", "success");
          } else {
            toast.error("Habit not found!");
          }
        })
        .catch(() => toast.error("Delete failed!"));
    }
  });
};

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Toaster />
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">My Habits</h2>

      {habits.length === 0 ? (
        <p className="text-center text-gray-600">No habits found. Try adding one!</p>
      ) : (
        <table className="min-w-full border text-center">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Created Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit._id}>
                <td className="border px-4 py-2">{habit.title}</td>
                <td className="border px-4 py-2">{habit.category}</td>
                <td className="border px-4 py-2">
                  {new Date(habit.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    hour12: true,
                    
                  })
                  .replace("am", "AM")
                  .replace("pm", "PM")
                  }
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => toast.success("Coming soon!")}
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyHabits;