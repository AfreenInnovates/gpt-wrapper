import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { FaRobot, FaRegLightbulb, FaCogs, FaCamera, FaUserCheck, FaTasks, FaRocket, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

// AI Models available
const models = [
  { name: "Text-to-Text", description: "Summarization & automation", route: "/textmodel", icon: <FaRegLightbulb /> },
  { name: "Text-to-Image", description: "Generate visuals from text", route: "/textimage", icon: <FaCogs /> },
  { name: "Image-to-Text", description: "Extract text from images", route: "/vision", icon: <FaCamera /> },
];

// Features list
const features = [
  { icon: <FaTasks className="text-blue-400 text-8xl" />, title: "Smart Task Assignment", description: "Automatically distribute tasks based on preferences & roles." },
  { icon: <FaRobot className="text-purple-400 text-8xl" />, title: "AI-Powered Assistance", description: "Get real-time AI recommendations for your tasks." },
  { icon: <FaUserCheck className="text-green-400 text-8xl" />, title: "Seamless Collaboration", description: "Work together efficiently with smart task tracking." },
];

const LandingPage = () => {
  return (
    <div className="w-full bg-gray-900 text-white custom-scrollbar">

      {/* 🚀 Hero Section */}
      <motion.div className="h-screen flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.h1 className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
          AI-Powered Task Management
        </motion.h1>
        <motion.p className="text-lg md:text-2xl text-gray-300 mt-6 max-w-3xl"
          initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          Automate, Optimize & Enhance Your Daily Tasks with AI Assistance.
        </motion.p>
        <motion.div className="mt-8" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <Button text="Get Started" to="/input" />
        </motion.div>
      </motion.div>

      {/* 🔥 Features Section */}
      <div className="min-h-screen py-40 px-6 md:px-32 bg-gray-800">
        <motion.h2 className="text-5xl font-bold text-center text-purple-400 mb-24"
          initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Why TaskAI?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <motion.div key={index} className="bg-gray-900 p-12 rounded-lg shadow-xl flex flex-col items-center text-center hover:bg-gray-700 transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }}>
              {feature.icon}
              <h3 className="text-3xl font-semibold mt-6">{feature.title}</h3>
              <p className="text-gray-400 mt-3 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔷 AI Models Section */}
      <div className="min-h-screen py-40 px-6 md:px-32">
        <motion.h2 className="text-5xl font-bold text-center text-blue-300 mb-24"
          initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Explore AI Models
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-16">
          {models.map((model, index) => (
            <motion.div key={index} className="bg-gray-800 p-12 rounded-lg shadow-xl flex flex-col items-center text-center hover:bg-gray-700 transition-all duration-300"
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }}>
              <div className="text-7xl text-blue-300 mb-6">{model.icon}</div>
              <h3 className="text-3xl font-semibold">{model.name}</h3>
              <p className="text-gray-400 mt-3 text-lg">{model.description}</p>
              <Link to={model.route} className="mt-6 text-blue-400 hover:underline text-lg">Try Now →</Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🚀 Call to Action */}
      <motion.div className="h-[90vh] flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center px-6"
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <h2 className="text-5xl font-bold">Ready to Automate Your Tasks?</h2>
        <p className="text-xl text-gray-200 mt-6">Start optimizing your workflow with AI-powered assistance today.</p>
        <Button text="Get Started" to="/input" className="mt-8" />
      </motion.div>

      {/* 📢 Footer */}
      <footer className="bg-gray-900 text-center py-16">
        <h3 className="text-2xl text-gray-400">TaskAI - Smarter Task Management</h3>
        <div className="flex justify-center space-x-8 mt-6">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition"><FaTwitter size={32} /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition"><FaGithub size={32} /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition"><FaLinkedin size={32} /></a>
        </div>
        <p className="text-gray-500 mt-6 text-lg">© 2025 TaskAI. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default LandingPage;
