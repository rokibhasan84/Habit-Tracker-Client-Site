import React from "react";
import ImgHabit from "../assets/Improve.jpeg"

const ExtraSection = () => {
  return (
    <section className="bg-blue-50 py-16 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">

        <img
          src={ImgHabit}
          alt="habits"
          className="w-full h-120 md:w-1/2 rounded-xl shadow-lg"
        />

        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Improve Yourself, One Habit at a Time
          </h2>

          <p className="text-gray-600 mb-6">
            Build habits that help you grow mentally, physically, and emotionally.
            Track progress, stay motivated, and transform your life step-by-step.
          </p>

          <button className="px-6 py-3 hover:text-white font-semibold rounded-lg shadow-md transition btn btn-outline btn-primary">
            Get Started Today
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExtraSection;