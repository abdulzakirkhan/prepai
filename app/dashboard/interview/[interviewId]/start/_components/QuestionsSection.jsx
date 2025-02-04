"use client"
import { Lightbulb, Volume2 } from 'lucide-react'
import { motion } from "framer-motion";

import React from 'react'
const QuestionsSection = ({mockInterviewQuestion,activeQuestionIndex}) => {
  console.log("🚀 ~ file: QuestionsSection.jsx:4 ~ QuestionsSection ~ mockInterviewQuestion:", mockInterviewQuestion);
  const textToSpeach=(text)=>{
if('speechSynthesis' in window){
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech)
}else{
    alert("Sorry, your browser does not support text to speech")
}
  }
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
  return mockInterviewQuestion && (
    <motion.div
        variants={cardVariants}
        whileHover="hover" 
     className='p-5 border-2 border-[#10B981] rounded-xl my-10 transition-all bg-opacity-80 backdrop-blur-lg bg-[#1F2937]'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(
                <h2 className={`p-2 bg-[#1F2937] border border-[#10B981] rounded-full text-white text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index && 'bgPrimary text-black'}`}>Question #{index+1}</h2>
            ))}
        </div>
            <h2 className='my-5 text-md md:text-lg  text-white'>
                {mockInterviewQuestion[activeQuestionIndex]?.question}
            </h2>
            <Volume2 className='cursor-pointer text-white' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
                <motion.div initial="hidden"
                    animate="visible"
                    variants={fadeInStagger}
                >
                <motion.div
                variants={cardVariants}
                whileHover="hover" 
                className='border rounded-lg p-5 border-[#10B981] shadow-lg transition-all bg-opacity-80 backdrop-blur-lg bg-[#1F2937] text-white mt-20'>
                    <h2 className='flex gap-2 items-center text-white'>
                        <Lightbulb className='text-white'/>
                        <strong className='text-white'>Note:</strong>
                    </h2>
                    <h2 className='text-sm text-white my-2'>Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview, It Has 5 questions which you can answer and at last you will get the report on the basis of your answer . NOTE: We never record your video, Web cam access you can disable at any time if you want</h2>
                </motion.div>
                </motion.div>
    </motion.div>
  )
}

export default QuestionsSection