"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Play, Send } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";

const StartInterview = ({ params }) => {
  const {intId} =params;
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {theme,toggleTheme} =useTheme()
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  useEffect(() => {
    GetInterviewDetails();
  }, [intId]);

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
  
      if (!result.length || !result[0].jsonMockResp) {
        setIsLoading(false);
        return;
      }
  
      let jsonMockResp;
      try {
        jsonMockResp = JSON.parse(result[0].jsonMockResp);
      } catch (error) {
        jsonMockResp = []; // Fallback to an empty array
      }
  
      // Ensure jsonMockResp is an array
      if (!Array.isArray(jsonMockResp)) {
        
        jsonMockResp = Object.values(jsonMockResp).flat(); // Convert object to array and flatten in case of nested structure
      }
  
  
      // Ensure that every item in jsonMockResp is a valid React child (string, number, JSX)
      const validMockResp = jsonMockResp.map((item) => {
        if (typeof item === "object" && item !== null) {
          return JSON.stringify(item); // Convert objects to strings for rendering
        }
        return item;
      });
  
      setMockInterviewQuestion(validMockResp);
      setInterviewData(result[0]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  
  
    const handleAnswerSave = (answerRecord) => {

      setMockInterviewQuestion((prevQuestions) => {

          // Ensure prevQuestions is an array
          if (!Array.isArray(prevQuestions)) {
              return [];
          }

          // Ensure activeQuestionIndex is within range
          if (activeQuestionIndex < 0 || activeQuestionIndex >=  mockInterviewQuestion.length - 1) {
              return prevQuestions;
          }

          return prevQuestions.map((question, index) =>
              index === activeQuestionIndex ? { ...question, answer: answerRecord } : question
          );
      });

      // Ensure we don't go out of bounds when moving to the next question
      setActiveQuestionIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex < mockInterviewQuestion.length ? nextIndex : prevIndex;
      });
  };



  // console.log("mockInterviewQuestion", mockInterviewQuestion)
  
  // Animations
  const fadeInStagger = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          <p className="mt-4 text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">No interview questions found.</p>
      </div>
    );
  }



  

  return (
    <section className={`${theme === "dark" ? "bg-[#0D1117] isolate" : "bg-[#f3f4f6]"} min-h-screen overflow-hidden relative`}>
      {/* Background Parallax Animation */}
      <div className={`${theme === "dark" ? "absolute top-0 left-0 w-full h-full overflow-hidden -z-10" : "hidden"}`}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full blur-[120px]"
        />
      </div>

      <div className="container mt-20 mx-auto px-6 py-20 relative z-10">
        {/* Title Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInStagger}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`text-4xl md:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-[#10B981]"} mb-4`}
          >
            {/* <Bot className="inline-block mr-3   text-[#10B981]" size={48} /> */}
            <Image src={"/artificial-intelligence.png"} className="inline-block mr-3 -mt-2" width={50} height={40} alt="" />
            Mock Interview AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-lg dark:text-gray-400"
          >
            Master your interviews with AI-powered practice and personalized insights.
          </motion.p>
        </motion.div>

        {/* Questions and Record Answer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interViewData}
            onAnswerSave={handleAnswerSave}
          />
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-end gap-6 mt-6"
        >
          {activeQuestionIndex > 0 && (
            <Button className="bg-[#10B981] relative transition-transform duration-300 hover:scale-105" onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
              Previous Question
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#10B981] opacity-20 blur-lg"
              />
            </Button>
          )}
          {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
            <Button className="bg-[#10B981] hover:bg-[#10B960] relative transition-transform duration-300 hover:scale-105" onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
              Next Question
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#10B981] opacity-20 blur-lg"
              />
            </Button>
          )}
          {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
            <Link href={"/dashboard/interview/" + interViewData?.mockId + "/feedback"}>
              <Button className="bg-[#10B981] relative transition-transform duration-300 hover:scale-105">
                End Interview
                <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#10B981] opacity-20 blur-lg"
              />
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default StartInterview;
