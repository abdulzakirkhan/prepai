import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; // Import Swiper modules
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTheme } from "@/app/context/ThemeContext";

const SmSlider = ({ advantages }) => {
  const {theme,toggleTheme}=useTheme()
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3} // Default for large screens
      loop={true}
      navigation={true}
      pagination={false}
      modules={[Pagination, Navigation]} // Register Swiper modules
      breakpoints={{
        320: { slidesPerView: 1 }, // Mobile
        640: { slidesPerView: 2 }, // Tablet
        1024: { slidesPerView: 3 }, // Desktop
      }}
      className="mySwiper"
    >
      {advantages.map((card, index) => (
        <SwiperSlide key={index}>
          <div className={`p-6 border border-[#10B981] rounded-xl ${theme === "dark" ? "bg-[#1F2937] text-white" : "bg-[#e5e7eb] text-black"} text-center`}>
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p>{card.description}</p>
          </div>
          
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SmSlider;
