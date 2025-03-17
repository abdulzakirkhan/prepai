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
import Webcam from "react-webcam";
import { useTheme } from "@/app/context/ThemeContext";
const RecordAnswerSection = ({ 
  mockInterviewQuestion, 
  activeQuestionIndex, 
  interviewData, 
  onAnswerSave
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
   const [stream, setStream] = useState(null);
  const webcamRef=useRef(null)
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
    const StartStopRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Request mic access
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;  // Ensure continuous listening
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";
  
        recognitionRef.current.onresult = (event) => {
          setUserAnswer(event.results[0][0].transcript);
        };
  
        recognitionRef.current.onerror = (event) => {
          toast.error("Recording error: " + event.error);
          console.error("Speech recognition error:", event.error);
        };

        console.log("recognitionRef",recognitionRef)
  
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        toast.error("Microphone access denied. Please allow microphone permissions.");
        console.error("Microphone access error:", error);
      }
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
      // Ensure a valid question exists
      const questionText = mockInterviewQuestion?.[activeQuestionIndex];
      if (!questionText) {
        console.error("No question found for index:", activeQuestionIndex);
        toast.error("Invalid interview question. Please refresh or restart.");
        return;
      }
  
      // Generate AI feedback
      const feedbackPrompt = `Question: ${questionText}, User Answer: ${userAnswer}. Please give a rating out of 10 and feedback on improvement in JSON format { "rating": <number>, "feedback": <text> }`;
      const result = await chatSession.sendMessage(feedbackPrompt);
  
      let JsonfeedbackResp;
      try {
        const cleanedResponse = result.response.text().replace(/```json|```/g, "").trim();
        JsonfeedbackResp = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error("Failed to parse AI response:", result.response.text());
        JsonfeedbackResp = { rating: 0, feedback: "AI feedback could not be processed." };
      }
  
      // Prepare answer data
      const answerRecord = {
        mockIdRef: interviewData?.mockId || "unknown-session",
        question: questionText,
        correctAns:mockInterviewQuestion[1] || "N/A",
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback || "No feedback",
        rating: Math.min(Math.max(JsonfeedbackResp?.rating || 0, 0), 10), // Clamp rating between 0-10
        userEmail: user?.primaryEmailAddress?.emailAddress || "unknown@user.com",
        createdAt: moment().format("DD-MM-YYYY"),
      };
      // return
      // Validate answer record
      if (!answerRecord.question || answerRecord.question === "Unknown Question") {
        toast.error("Invalid question data. Please try again.");
        return;
      }
  
  
      // Insert into DB
      await db.insert(UserAnswer).values(answerRecord);
      toast.success("Answer recorded successfully");
  
      setUserAnswer("");
      recognitionRef.current?.stop();
      setIsRecording(false);
  
      // Move to the next question
      onAnswerSave(answerRecord);
  
    } catch (error) {
      console.error("Answer submission error:", error);
      toast.error("Failed to save answer", { description: error.message });
  
      // Ensure error logging function exists
      if (typeof logErrorToService === "function") {
        await logErrorToService(error, { userAnswer, questionIndex: activeQuestionIndex });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col relative">
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
            <>
           {/* <video 
             ref={webcamRef} 
             autoPlay 
            playsInline 
            className="w-[200px] h-[200px] object-cover rounded-lg"
           /> */}
           <Webcam
                mirrored={true}
                style={{ height: "100%", width: "100%" }}
                onUserMedia={(mediaStream) => {
                  setStream(mediaStream);
                }}
                onUserMediaError={(error) => {
                  toast.error(`Webcam error: ${error.name} - ${error.message}`);
                  setWebcamEnabled(false);
                }}
              />

        </>
        ) : (
          <div className={`w-[200px] h-[200px] ${theme === "dark" ? "bg-black text-white" :"bg-white text-black"}  flex justify-center items-center border-2 border-[#10B981] rounded-lg`}>
            <p className={``} >Webcam Disabled</p>
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

     

      <Button variant="outline" className="my-10 border-0 dark:text-white hover:bg-[#10B960] bg-[#10B981]" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>

      <textarea 
        className={`w-full ${theme === "dark" ? "bg-[#1F2937] text-gray-100" : ""} h-32 p-4 border border-[#10B981] rounded-md`} 
        placeholder="Your answer will appear here..." 
        value={userAnswer} 
        onChange={(e) => setUserAnswer(e.target.value)} 
      />

      <Button className="mt-4 bg-[#10B981] hover:bg-[#10B960] border-0 text-white" onClick={UpdateUserAnswer} disabled={loading || !userAnswer.trim()}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          "Save Answer"
        )}
      </Button>

      
    </div>
  );
};

export default RecordAnswerSection;
