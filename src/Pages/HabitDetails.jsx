import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://habit-tracker-server-site.vercel.app/habits/details/${id}`)
      .then(res => {
        setHabit(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Calculate progress → last 30 days
  const calculateProgress = () => {
    if (!habit?.completionDates) return 0;
    const today = new Date();
    const last30 = new Date(today.setDate(today.getDate() - 30));

    const completed = habit.completionDates.filter(date => {
      return new Date(date) >= last30;
    });

    return Math.round((completed.length / 30) * 100);
  };

  // Mark Complete Button handler
 const toggleComplete = async () => {
  try {
    const res = await axios.put(
      `https://habit-tracker-server-site.vercel.app/habits/toggle-complete/${habit._id}`
    );

    if (res.data.status === "completed") {
      toast.success("Habit marked as completed!");
    } else {
      toast.success("Completion undone!");
    }

    // UI Update instantly
    setHabit(prev => ({
      ...prev,
      status: res.data.status,
      completionDates: res.data.completionDates,
      streak: res.data.streak
    }));

  } catch (err) {
    toast.error("Failed to update!");
  }
};

  // Get streak badge
  const getBadge = (streak) => {
    if (streak >= 15) return "🥇 Gold Streak";
    if (streak >= 7) return "🥈 Silver Streak";
    if (streak >= 3) return "🥉 Bronze Streak";
    return "No Badge Yet";
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (!habit) return <h2 className="text-center mt-10 text-red-600">Habit Not Found!</h2>;

  const progress = calculateProgress();
  const badge = getBadge(habit.streak);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-25 mb-10 border rounded-xl shadow-lg bg-white">

      {habit.image && (
        <img src={habit.image} className="w-full h-64 object-cover rounded-xl mb-6" />
      )}

      <h1 className="text-3xl font-bold text-success">{habit.title}</h1>

      <p className="mt-2 text-sm bg-blue-100 text-[#cf0ae0] px-3 py-1 inline-block rounded-full">
        {habit.category}
      </p>

      <p className="mt-4 text-gray-700">{habit.description}</p>

      {/* Creator Info */}
      <div className="mt-6 p-4 border rounded-lg text-[#000] bg-gray-100">
        <p className=""><b>Created By:</b> {habit.userName}</p>
        <p><b>Email:</b> {habit.email}</p>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <p className="font-semibold text-gray-700">Progress (Last 30 Days): {progress}%</p>
        <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}>
            </div>
        </div>
      </div>

      {/* Streak Badge */}
      <div className="mt-6 p-4 border rounded-xl text-[#000] bg-[#b9b5b52c] text-center">
        <p className="text-xl">{getBadge(habit.streak)}</p>
        <p className="text-gray-600">Streak: {habit.streak} days</p>
      </div>

      {/* Mark Complete Button */}
      {habit.email === user?.email && (
        <button
        onClick={toggleComplete}
        className="w-full mt-6 py-2 hover:text-white rounded-lg btn btn-outline btn-success "
      >
        {habit.status === "completed" ? "Undo Complete" : "Mark as Complete"}
      </button>
      )}
    </div>
  );
};

export default HabitDetails;