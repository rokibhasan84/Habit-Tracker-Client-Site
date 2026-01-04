export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahim Ahmed",
      habit: "Morning Exercise",
      streak: 45,
      message:
        "This habit tracker completely changed my daily routine. I never miss my habits now!",
      photo: "https://i.ibb.co/2kR3yT1/user1.png",
    },
    {
      name: "Nusrat Jahan",
      habit: "Reading Books",
      streak: 30,
      message:
        "Tracking my habits visually keeps me motivated every single day.",
      photo: "https://i.ibb.co/7tPq9dM/user2.png",
    },
    {
      name: "Tanvir Hasan",
      habit: "Meditation",
      streak: 60,
      message:
        "Simple UI, powerful features. Best habit tracker I’ve used so far!",
      photo: "https://i.ibb.co/J7P9qzF/user3.png",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Users Say 💬
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-center"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primary"
              />

              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Habit: {t.habit}
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                “{t.message}”
              </p>

              <span className="badge badge-success">
                🔥 {t.streak} Days Streak
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
