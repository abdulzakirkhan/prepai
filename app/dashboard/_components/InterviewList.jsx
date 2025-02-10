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

  console.log("InterviewList",InterviewList)

  return (
    <div className="w-full md:col-span-12">

      <h2 className="font-medium text-xl dark:text-white">Previous Mock Interview</h2>

      {/* Conditionally render the content */}
      {InterviewList.length > 0 ? (
        InterviewList.length < 3 ? (
          // If the list has less than 3 items, display them without the slider
          <div className="flex mt-3 items-center gap-12 rounded-lg">
            {InterviewList.map((interview, index) => (
              <InterviewItemCard interview={interview} width={"w-1/3"} key={index} />
            ))}
          </div>
        ) : (
          // If the list has 3 or more items, display them in the Swiper slider
          <Swiper
            spaceBetween={2} // space between slides
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
              <SwiperSlide key={index} className="px-5 w-full">
                <InterviewItemCard interview={interview} width={"w-full"} />
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
