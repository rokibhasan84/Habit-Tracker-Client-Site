import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AddHabit = () => {
  const { user } = useContext(AuthContext);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newHabit = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      userEmail: user?.email,
      userName: user?.displayName,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:5000/habits", newHabit);
      if (res.data.insertedId) {
        toast.success("Habit added successfully!");
        form.reset();
      }
    } catch {
      toast.error("Failed to add habit!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg mb-10">
      <Toaster />
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Add New Habit</h2>
      <form onSubmit={handleAddHabit} className="space-y-4">
        <input name="title" type="text" placeholder="Habit Title" required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded"></textarea>
        <select name="category" required className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Morning">Morning</option>
          <option value="Work">Work</option>
          <option value="Fitness">Fitness</option>
          <option value="Evening">Evening</option>
          <option value="Study">Study</option>
        </select>
        <input name="reminderTime" type="time" className="w-full p-2 border rounded" />
        <button className="btn btn-outline btn-primary w-full">Add Habit</button>
      </form>
    </div>
  );
};

export default AddHabit;