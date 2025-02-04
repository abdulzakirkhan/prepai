"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Base styles
import 'swiper/css/pagination'; // Pagination styles
import 'swiper/css/navigation'; // Navigation styles

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user,InterviewList]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
  };

  return (
    <div className="">

      <h2 className="font-medium text-xl text-white">Previous Mock Interview</h2>

      {/* Conditionally render the content */}
      {InterviewList.length > 0 ? (
        InterviewList.length < 3 ? (
          // If the list has less than 3 items, display them without the slider
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
            {InterviewList.map((interview, index) => (
              <InterviewItemCard interview={interview} key={index} />
            ))}
          </div>
        ) : (
          // If the list has 3 or more items, display them in the Swiper slider
          <Swiper
            spaceBetween={20} // space between slides
            slidesPerView={3} // Show 3 slides
            breakpoints={{
              640: {
                slidesPerView: 2, // show 2 slides on small screens
              },
              1024: {
                slidesPerView: 3, // show 3 slides on larger screens
              },
            }}
            navigation={true} // Enable navigation buttons
            pagination={{ clickable: true }} // Enable pagination (dots)
            className="my-5"
          >
            {InterviewList.map((interview, index) => (
              <SwiperSlide key={index} className="px-12">
                <InterviewItemCard interview={interview} />
              </SwiperSlide>
            ))}
          </Swiper>
        )
      ) : (
        // If there are no interviews available, show this message
        <p className="text-white">No interviews available.</p>
      )}
    </div>
  );
};

export default InterviewList;
