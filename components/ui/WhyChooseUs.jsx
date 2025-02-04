import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; // Import Swiper modules
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const WhyChooseUs = ({ features }) => {
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
      className=""
    >
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
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <motion.div key={index} className="p-6 bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-400">{feature.description}</p>
          </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default WhyChooseUs;
