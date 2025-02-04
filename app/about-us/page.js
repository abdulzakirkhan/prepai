"use client";

import { useState } from "react";
import {
  Users,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import Slid, {} from "../../components/ui/Sli"
const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const tabContent = {
    mission: {
      icon: <Target className="mr-2 text-white" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-lg text-white">
            Mock Interview AI is on a mission to revolutionize interview
            preparation by providing personalized, intelligent AI coaching
            tailored to individual career aspirations.
          </p>
          <p className="text-lg text-white">
            With Mock Interview AI, the goal is to bridge the gap between
            preparation and success, empowering users to unlock their full
            potential.
          </p>
        </motion.div>
      ),
    },
    story: {
      icon: <BookOpen className="mr-2 text-white" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-lg text-white">
            The idea for Mock Interview AI was born from firsthand experiences
            with the challenges of interview preparation. As a solo developer, I
            wanted to create a platform that simplifies the process and builds
            confidence in individuals.
          </p>
          <p className="text-lg text-white">
            This journey has been a testament to the power of passion and
            innovation, leading to the creation of an impactful tool for career
            growth.
          </p>
          <p className="text-lg text-white">
            In collaboration with industry experts, we continue to refine our
            platform, ensuring that Mock Interview AI remains ahead of the curve
            in providing practical, actionable feedback to job seekers.
          </p>
        </motion.div>
      ),
    },
    approach: {
      icon: <Rocket className="mr-2 text-white" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-lg text-white">
            Mock Interview AI leverages advanced AI algorithms to generate
            dynamic, contextually relevant interview questions based on your
            professional background and goals.
          </p>
          <p className="text-lg text-white">
            Through real-time analysis and feedback, the platform provides
            actionable insights, enabling users to improve with every mock
            interview attempt.
          </p>
          <p className="text-lg text-white">
            Our approach is designed to simulate the pressure of a real-life
            interview while providing helpful insights, making the transition to
            actual interviews smoother and more successful.
          </p>
        </motion.div>
      ),
    },
    team: {
      icon: <Users className="mr-2 text-white" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-lg text-white">
            Behind Mock Interview AI is a dedicated team of AI engineers,
            developers, and career coaches who work tirelessly to improve and
            expand the platform.
          </p>
          <p className="text-lg text-white">
            Our team shares a common vision of empowering individuals to achieve
            their career goals by offering high-quality, accessible interview
            preparation resources.
          </p>
        </motion.div>
      ),
    },
    vision: {
      icon: <Rocket className="mr-2 text-white" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-lg text-white">
            Our long-term vision is to build an intelligent career development
            ecosystem that empowers professionals to continuously grow and
            succeed.
          </p>
          <p className="text-lg text-white">
            We aim to enhance the AI’s capabilities by incorporating industry
            insights, soft-skill assessments, and other resources to provide a
            360-degree view of interview preparation.
          </p>
        </motion.div>
      ),
    },
  };

  const coreValues = [
    {
      icon: <Award className="w-12 h-12 text-[#10B981] mb-4" />,
      title: "Continuous Learning",
      description:
        "Always striving to improve and provide better tools for growth.",
    },
    {
      icon: <Users className="w-12 h-12 text-[#10B981] mb-4" />,
      title: "Empowerment",
      description:
        "Supporting individuals in building confidence and achieving professional success.",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-[#10B981] mb-4" />,
      title: "Excellence",
      description:
        "Delivering high-quality, impactful features to simplify interview preparation.",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-[#10B981] mb-4" />,
      title: "Excellence",
      description:
        "Delivering high-quality, impactful features to simplify interview preparation.",
    },
  ];
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
    <div className="min-h-screen relative isolate bg-[#0D1117] py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-6xl mt-20 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            About Mock Interview AI
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-50">
            Empowering professionals to ace interviews through intelligent,
            personalized AI coaching.
          </p>
        </motion.div>

        <div className="bg-white/50 shadow-xl backdrop-blur-md rounded-xl overflow-hidden mb-12">
          <div className="flex flex-col sm:flex-row">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full sm:flex-1 py-4 px-6 flex items-center justify-center text-lg font-medium 
                  ${
                    activeTab === tab
                      ? "bg-[#10B981] text-white border-b-4"
                      : "text-gray-600 bg-[#1F2937] hover:bg-[#10B981]"
                  }`}
              >
                {tabContent[tab].icon}
                <span className="ml-2">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>
          <div className="p-6 bg-[#1F2937] ">{tabContent[activeTab].content}</div>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
          },
        }}
        className="shadow-xl  backdrop-blur-md rounded-xl px-24 py-8"
      >
          <h2 className="text-3xl font-bold text-center text-white mb-10">
            Our Core Values
          </h2>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="p-8 rounded-2xl border border-[#10B981] shadow-lg transition-all bg-opacity-80 backdrop-blur-lg bg-[#1F2937] flex flex-col items-center text-center"
              >
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-400 mb-3">
                  {value.title}
                </h3>
                <p className="text-lg text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div> */}
          <Slid coreValues={coreValues} />
        </motion.div>

    </div>
  );
};

export default AboutUsPage;
