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
  const [editingHabit, setEditingHabit] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


  // When you submit your form send a update request
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedHabit = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      reminderTime: form.reminderTime.value,
    };

    axios
      .put(`http://localhost:5000/habits/${editingHabit._id}`, updatedHabit)
      .then((res) => {
        if (res.data.success) {
          toast.success("Habit updated successfully!");
          // Update UI
          setHabits((prev) =>
            prev.map((h) =>
              h._id === editingHabit._id ? { ...h, ...updatedHabit, 
                updateAt: new Date().toISOString()
               } : h
            )
          );
          setEditingHabit(null);
        } else {
          toast.error(res.data.message || "Failed to update habit");
        }
      })
      .catch(() => toast.error("Error while updating habit"));
  };



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

  const filteredHabits = habits
  .filter((habit) =>
    habit.title.toLowerCase().includes(searchText)
  )
  .filter((habit) =>
    selectedCategory === "All" ? true : habit.category === selectedCategory
  );



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
          if (Array.isArray(habits) || res.data.success) {
            // Remove from UI
            setHabits(habits.filter((habit) => habit._id !== id));
            Swal.fire("Deleted!", "Your habit has been deleted.", "success");
            toast.success("Habit delete successfully!")
            ;
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
      <div className="flex items-center mb-5">
  <input
    type="text"
    placeholder="Search habits..."
    className="border px-3 py-2 rounded"
    onChange={(e) => setSearchText(e.target.value.toLowerCase())}
  />

  <select
    className="border px-3 py-2 rounded ml-3 md:ml-135"
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="All">All Categories</option>
    <option value="Fitness">Fitness</option>
    <option value="Study">Study</option>
    <option value="Lifestyle">Lifestyle</option>
    <option value="Health">Health</option>
  </select>
  {filteredHabits.length === 0 ? (
  <p className=" text-gray-600">No habits found.</p>
) : (
  filteredHabits.map((habit) => (
    <tr key={habit._id.toString()}>
      {/* rest of your table row */}
    </tr>
  ))
)}
</div>

      {habits.length === 0 ? (
        <p className="text-center text-gray-600">No habits found. Try adding one!</p>
      ) : (
        
        <table className="min-w-full border text-center">
          
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Created Date</th>
              <th className="Border px-4 py-2">Last Update</th>
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
                  { habit.updateAt
                  ? new Date(habit.updateAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    hour12: true,
                    
                  })
                  .replace("am", "AM")
                  .replace("pm", "PM") : "-"
                  }
                    
                  
                  
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setEditingHabit(habit)}
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 m-2 md:m-0"
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
      {/* ✅ Edit Form Popup */}
{editingHabit && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <form
      onSubmit={handleUpdate}
      className="bg-white rounded-2xl p-6 w-96 shadow-xl"
    >
      <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">
        Edit Habit
      </h3>

      <label className="block mb-2">Title</label>
      <input
        type="text"
        name="title"
        defaultValue={editingHabit.title}
        className="border w-full mb-3 px-2 py-1 rounded"
      />

      <label className="block mb-2">Category</label>
      <input
        type="text"
        name="category"
        defaultValue={editingHabit.category}
        className="border w-full mb-3 px-2 py-1 rounded"
      />

      <label className="block mb-2">Description</label>
      <textarea
        name="description"
        defaultValue={editingHabit.description}
        className="border w-full mb-3 px-2 py-1 rounded"
      ></textarea>

      <label className="block mb-2">Reminder Time</label>
      <input
        type="time"
        name="reminderTime"
        defaultValue={editingHabit.reminderTime}
        className="border w-full mb-4 px-2 py-1 rounded"
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setEditingHabit(null)}
          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
)}
    </div>
  );
};

export default MyHabits;