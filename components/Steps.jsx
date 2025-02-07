import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; // Import Swiper modules
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTheme } from "@/app/context/ThemeContext";

const StepsComp = ({ steps }) => {
  const {theme,toggleTheme} =useTheme()
  const fadeInStagger = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInStagger}
      className="p-10"
    >
      <h2 className="text-3xl font-bold text-center dark:text-white mb-10">
        Our Process Steps
      </h2>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={20}
        slidesPerView={3} // Default for larger screens
        loop={true}
        navigation={true}
        pagination={false}
        modules={[Pagination, Navigation]} // Register modules
        breakpoints={{
          320: { slidesPerView: 1 }, // Mobile
          640: { slidesPerView: 2 }, // Tablet
          1024: { slidesPerView: 3 }, // Desktop
        }}
        className="mySwiper"
      >
        {steps.map((step, index) => (
          <SwiperSlide key={step.title}>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className={`p-8 ${theme === "dark" ? "bg-[#1F2937]" : "bg-[#e5e7eb]"} rounded-2xl h-72 border border-[#10B981] shadow-lg transition-all bg-opacity-80 backdrop-blur-lg flex flex-col items-center text-center`}
            >
              <div className="mb-4">{step.icon}</div>
              <h2 className="text-2xl font-semibold dark:text-white mb-2">
                Step {index + 1}: {step.title}
              </h2>
              <p className="dark:text-gray-50">{step.description}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default StepsComp;
