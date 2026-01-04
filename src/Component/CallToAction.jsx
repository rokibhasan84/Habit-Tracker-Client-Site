import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-800 to-green-900 text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl text-[#cf0ae0] font-extrabold mb-4">
          Build Habits That Change Your Life 🚀
        </h2>

        <p className="text-lg mb-8 text-gray-100">
          Start tracking your habits today and see real progress every single
          day.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="btn btn-lg bg-white text-indigo-600 hover:bg-gray-100"
          >
            Get Started Free
          </Link>

          <Link
            to="/dashboard"
            className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-indigo-600"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
