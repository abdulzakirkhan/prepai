import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Loader2, Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { chatSession } from "@/utils/GeminiAIModal";
import { motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";
const RecordAnswerSection = ({ 
  mockInterviewQuestion, 
  activeQuestionIndex, 
  interviewData, 
  onAnswerSave
}) => {

  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const webcamRef = useRef(null);
const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const { theme } = useTheme();

  const EnableWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
      setWebcamEnabled(true);
      toast.success("Webcam enabled successfully");
    } catch (error) {
      toast.error("Failed to enable webcam", {
        description: "Please check your camera permissions"
      });
      console.error("Webcam error:", error);
    }
  };
  const DisableWebcam = () => {
    const tracks = webcamRef.current?.srcObject?.getTracks();
    tracks?.forEach(track => track.stop());
    setWebcamEnabled(false);
  };
  const StartStopRecording = () => {
    if (!isRecording) {
      recognitionRef.current = new window.webkitSpeechRecognition(); // For Chrome
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        setUserAnswer(event.results[0][0].transcript);
      };

      recognitionRef.current.onerror = (event) => {
        toast.error("Recording error: " + event.error);
      };

      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
  };

  const UpdateUserAnswer = async () => {
    if (!userAnswer.trim()) {
      toast.error("Please provide an answer");
      return;
    }

    setLoading(true);

    try {
      const questionText = mockInterviewQuestion[activeQuestionIndex]?.question || "Unknown Question";
      // Get AI-generated feedback
      const feedbackPrompt = `Question: ${questionText}, User Answer: ${userAnswer}. Please give a rating out of 10 and feedback on improvement in JSON format { "rating": <number>, "feedback": <text> }`;
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace(/```json|```/g, '').trim();
      const JsonfeedbackResp = JSON.parse(mockJsonResp);
      // Prepare answer data
      const answerRecord = {
        mockIdRef: interviewData.mockId,
        question: questionText,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer || "N/A",
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback || "No feedback",
        rating: JsonfeedbackResp?.rating || 0,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      await db.insert(UserAnswer).values(answerRecord);
      toast.success("Answer recorded successfully");

      setUserAnswer("");
      recognitionRef.current?.stop();
      setIsRecording(false);

      // Move to the next question or show the "End Interview" button
      onAnswerSave(answerRecord);

    } catch (error) {
      toast.error("Failed to save answer", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <motion.div className="flex justify-center items-center flex-col relative">
      {loading && (
        <div className={`fixed inset-0 ${theme === "dark" ? "bg-black/70" : "bg-white shadow-lg border-2"} z-[9999] flex flex-col justify-center items-center`}>
          <Loader2 className={`h-16 w-16 animate-spin ${theme === "dark" ? "text-white" : "text-black"} mb-4`} />
          <p className={`${theme === "dark" ? "text-white" : "text-black"} text-lg`}>Saving your answer...</p>
        </div>
      )}


      <motion.div
        whileHover={`${theme === "dark" ? "hover" : "no-hover"}`}
       className={`flex flex-col my-20 justify-center items-center rounded-lg p-5 border-[#10B981] ${theme === "dark" ? "shadow-lg transition-all bg-opacity-80 backdrop-blur-lg bg-[#1F2937]" :"bg-white"}`}>
        {webcamEnabled ? (
          <video 
            ref={webcamRef} 
            autoPlay 
            playsInline 
            className="w-[200px] h-[200px] object-cover rounded-lg"
          />
        ) : (
          <div className={`w-[200px] h-[200px] ${theme === "dark" ? "bg-black" :"bg-white"}  flex justify-center items-center border-2 border-[#10B981] rounded-lg`}>
            <p className={`text-gray-50 ${theme === "dark" ? "text-gray-50" : ""}`} >Webcam Disabled</p>
          </div>
        )}
        
        <Button 
          variant="outline" 
          className={`mt-4 bg-[#10B981] hover:bg-[#10B960] border-0  relative transition-transform duration-300 hover:scale-105`}
          onClick={webcamEnabled ? DisableWebcam : EnableWebcam}
        >
          {webcamEnabled ? (
            <>
              <CameraOff className="mr-2 h-4 w-4" /> Disable Webcam
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" /> Enable Webcam
            </>
          )}
        </Button>
      </motion.div>

      <Button
        variant="outline"
        className="mt-4 bg-[#10B981] hover:bg-[#10B960] border-0 dark:text-white relative transition-transform duration-300 hover:scale-105"
        onClick={webcamEnabled ? DisableWebcam : EnableWebcam}
      >
        {webcamEnabled ? (
          <>
            <CameraOff className="mr-2 h-4 w-4" /> Disable Webcam
          </>
        ) : (
          <>
            <Camera className="mr-2 h-4 w-4" /> Enable Webcam
          </>
        )}
      </Button>
    </motion.div>
    <div>
    <Button
      disabled={loading}
      variant="outline"
      className="my-10 border-0 dark:text-white hover:bg-[#10B960] bg-[#10B981] relative transition-transform duration-300 hover:scale-105"
      onClick={StartStopRecording}
    >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button><textarea
        className={`w-full ${theme === "dark" ? "bg-[#1F2937] placeholder:text-gray-100 text-gray-100" : ""} h-32 p-4 mt-4 border border-[#10B981] rounded-md focus:outline-none`}
        placeholder="Your answer will appear here..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)} /><Button
          className="mt-4 bg-[#10B981] hover:bg-[#10B960] border-0 text-white transition-transform duration-300 hover:scale-105"
          onClick={UpdateUserAnswer}
          disabled={loading || !userAnswer.trim()}
        >
        {loading ? (
          <><Loader2 className={`mr-2 h-4 w-4 ${theme === "dark" ? "text-black" : "text-white"} animate-spin`} /> Saving...</>
        ) : (
          "Save Answer"
        )}
      </Button>
      </div>
      </>
    );
};

export default RecordAnswerSection;
