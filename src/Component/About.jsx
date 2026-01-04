export default function About() {
  return (
    <div className="bg-base-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            About Habit Tracker
          </h1>
          <p className="text-gray-500 text-lg">
            Build better habits. Track your progress. Change your life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Why Habit Tracker?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Habit Tracker is a simple and powerful web application designed
              to help you build positive habits and stay consistent.
              Whether you want to exercise daily, read more books, or
              improve productivity — Habit Tracker keeps you motivated.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our goal is to help users focus on progress, not perfection.
              Small daily actions lead to big life changes.
            </p>
          </div>

          <div className="bg-base-200 rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">
              Key Features
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>✅ Create and manage daily habits</li>
              <li>📊 Track progress visually</li>
              <li>⏰ Stay consistent with reminders</li>
              <li>🏆 Build streaks and motivation</li>
              <li>📱 Responsive & user-friendly design</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="italic text-gray-500">
            “We are what we repeatedly do. Excellence, then, is not an act, but a habit.”
          </p>
        </div>
      </div>
    </div>
  );
}
