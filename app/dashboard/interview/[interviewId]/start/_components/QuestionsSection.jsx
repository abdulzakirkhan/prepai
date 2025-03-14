"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "@/app/context/ThemeContext";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const { theme } = useTheme();


  // Ensure questionsArray is always an array
  const questionsArray = Array.isArray(mockInterviewQuestion)
  ? mockInterviewQuestion
  : [mockInterviewQuestion]; 



  const textToSpeech = (text) => {
    if (!text) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

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
  


  let currentQuestion;
  if(mockInterviewQuestion.length > 2){
    currentQuestion = JSON?.parse(mockInterviewQuestion[activeQuestionIndex]);
  }else{
    currentQuestion = mockInterviewQuestion[activeQuestionIndex];
  }

  
  return (
    <motion.div
      variants={cardVariants}
      whileHover={`${theme === "dark" ? "hover" : "no"}`}
      className={`p-5 border-2 border-[#10B981] rounded-xl my-10 transition-all bg-opacity-80 backdrop-blur-lg ${
        theme === "dark" ? "bg-[#1F2937] text-white" : "bg-white text-black"
      }`}
    >
      {/* 🔥 Question Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((_, index) => (
          <h2
            key={index}
            className={`p-2 border border-[#10B981] rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index ? "bg-[#10B981] text-black" : "bg-[#1F2937] text-white"
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* 🔥 Display Selected Question */}
      <h2 className="my-5 text-md md:text-lg dark:text-white">
        {/* {currentQuestion?.question ?? "⚠️ No question available. Please refresh."} */}
        {
        mockInterviewQuestion.length > 2 ? currentQuestion?.question : currentQuestion
        }

      </h2>

      {/* 🔥 Speech Button */}
      <Volume2
        className="cursor-pointer text-white"
        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex])}
      />

      {/* 🔥 Instructions Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeInStagger}>
        <motion.div
          variants={cardVariants}
          whileHover={`${theme === "dark" ? "hover" : "no"}`}
          className={`rounded-lg p-5 border-2 border-[#10B981] mt-20 ${
            theme === "dark"
              ? "shadow-lg transition-all bg-opacity-80 backdrop-blur-lg bg-[#1F2937] text-white"
              : "text-black bg-white"
          }`}
        >
          <h2 className="flex gap-2 items-center">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm my-2">
            Enable Video Web Cam and Microphone to start your AI-Generated Mock Interview. It has 5 questions, and at the end, you will receive a report based on your answers.
            <br />
            <strong>NOTE:</strong> We never record your video. Webcam access can be disabled at any time.
          </h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionsSection;
