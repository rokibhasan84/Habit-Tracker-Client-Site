import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Component/Loading";

const AdminHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all habits
  useEffect(() => {
    axios.get("https://habit-tracker-server-site.vercel.app/habits")
      .then(res => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load habits");
        setLoading(false);
      });
  }, []);

  // Delete habit
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this habit?");
    if (!confirm) return;

    try {
      await axios.delete(`https://habit-tracker-server-site.vercel.app/habits/${id}`);
      toast.success("Habit deleted");

      // remove from UI
      setHabits(habits.filter(h => h._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-25 text-blue-500 font-semibold">
        <Loading></Loading>
        <p className="text-3xl my-5 text-blue-600 font-bold">All Habits...</p>
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Habits (Admin)</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>User</th>
              <th>Category</th>
              <th>Public</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {habits.map((habit, index) => (
              <tr key={habit._id}>
                <td>{index + 1}</td>
                <td>{habit.title}</td>
                <td>{habit.email}</td>
                <td>{habit.category}</td>
                <td>
                  {habit.isPublic ? (
                    <span className="badge badge-success">Public</span>
                  ) : (
                    <span className="badge badge-warning">Private</span>
                  )}
                </td>
                <td>
                  {habit.status === "completed" ? (
                    <span className="badge badge-success">Completed</span>
                  ) : (
                    <span className="badge badge-info">Pending</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminHabits;