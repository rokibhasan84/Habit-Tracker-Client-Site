import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  const slides = [
    {
      image: "https://thumbs.dreamstime.com/b/change-your-bad-habits-thinker-adapting-good-qualities-success-words-d-letters-wondering-how-to-turn-negative-45324836.jpg",
      title: "Build Life-Changing Habits",
      subtitle: "Turn small daily steps into big long-term success.",
    },
    {
      image: "https://www.shutterstock.com/image-vector/businessman-leave-old-habits-zone-260nw-2561564937.jpg",
      title: "Track Your Daily Progress",
      subtitle: "Stay consistent and motivated every single day.",
    },
    {
      image: "https://media.istockphoto.com/id/1528036967/photo/build-good-habits-symbol-concept-wooden-blocks-with-build-good-habits-motto-navy-blue.jpg?s=612x612&w=0&k=20&c=zD5Nt7cuNF_XwMW7uu-ai2Yv9kZy9HQwfd2ro6MnFaw=",
      title: "Achieve Your Goals",
      subtitle: "Visualize your growth and stay on the right path.",
    },
  ];

  return (
    <div className="mt-6 mb-10 max-w-6xl mx-auto px-4">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative h-[420px] md:h-[500px] rounded-2xl overflow-hidden">

              {/* Background Image */}
              <img
                src={slide.image}
                alt="slider"
                className="w-full h-full object-fill"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/70"></div>

              {/* Slider Text */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4 animate-fadeInUp">
                  {slide.title}
                </h2>

                <p className="text-lg md:text-2xl text-gray-200 max-w-xl animate-fadeInUpSlow">
                  {slide.subtitle}
                </p>
              </div>

            </div>
          </div>
        ))}
      </Slider>

      {/* Animations */}
      <style>
        {`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }

        .animate-fadeInUpSlow {
          animation: fadeInUp 1.2s ease forwards;
        }
      `}
      </style>
    </div>
  );
};

export default HeroSlider;