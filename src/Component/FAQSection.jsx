import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is a habit tracking system?",
      answer:
        "A habit tracking system helps you monitor your daily habits, track progress, and build consistency. It visually shows how often you perform an activity, making it easier to stay accountable and motivated."
    },
    {
      question: "How does the streak feature work?",
      answer:
        "A streak is counted when you complete a habit for consecutive days. If you miss a day, the streak resets. The longer you maintain your streak, the stronger your habit becomes. Habit streaks help motivate you with badges and progress indicators."
    },
    {
      question: "How do I update or delete a habit?",
      answer:
        "Go to the 'My Habits' page. Each habit card includes update and delete buttons. You can edit title, description, category, and reminder time. The delete button permanently removes the habit from your account."
    },
    {
      question: "What are public habits?",
      answer:
        "Public habits are habits you choose to share with others. These habits appear in the Public Habits page and Home Featured section. It allows other users to explore and get inspiration from your habits."
    },
    {
      question: "Is my personal habit data safe?",
      answer:
        "Yes. Your habit data is stored securely and only visible to you unless you mark a habit as public. You must be logged in to create, edit, or delete your habits."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto mt-20 px-5">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#cf0ae0]">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className=" rounded-xl p-4 text-[#000] cursor-pointer bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Question */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <FaChevronDown
                className={`transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Answer */}
            {openIndex === index && (
              <p className="mt-3 text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;