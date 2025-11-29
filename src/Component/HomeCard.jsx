import React from 'react';

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from './Loading';

const HomeCard = () => {
  const [publicHabits, setPublicHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://habit-tracker-server-site.vercel.app/public-habits/home-card")
      .then((res) => {
        setPublicHabits(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-5 px-4">

      <h2 className="text-3xl font-bold text-center text-[#cf0ae0] mb-8">
        Latest Public Habits
      </h2>

      {loading ? (
        <p className="text-center flex justify-center "><Loading></Loading></p>
      ) : publicHabits.length === 0 ? (
        <p className="text-center text-gray-500">No public habits available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {publicHabits.map((habit) => (
            <div
              key={habit._id}
              className="rounded-lg shadow bg-white overflow-hidden hover:shadow-xl transition p-4"
            >
              <div className="h-50 bg-gray-100 flex items-center justify-center">
                {habit.image ? (
                  <img
                    src={habit.image}
                    className="h-full w-full object-cover rounded-lg"
                    alt=""
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>

              <h3 className="text-xl text-accent font-semibold mt-3">{habit.title}</h3>
              <p className="text-sm text-[#cf0ae0] bg-blue-100 inline-block px-2 py-1 rounded mt-1">
                {habit.category}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                {habit.description?.slice(0, 70)}...
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

      {/* See All Button */}
      <div className="text-center mt-8">
        <Link
          to="/public-habits"
          className="px-6 py-2 hover:text-white rounded btn btn-outline btn-accent"
        >
          See All Public Habits
        </Link>
      </div>
    </div>
  );
};


export default HomeCard;