"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import { motion } from "framer-motion"; // Import framer-motion
import { useTheme } from "@/app/context/ThemeContext";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const {theme,toggleTheme}=useTheme()

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        toast.error("Interview details not found");
      }
    } catch (error) {
      toast.error("Error fetching interview details");
    }
  };

  const handleWebcamToggle = () => {
    if (!webCamEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          setWebCamEnabled(true);
          toast.success("Webcam and microphone enabled");
        })
        .catch((error) => {
          toast.error("Failed to access webcam or microphone");
        });
    } else {
      setWebCamEnabled(false);
    }
  };

  if (!interviewData) {
    return <div>Loading interview details...</div>;
  }
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(16, 185, 129, 0.5)",
      background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.3))",
      backdropFilter: "blur(15px)",
    },
  };
  return (
    <div className="my-10">
      {/* Add the animated background here */}
      <div className={`${theme === "dark" ? "relative isolate bg-[#0D1117]" :""} py-12 px-4 sm:px-6 lg:px-8`}>
        <div className={`${theme === "dark" ? "absolute top-0 left-0 w-full h-full overflow-hidden -z-10" : "hidden"}`}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 0.2, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full blur-[120px]"
          />
        </div>

        {/* Interview Details and Webcam Section */}
        <h2 className="font-bold text-2xl dark:text-white mt-8 mb-5">Let's get started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            <motion.div
             variants={cardVariants}
                whileHover="hover"

             className={`flex flex-col p-5 dark:text-white rounded-lg ${theme === "dark" ? "border" : "border-2 border-[#10B981]"}  gap-5`}>
              <h2 className="text-lg">
                <strong>Job Role/Job Position: </strong>
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech Stack: </strong>
                {interviewData.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience: </strong>
                {interviewData.jobExperience}
              </h2>
            </motion.div>
            <motion.div
            variants={cardVariants}
                whileHover="hover"
             className={`p-10 rounded-2xl border border-[#10B981] shadow-lg transition-all bg-opacity-80 backdrop-blur-lg ${theme === "dark" ? "bg-[#1F2937] text-white" : "bg-[#FFF] border-2"} flex flex-col`}>
              <h2 className="flex gap-2 items-center">
                <Lightbulb />
                <span>Information</span>
              </h2>
              <h2 className="mt-3">
                Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview. 
                It has 5 questions which you can answer and will provide a report based on your answers. 
                NOTE: We never record your video. Web cam access can be disabled at any time.
              </h2>
            </motion.div>
          </div>

          <motion.div
          className={`rounded-2xl px-0 py-0 m-0 border border-[#10B981] ${theme === "dark" ? "shadow-lg transition-all bg-opacity-80 backdrop-blur-lg bg-[#1F2937]" : ""} `}
          >
            {webCamEnabled ? (
              <Webcam
                mirrored={true}
                style={{ height: 300, width: "auto" }}
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => {
                  toast.error("Webcam access error");
                  setWebCamEnabled(false);
                }}
              />
            ) : (
              <>
                <WebcamIcon className="h-72 my-2 w-full p-20 text-[#10B981]" />
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    className="w-full text-white bg-[#10B981]"
                    variant={cardVariants}
                    whileHover="hover"
                    onClick={handleWebcamToggle}
                  >
                    Enable Web Cam and Microphone
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>

        <div className="flex my-4 justify-end items-end">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <motion.div
              whileHover={{ scale: 1.10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button className="bg-[#10B981] hover:bg-[#10B967] transition-all duration-300">Start Interview</Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;
