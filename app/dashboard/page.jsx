'use client'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Bot,
  Plus,
  ListChecks,
  Trophy,
  Zap,
  TrendingUp,
  Code
} from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { eq ,desc, isNotNull} from 'drizzle-orm';
function Dashboard() {
  const { user } = useUser();
  const [highestRating, setHighestRating] = useState(0)
  const [userQuestions, setUserQuestions] = useState([])
  const [interviewData, setInterviewData] = useState([]);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
  const {theme,toggleTheme} =useTheme()
 const [interviews, setInterviews] = useState([]);
  const [userInterviews, setUserInterviews] = useState([])
  const [statsCards, setStatsCards] = useState([
    {
      icon: <ListChecks size={32} className="text-[#10B981]" />,
      title: "Total Interview Sessions",
      value: interviews.length || "0",
    },
    {
      icon: <Trophy size={32} className="text-[#10B981]" />,
      title: "Best Score",
      value: "N/A"
    },
    {
      icon: <TrendingUp size={32} className="text-[#10B981]" />,
      title: "Improvement Rate",
      value: "0%"
    }
  ]);




    const GetInterviewList = async () => {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));
      setInterviews(result);
    };






  const GetUserQuestions = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
        console.error("User email is missing.");
        return;
    }

    const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.userEmail, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(UserAnswer.id));

    setUserQuestions(result); // Assuming you have a state setter like `setUserQuestions`
  };



console.log("UserQuestions: ", userQuestions);

const calculateImprovementRate = (interviews) => {
  if (interviews.length < 2) return 0; // Need at least two interviews

  // Sort interviews by creation date (assuming `createdAt` exists)
  const sortedInterviews = interviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Extract previous and latest scores
  const prevScore = parseInt(sortedInterviews[sortedInterviews.length - 2].rating || '0', 10);
  const latestScore = parseInt(sortedInterviews[sortedInterviews.length - 1].rating || '0', 10);

  if (prevScore === 0) return 100; // If the previous score was 0, assume 100% improvement

  const improvement = ((latestScore - prevScore) / prevScore) * 100;
  
  return Math.round(improvement); // Round to whole number
};



  const GetHighestRating = async () => {
  
    const result = await db
    .select()
    .from(UserAnswer)
    .where(isNotNull(UserAnswer.rating))
    .orderBy(desc(UserAnswer.rating))
    .limit(1);
  
  
    if (result.length > 0) {
      const highestRating = parseFloat(result[0].rating);
      setHighestRating(!isNaN(highestRating) ? highestRating : 0); 
    } else {
      setHighestRating(0); 
    }
  };





  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetInterviewList();
      GetUserQuestions();
      GetHighestRating();
    }
  }, [user,]);


  useEffect(() => {

    if (interviews.length > 0) {
      toast.success(`Loaded ${interviews.length} ${interviews.length > 1 ? "Sessions" : "Session"} `, { id: "interview-toast" });
      const improvementRate = calculateImprovementRate(interviews); 

      setStatsCards([
        {
          ...statsCards[0],
          value: interviews.length
        },
        {
          ...statsCards[1],
          value:`${highestRating}/10` 
        },
        {
          ...statsCards[2],
          value: `${improvementRate}%` || '0%'
        }
      ])
    }
  }, [interviews,highestRating]);


console.log("interviews.lenght ", interviews.length);
  
  return (
    <div className={`${theme === "dark" ? "bg-gradient-to-b from-[#1F2937] to-[#111827]" : "bg-[#f3f4f6]"} min-h-screen flex items-center`}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-10 max-w-7xl mt-20"
      >
        
        {/* User Greeting */}
        <div className={` ${theme === "dark" ? "flex  relative isolate" : ""} flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0`}>
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#10B981] to-[#047857] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div>
            <h2 className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-white" : ""} flex items-center gap-3`}>
              Dashboard
            </h2>
          </div>
          <div className="flex items-center gap-4">
          <h3 className={`text-lg sm:text-xl dark:text-white mt-2`}>
              Welcome, {user?.fullName || 'Interviewer'}
            </h3>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
        >
          {statsCards.map((card) => (
            <motion.div
              key={card.title}
              className="p-4 border-2 border-[#10B981] sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {card.icon}
              <div className="ml-4">
                <p className="text-xs sm:text-sm  dark:text-white">{card.title}</p>
                <p className="text-xl sm:text-2xl font-bold dark:text-white">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interview Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="dark:bg-gray-800 p-4 sm:p-6 rounded-lg"
        >
          

          {/* Add New Interview Component */}
          <div className='grid grid-cols-1 md:grid-cols-12 justify-center items-baseline gap-6'>
            <div className="w-full md:col-span-12">
              <div className="flex justify-between items-center">
                <div className="">
                  <h2 className="text-xl sm:text-2xl font-semibold dark:text-white mb-6">
                    Interview History
                  </h2>
                </div>
                <div className="z-50 text-end">
                  <AddNewInterview 
                    isOpen={isNewInterviewModalOpen} 
                    onClose={() => setIsNewInterviewModalOpen(false)} 
                  /> 
                </div>
              </div>
            </div>
            {/* Interview History */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="w-full md:col-span-12"
            >
              <InterviewList interviews={interviewData} />
            </motion.div>

            


          </div>
        </motion.div>



      </motion.div>
    </div>
  );
}

export default Dashboard;