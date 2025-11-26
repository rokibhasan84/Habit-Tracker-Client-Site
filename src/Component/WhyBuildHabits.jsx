import React from "react";

const WhyBuildHabits = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-[#cf0ae0] mb-10">
        Why Build Habits?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
          <div className="text-blue-600 text-4xl mb-4 text-center">🎯</div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Better Focus
          </h3>
          <p className="text-gray-600 text-center">
            Habits help you stay consistent and improve your mental clarity.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
          <div className="text-green-500 text-4xl mb-4 text-center">💆‍♂</div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Reduced Stress
          </h3>
          <p className="text-gray-600 text-center">
            Good habits reduce anxiety and help you stay organized.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
          <div className="text-yellow-500 text-4xl mb-4 text-center">📈</div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Self Improvement
          </h3>
          <p className="text-gray-600 text-center">
            Daily habits help you grow steadily and achieve more long-term goals.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
          <div className="text-red-500 text-4xl mb-4 text-center">⚡</div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            More Energy
          </h3>
          <p className="text-gray-600 text-center">
            Healthy habits increase your motivation and boost daily energy.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyBuildHabits;