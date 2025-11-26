import React from "react";
import ImgHabit from "../assets/Improve.jpeg"
import { Link } from "react-router";

const ExtraSection = () => {
  return (
    <section className="bg-[#da969618] rounded-lg">
      <div className="max-w-6xl mx-auto pr-4 flex flex-col md:flex-row items-center gap-10">

        <img
          src={ImgHabit}
          alt="habits"
          className="w-full h-100 md:w-1/2 rounded-lg shadow-lg "
        />

        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-[#cf0ae0] mb-4">
            Improve Yourself, One Habit at a Time
          </h2>

          <p className="text-gray-600 mb-6">
            Build habits that help you grow mentally, physically, and emotionally.
            Track progress, stay motivated, and transform your life step-by-step.
          </p>

          <Link to='/login'>
                <button className="px-6 py-3 hover:text-white font-semibold rounded-lg shadow-md transition btn btn-outline btn-accent">
            Get Started Today
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ExtraSection;