"use client";

import React from "react";
import { Bot, UserCheck, Settings, Play, Send, ChartBar, Repeat, Code } from "lucide-react";
import { motion } from "framer-motion";
import SmSlider from "../../components/ui/SmSlider";
import StepsComp, {} from "../../components/Steps";
const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserCheck size={48} className="text-[#10B981]" />,
      title: "Sign Up or Log In",
      description: "Create an account or log in using Clerk. Build a personalized profile that tracks your interview journey and stores preferences."
    },
    {
      icon: <Settings size={48} className="text-[#10B981]" />,
      title: "Choose Your Interview Type",
      description: "Select from technical, behavioral, or mixed interviews. Customize difficulty, topics, and duration to match your career goals."
    },
    {
      icon: <Play size={48} className="text-[#10B981]" />,
      title: "Start the Mock Interview",
      description: "Our AI generates dynamic, contextually relevant questions powered by Gemini. One question at a time keeps you focused and engaged."
    },
    {
      icon: <Send size={48} className="text-[#10B981]" />,
      title: "Submit Your Answers",
      description: "Respond via text or multiple-choice options. Our intuitive interface tracks your responses and provides a seamless experience."
    },
    {
      icon: <ChartBar size={48} className="text-[#10B981]" />,
      title: "Receive Real-Time Feedback",
      description: "Get instant, AI-powered analysis of your responses. Understand your strengths, areas for improvement, and receive detailed scoring."
    },
    {
      icon: <Repeat size={48} className="text-[#10B981]" />,
      title: "Continue Practicing",
      description: "Access your interview history, track progress, and keep refining your skills with unlimited mock interviews and adaptive challenges."
    }
  ];

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
      boxShadow: "0px 10px 25px rgba(16, 185, 129, 0.1.4)",
      background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.3))",
      backdropFilter: "blur(15px)",
    },
  };


  const addvantages=[
    {
      title:"Real-Time AI Feedback",
      description:"Receive instant AI-powered feedback to improve your responses."
    },
    {
      title:"Industry-Specific Questions",
      description:"Practice with questions tailored to your industry and role."
    },
    {
      title:"Track Your Progress",
      description:"Monitor your improvement over time with detailed analytics."
    },
    {
      title:"Track Your Progress",
      description:"Monitor your improvement over time with detailed analytics."
    },
  ]

  return (
    <section className="bg-[#0D1117] isolate min-h-screen overflow-hidden relative">
      {/* Background Parallax Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
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
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            <Code className="inline-block mr-3 text-[#10B981]" size={48} />
            Mock Interview AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-lg text-gray-50"
          >
            Master your interviews with AI-powered practice and personalized insights.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        {/* <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInStagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              whileHover="hover"
              className="p-8 rounded-2xl border border-[#10B981] shadow-lg transition-all bg-opacity-80 backdrop-blur-lg bg-[#1F2937] flex flex-col items-center text-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Step {index + 1}: {step.title}
              </h2>
              <p className="text-gray-50">{step.description}</p>
            </motion.div>
          ))}
        </motion.div> */}
        <StepsComp steps={steps} />
        {/* <StepsSection /> */}
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-16"
        >
          <a
            href="/dashboard"
            className="relative inline-block px-8 py-4 text-lg font-semibold text-white bg-[#10B981] rounded-full transition-transform duration-300 hover:scale-105"
          >
            Start Your Interview Journey
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#10B981] opacity-20 blur-lg"
            />
          </a>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-7 pb-16">
        <div className="mt-20 text-center text-gray-50">
          <h2 className="text-3xl font-bold text-white mb-6">Why Choose Mock Interview AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* {addvantages.map((card,index) => (

            <div className="p-6 border border-[#10B981] rounded-xl" key={index}>
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p>{card.description}</p>
            </div>
            ))} */}
          </div>
            <SmSlider advantages={addvantages} />
        </div>
        
      </div>


    </section>
  );
};

export default HowItWorksPage;
