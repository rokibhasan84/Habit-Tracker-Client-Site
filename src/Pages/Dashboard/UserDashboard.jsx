import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import StatCard from "../../components/dashboard/StatCard";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://habit-tracker-server-site.vercel.app/habits/${user.email}`)
      .then(res => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <p className="text-center text-lg">Loading dashboard...</p>;
  }

  // ===== CALCULATIONS =====
  const totalHabits = habits.length;

  const todayStr = new Date().toDateString();

  const completedToday = habits.filter(h =>
    h.completionDates?.some(
      d => new Date(d).toDateString() === todayStr
    )
  ).length;

  const maxStreak = habits.reduce(
    (max, h) => (h.streak > max ? h.streak : max),
    0
  );

  const progress30Days = () => {
    let totalCompleted = 0;
    habits.forEach(h => {
      totalCompleted += h.completionDates?.length || 0;
    });
    return habits.length === 0
      ? 0
      : Math.min(100, Math.round((totalCompleted / (habits.length * 30)) * 100));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        👤 My Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Habits" value={totalHabits} icon="📋" />
        <StatCard title="Completed Today" value={completedToday} icon="✅" />
        <StatCard title="Best Streak" value={`${maxStreak} days`} icon="🔥" />
        <StatCard title="30 Days Progress" value={`${progress30Days()}%`} icon="📊" />
      </div>

      {/* RECENT HABITS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Habits</h2>

        {habits.slice(0, 5).map(habit => (
          <div
            key={habit._id}
            className="p-4 bg-white rounded-lg shadow mb-3 flex justify-between"
          >
            <div>
              <h3 className="font-bold">{habit.title}</h3>
              <p className="text-sm text-gray-500">{habit.category}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                habit.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {habit.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;