import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module
import "swiper/css";
import "swiper/css/navigation";
import { useTheme } from "@/app/context/ThemeContext";

const Slid = ({ coreValues }) => {
  const {theme,toggleTheme} =useTheme()
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        navigation={true} // Enable navigation
        pagination={false}
        modules={[Navigation]} // Register the Navigation module
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {coreValues.map((value, index) => (
          <SwiperSlide key={index}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
                },
              }}
              className={`p-8 rounded-2xl h-64 border border-[#10B981] shadow-lg transition-all bg-opacity-80 backdrop-blur-lg ${theme === "dark" ? "bg-[#1F2937]" :""} flex flex-col items-center text-center`}
            >
              <div className="flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-semibold dark:text-gray-400 mb-3">
                {value.title}
              </h3>
              <p className="text-lg dark:text-gray-400">{value.description}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Internal Styles for Navigation */}
      <style jsx>{`
        /* Customize Swiper Navigation Arrows */
        .swiper-button-prev,
        .swiper-button-next {
          color: #10B981; /* Change arrow color */
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          color: #ffffff; /* Change arrow color on hover */
        }
      `}</style>
    </>
  );
};

export default Slid;
