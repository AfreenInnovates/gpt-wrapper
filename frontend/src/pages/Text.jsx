import React from 'react'
import { useLocation } from 'react-router-dom';

const Text = () => {
    const location = useLocation();
    const taskTitle = location.state?.taskTitle || "Default Heading"; // Fallback if no title

    return (
    <div className="min-h-screen bg-gray-900 text-white p-40">
      <h1 className="text-3xl font-bold text-purple-400">Task: {taskTitle}</h1>
    </div>
  );
};


export default Text