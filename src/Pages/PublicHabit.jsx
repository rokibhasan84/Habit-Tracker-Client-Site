
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Loading from "../Component/Loading";

const PublicHabit = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

    // Filters
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    axios
      .get("https://habit-tracker-server-site.vercel.app/public-habits")
      .then((res) => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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
      <p className="text-center mt-25 text-blue-600 font-semibold">
        <Loading></Loading>
        <p className="text-3xl my-5 text-blue-600 font-bold">Public Habits...</p>
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center text-[#cf0ae0] mb-6">
        Browse Public Habits
      </h2>

            {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search public habits..."
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
          <option value="Lifestyle">Lifestyle</option>
          <option value="Health">Health</option>
          <option value="Self-Reflection">Self-Reflection</option>
          <option value="Mindfulness">Mindfulness</option>
          <option value="Wellness">Wellness</option>
        </select>
      </div>

      {/* Habit Cards */}
      {visibleHabits.length === 0 ? (
        <p className="text-center text-gray-500">No habits match your filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleHabits.map((habit) => (
            <div
              key={habit._id}
              className="border rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transition p-4"
            >
              {/* Image */}
              <div className="h-40 bg-gray-200 flex items-center justify-center">
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

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {habit.title}
              </h3>

              {/* Category */}
              <span className="inline-block bg-blue-100 text-[#cf0ae0] px-3 py-1 rounded-full text-sm mb-3">
                {habit.category}
              </span>

              {/* Description */}
              <p className="text-gray-600">{habit.description?.slice(0, 70)}...</p>

              {/* Created At */}
              <p className="text-sm mt-4 text-gray-500">
                Posted:{" "}
                {new Date(habit.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <Link
  to={`/habit/${habit._id}`}
  className="mt-3 inline-block px-4 py-2 hover:text-white rounded btn btn-outline btn-accent"
>
  View Details
</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicHabit;