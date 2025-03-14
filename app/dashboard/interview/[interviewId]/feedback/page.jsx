"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  CheckCircle2, 
  XCircle, 
  ChevronsUpDown, 
  Activity, 
  Target 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTheme } from '@/app/context/ThemeContext';

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);







  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {theme,toggleTheme} = useTheme()

  useEffect(() => {
    GetFeedback();
  }, []);

  
  const GetFeedback = async () => {
    setLoading(true);
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    setLoading(false);

    // Calculate the average rating dynamically, only including valid ratings
    const validRatings = result
      .map((item) => parseFloat(item.rating))
      .filter((rating) => !isNaN(rating));

    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
    const avgRating = validRatings.length > 0 
      ? (totalRating / validRatings.length).toFixed(1) 
      : "N/A";

    setAverageRating(avgRating);
  };

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return "text-green-600";
    if (numRating >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-indigo-600 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your interview feedback...</p>
        </div>
      </div>
    );
  }
  const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(16, 185, 129, 0.5)",
      background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.1))",
      backdropFilter: "blur(1px)"
    }
  };
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(16,185,129,0.5)" },
  };


  

  return (
    <div className= {`${theme === "dark" ? "bg-gradient-to-b relative isolate from-[#1F2937] to-[#111827]" : "bg-[#fff]"} min-h-screen flex items-center`}>
      <div className={`${theme === "dark" ? "absolute top-0 left-0 w-full h-full overflow-hidden -z-10" :"hidden"}`}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 py-8 mt-20">
        {feedbackList.length === 0 ? (
          <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={`${theme === "dark" ? "hover" :"no-hover"}`}
          className={`max-w-md mx-auto ${theme === "dark" ? "bg-[#1F2937]" : "bg-[#f3f4f6]"} border-2 border-[#10B981] rounded-2xl`}
        >
          <Card className="bg-transparent border-0">
            <CardHeader className="text-center">
              <XCircle className="mx-auto h-16 w-16 text-red-500" />
              <h2 className="text-2xl font-bold dark:text-gray-100 mt-4">
                No Interview Feedback Available
              </h2>
            </CardHeader>
            <CardContent className="text-center">
              <p className="dark:text-gray-100 mb-6">
                It seems like no feedback has been generated for this interview. 
                This could be due to an incomplete interview or a system issue.
              </p>
              <div className="text-center flex justify-center">
                <motion.div className='text-center' variants={buttonVariants} whileHover="hover">
                  <Button 
                    variant="outline" 
                    onClick={() => router.replace('/dashboard')}
                    className="w-full bg-[#10B981] border-0 hover:bg-[#10B968] transition-all duration-300"
                  >
                    Return to Dashboard
                  </Button>
                </motion.div>
                </div>
            </CardContent>
          </Card>
        </motion.div>
        ) : (
          <>
            <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover="hover"
            className={`max-w-4xl border-2 border-[#10B981] rounded-2xl ${theme === "dark" ? "bg-[#1F2937]" : "bg-white"} mx-auto mb-8`}>
              <Card className="bg-transparent border-0">
                <CardHeader className="flex flex-row items-center gap-4">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                  <div>
                    <h2 className="text-3xl font-bold text-green-600">Great Job!</h2>
                    <p className="dark:text-gray-100">You've completed your mock interview.</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm dark:text-gray-100">Overall Rating</p>
                      <p className={`text-2xl font-bold ${getRatingColor(averageRating)}`}>
                        {averageRating ? `${averageRating}/10` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm dark:text-gray-100">Total Questions</p>
                      <p className="text-2xl font-bold text-indigo-600">
                        {feedbackList.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              <h3 className="text-xl font-semibold dark:text-gray-100">
                Detailed Interview Feedback
              </h3>
              <p className="text-sm dark:text-gray-100 mb-4">
                Review each question's performance and get insights for improvement.
              </p>

              {feedbackList.map((item, index) => {
                const parsedQuestion = item.question ? JSON.parse(item.question) : { question: "Question not found" };

                return (
                <Collapsible key={index} className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className={`flex items-center justify-between p-4 ${theme === "dark" ? "bg-gray-200" : ""} hover:bg-gray-200 transition-colors`}>
                      <div className="flex items-center gap-3">
                        <Target 
                          className={`h-5 w-5 ${
                            parseFloat(item.rating) >= 7 
                              ? "text-green-500" 
                              : parseFloat(item.rating) >= 4 
                              ? "text-yellow-500" 
                              : "text-red-500"
                          }`} 
                        />
                        <span className="font-medium text-gray-800 line-clamp-1">
                          {parsedQuestion.question}
                        </span>
                      </div>
                      <ChevronsUpDown className="h-4 dark:text-gray-500" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className={`p-4 ${theme === "dark" ? "bg-[#1F2937] text-white" : "bg-white text-black"}`}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"} mb-2`}>Your Answer</h4>
                        <p className="bg-red-50 p-3 rounded-lg text-sm text-red-900 border border-red-200">
                          {item.userAns || "No answer provided"}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"} mb-2`}>Correct Answer</h4>
                        <p className={` ${theme === "dark" ? "bg-green-50 text-black " : "bg-white text-black"} p-3 rounded-lg text-sm text-green-900 border border-green-200`}>
                          {parsedQuestion.answer}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className={`font-semibold ${theme === "dark" ? "text-white"  :"text-black"} mb-2`}>Feedback</h4>
                      <p className={`p-3 ${theme === "dark" ? "bg-black text-white"  :"bg-blue-50 text-black"} rounded-lg text-sm text-primary border border-blue-200`}>
                        {item.feedback}
                      </p>
                    </div>
                    <div className="mt-4 text-right">
                      <span className={`font-bold ${getRatingColor(item.rating)}`}>
                        Rating: {item.rating}/10
                      </span>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                )
              })}
              <div className="text-center flex justify-center">
                <motion.div className='text-center' variants={buttonVariants} whileHover="hover">
                  <Button onClick={() => router.replace('/dashboard')} className="w-full bg-[#10B981] hover:bg-[#10B968] md:w-auto">
                    Return to Dashboard
                  </Button>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feedback;