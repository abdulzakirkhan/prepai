"use client"
import { motion } from 'framer-motion';
import { ChartBar, Play, Repeat, Send, Settings, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { RiFeedbackLine } from "react-icons/ri";
const fadeInStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' },
};

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
      icon: <RiFeedbackLine size={54} className="text-[#10B981]" />,
      title: "Receive Real-Time Feedback",
      description: "Get instant, AI-powered analysis of your responses. Understand your strengths, areas for improvement, and receive detailed scoring."
    },
    {
      icon: <Repeat size={48} className="text-[#10B981]" />,
      title: "Continue Practicing",
      description: "Access your interview history, track progress, and keep refining your skills with unlimited mock interviews and adaptive challenges."
    }
  ];

function StepsSection() {
    const [activeStep, setActiveStep] = useState(0);

    const handleClick = (index) => {
      setActiveStep(index);
    };
  return (
    <div className="relative w-full">
      {/* Step indicator: Circular or semi-circular layout */}
      <div className="absolute left-1/2 top-[-60px] transform -translate-x-1/2 flex gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => handleClick(index)} // Set the active step on click
            className={`w-12 h-12 flex items-center justify-center rounded-full border-4 border-[#10B981] ${
              activeStep === index ? "bg-[#10B981]" : step.color
            } text-white font-bold text-xl cursor-pointer`}
          >
            {index + 1}
          </motion.div>
        ))}
      </div>

      {/* Cards Display: Show all the cards in a unique layout */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInStagger}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mt-20 py-16"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={cardVariants}
            whileHover="hover"
            className={`p-8 rounded-2xl shadow-xl transition-all bg-opacity-90 backdrop-blur-lg 
              ${step.color} text-white flex flex-col items-center transform transition-transform 
              hover:scale-105 ${
                activeStep === index
                  ? "scale-105 border-4 border-[#10B981]" // Highlight the active step card
                  : ""
              }`}
          >
            <div className={`mb-4  w-32 h-32 rounded-full flex justify-center items-center ${activeStep === index
                  ? "scale-105 border-4 border-[#10B981] " // Highlight the active step card
                  : ""}`}>{step.icon}</div>
            <h2 className="text-2xl text-start w-full font-semibold mb-2">{step.title}</h2>
            <p className="text-lg text-justify">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default StepsSection;
