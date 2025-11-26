import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Loading from "../Component/Loading";

const PublicHabit = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/public-habits")
      .then((res) => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Browse Public Habits
      </h2>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500">No public habits available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className=" rounded-lg shadow-lg bg-white p-5 hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="w-full h-50 bg-gray-200 rounded mb-4 flex items-center justify-center">
                {habit.image ? (
                  <img
                    src={habit.image}
                    alt="habit"
                    className="w-full h-full object-cover rounded"
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
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-3">
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