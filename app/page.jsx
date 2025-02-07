'use client'
import { motion } from 'framer-motion';
import HeroSection from './dashboard/_components/HeroSection'
import WhyChooseUs, {} from ".././components/ui/WhyChooseUs"
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from 'next/link';
import { useTheme } from './context/ThemeContext';
export default function ResourcesPage() {

  const {theme,toggleTheme}=useTheme()


  const features = [
    { title: "AI-Powered", description: "Get smart interview feedback." },
    { title: "Personalized Coaching", description: "Tailored guidance for your needs." },
    { title: "Mock Interviews", description: "Practice with real-world scenarios." },
    { title: "Mock Interviews", description: "Practice with real-world scenarios." },
  ];
  const faqs = [
    { question: "How does it work?", answer: "Our AI-powered system helps you prepare for interviews with personalized feedback." },
    { question: "Is it free?", answer: "We offer both free and premium plans to suit different needs." },
    { question: "Can I practice multiple times?", answer: "Yes! You can take unlimited mock interviews." },
    { question: "Do I need to sign up?", answer: "Yes, you need to create an account to access personalized interview sessions." },
    { question: "What industries do you support?", answer: "We provide interview questions and mock sessions for various industries including tech, finance, healthcare, and more." },
    { question: "Can I get feedback on my performance?", answer: "Yes! Our AI system analyzes your answers and provides instant feedback on areas of improvement." },
    { question: "Can I use this on mobile devices?", answer: "Yes, our platform is fully responsive and works seamlessly on smartphones and tablets." },
  ];
  
  

  return (
    <>
    
    <HeroSection />
    <section className={`py-20 ${theme === "dark" ? "bg-gray-900 text-white" : ""}  text-center`}>
      <div className="container mx-auto px-7 -mt-16">

      <h2 className="text-3xl font-bold">Why Choose Us?</h2>
      <div className="mt-12">
        <WhyChooseUs features={features} />
      </div>
      {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {features.map((feature, index) => (
          <motion.div key={index} className="p-6 bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div> */}
      </div>
    </section>
    <section className={`py-16 ${theme === "dark" ? "bg-[#10B981]" :"bg-[#e5e7eb]"} text-white text-center`}>
      <h2 className={`text-3xl font-bold ${theme === "dark" ? ""  :"text-[#10B981]"}`}>Ready to Get Started?</h2>
      <p className={`mt-4 ${theme === "dark" ? "" :"text-black"} text-lg`}>Sign up today and start preparing for your interviews like a pro!</p>
      <SignedOut>
        <SignInButton mode="modal">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className="p-5">
          <Link href={"/dashboard"}
            className="px-4 py-2 bg-white text-[#10B981] rounded-md hover:bg-green-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Get Started
          </Link>
        </div>
      </SignedIn>
    </section>
    <section className={`py-16  ${theme === "dark" ? "bg-gray-900 text-white" : "bg-[#f3f4f6]"}`}>
      <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
      <div className="mt-8 max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className={`${theme === "dark" ? "bg-gray-800" : "bg-[#e5e7eb]"} p-4 rounded-lg #e5e7eb`}>
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-black"}`}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>

    </>
  )
}