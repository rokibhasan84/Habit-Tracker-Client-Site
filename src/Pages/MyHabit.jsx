import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../Component/Loading";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingHabit, setEditingHabit] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [imageURL, setImageURL] = useState("");
  const [preview, setPreview] = useState(null);

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

   // Handle URL input
  const handleURLChange = (e) => {
    setImageURL(e.target.value);
    setPreview(e.target.value);
  };

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
      <p className="text-center mt-25 text-blue-500 font-semibold">
        <Loading></Loading>
        <p className="text-3xl my-5 text-blue-600 font-bold">My Habits...</p>
      </p>
    );
  }

  const handleToggleComplete = async (habit) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/habits/toggle-complete/${habit._id}`
    );

    if (res.data.status === "completed") {
      toast.success("Habit marked as completed!");
    } else {
      toast.success("Completion undone!");
    }

    // UI instant update
    setHabits(prev =>
      prev.map(h =>
        h._id === habit._id
          ? { ...h, status: res.data.status, completionDates: res.data.completionDates }
          : h
      )
    );

  } catch (err) {
    toast.error("Failed to update!");
  }
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
              className="rounded-lg shadow-lg hover:bg-white overflow-hidden hover:shadow-xl transition p-2"
            >
              {/* Image */}
              <div className="h-50 hover:bg-gray-200 flex items-center justify-center rounded-lg">
                {habit.image ? (
                  <img
                    src={habit.image}
                    alt="habit"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>

              {/* Content */}
              <div className="p-2">
                <h3 className="text-xl font-bold mb-1 text-gray-800">
                  {habit.title}
                </h3>

                <p className="text-sm bg-blue-100 inline-block text-blue-600 px-3 py-1 rounded-full mb-3">
                  {habit.category}
                </p>

                <p className={`text-sm font-semibold ${habit.status === "completed" ? "text-orange-500" : "text-green-600"}`}>
  Status: {habit.status === "completed" ? "Pending..." : "Completed ✔"}
</p>

                <p className="text-gray-600 text-sm mb-3">
                  {habit.description?.slice(0, 70)}...
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
                    className="px-4 py-1  text-black rounded btn btn-outline btn-info"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="px-4 py-1 text-black rounded btn btn-outline btn-secondary"
                  >
                    Delete
                  </button>
                </div>

                  <button
  onClick={() => handleToggleComplete(habit)}
  className={`px-4 py-1 rounded text-white mt-3
    ${habit.status === "completed" ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-700"}`}
>
  {habit.status === "completed" ? "Mark Completed" : "Completed ✔"}
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
                status: editingHabit.status || "pending",
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

            {/* Preview Image */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg border"
          />
        )}

            <input
          type="text"
          placeholder="OR paste image URL"
          value={imageURL}
          onChange={handleURLChange}
          defaultValue={editingHabit.image}
          className="w-full border rounded p-2 mb-3"
        />

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
                className=" px-3 py-1 rounded-lg hover:text-white rounded btn btn-outline btn-neutral"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-3 py-1 rounded-lg hover:text-white rounded btn btn-outline btn-accent"
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