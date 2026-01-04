import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const role = useRole();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const url =
      role === "admin"
        ? "https://habit-tracker-server-site.vercel.app/dashboard/admin"
        : `https://habit-tracker-server-site.vercel.app/dashboard/user/${user.email}`;

    axios.get(url)
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, role]);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-6">
        {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* {role === "admin" ? (
          <>
            <StatCard title="Total Users" value={stats.totalUsers} />
            <StatCard title="Total Habits" value={stats.totalHabits} />
            <StatCard title="Public Habits" value={stats.publicHabits} />
            <StatCard title="Completed Today" value={stats.completedToday} />
          </>
        ) : (
          <>
            <StatCard title="Total Habits" value={stats.totalHabits} />
            <StatCard title="Completed Habits" value={stats.completedHabits} />
            <StatCard title="Public Habits" value={stats.publicHabits} />
            <StatCard title="Max Streak 🔥" value={stats.maxStreak} />
          </>
        )} */}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
};

export default DashboardHome;