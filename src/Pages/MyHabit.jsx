import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingHabit, setEditingHabit] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Load user habits
  useEffect(() => {
    if (!user?.email) return;

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
  }, [user]);

  // Delete Habit
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This habit will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/habits/${id}`)
          .then(() => {
            setHabits((prev) => prev.filter((habit) => habit._id !== id));
            toast.success("Habit deleted!");
          })
          .catch(() => toast.error("Delete failed!"));
      }
    });
  };

  // Filter + Search Logic
  const visibleHabits = habits
    .filter((h) =>
      (h.title || "").toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((h) =>
      categoryFilter === "All" ? true : h.category === categoryFilter
    );

  if (loading) {
    return (
      <p className="text-center mt-10 text-blue-500 font-semibold">
        Loading habits...
      </p>
    );
  }

  const handleComplete = (id) => {
  axios.put(`http://localhost:5000/habits/${id}, { status: "complete" }`)
    .then(() => {
      setHabits((prev) =>
        prev.map((h) =>
          h._id === id ? { ...h, status: "complete" } : h
        )
      );
      toast.success("Habit marked as complete!");
    })
    .catch(() => toast.error("Failed to update status"));
};

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Toaster />
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        My Habits
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search habits..."
          className="border p-2 rounded w-full md:w-1/2"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="All">All Categories</option>
          <option value="Morning">Morning</option>
          <option value="Work">Work</option>
          <option value="Fitness">Fitness</option>
          <option value="Evening">Evening</option>
          <option value="Study">Study</option>
        </select>
      </div>

      {/* Habit Cards */}
      {visibleHabits.length === 0 ? (
        <p className="text-center text-gray-500">No habits found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleHabits.map((habit) => (
            <div
              key={habit._id}
              className="border rounded-lg shadow-lg bg-[#22020238] overflow-hidden hover:shadow-xl transition p-5"
            >
              {/* Image */}
              <div className="h-40 bg-gray-200 flex items-center justify-center rounded-xl">
                {habit.image ? (
                  <img
                    src={habit.image}
                    alt="habit"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1 text-gray-800">
                  {habit.title}
                </h3>

                <p className="text-sm bg-blue-100 inline-block text-blue-600 px-3 py-1 rounded-full mb-3">
                  {habit.category}
                </p>

                <p className={`text-sm font-semibold ${habit.status === "complete" ? "text-green-600" : "text-orange-500"}`}>
  Status: {habit.status === "complete" ? "Completed ✔" : "Pending..."}
</p>

                <p className="text-gray-600 text-sm mb-3">
                  {habit.description}
                </p>

                <p className="text-xs text-gray-400">
                  Created:{" "}
                  {new Date(habit.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setEditingHabit(habit)}
                    className="px-4 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
                <button
  onClick={() => handleComplete(habit._id)}
  className={`px-4 py-1 rounded text-white mt-5 ${
    habit.status === "complete" ? "bg-green-500" : "bg-blue-500"
  }`}
  disabled={habit.status === "complete"}
>
  {habit.status === "complete" ? "Completed ✔" : "Mark Complete"}
</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup Update Form */}
      {editingHabit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            className="bg-white w-96 p-6 rounded-xl shadow-xl"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;

              const updated = {
                title: form.title.value,
                category: form.category.value,
                description: form.description.value,
                reminderTime: form.reminderTime.value,
              };

              axios
                .put(`http://localhost:5000/habits/${editingHabit._id}`, updated)
                .then(() => {
                  setHabits((prev) =>
                    prev.map((h) =>
                      h._id === editingHabit._id
                        ? { ...h, ...updated, updatedAt: new Date() }
                        : h
                    )
                  );
                  toast.success("Habit updated!");
                  setEditingHabit(null);
                })
                .catch(() => toast.error("Update failed!"));
            }}
          >
            <h2 className="text-xl font-bold text-center mb-4">
              Update Habit
            </h2>

            <input
              name="title"
              defaultValue={editingHabit.title}
              className="border p-2 rounded w-full mb-3"
            />

            <input
              name="category"
              defaultValue={editingHabit.category}
              className="border p-2 rounded w-full mb-3"
            />

            <textarea
              name="description"
              defaultValue={editingHabit.description}
              className="border p-2 rounded w-full mb-3"
            />

            <input
              name="reminderTime"
              type="time"
              defaultValue={editingHabit.reminderTime}
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEditingHabit(null)}
                className="bg-gray-400 px-3 py-1 rounded text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-500 px-3 py-1 rounded text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyHabits;