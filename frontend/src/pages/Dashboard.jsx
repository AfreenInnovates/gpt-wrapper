import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, Label } from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaMicrochip, FaRegClock, FaRobot, FaUser } from "react-icons/fa";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const tasksData = location.state?.tasks || [];
  const [tasks, setTasks] = useState(
    tasksData.map(task => ({ ...task, completed: task.completed || false }))
  );

  // Handle Task Completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Compute Chart Data
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const chartData = [
    { name: "Completed", value: completedTasks, color: "#4CAF50" },
    { name: "Pending", value: pendingTasks, color: "#E53935" },
  ];

  // Custom Tooltip
  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-2 rounded shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p>Tasks: {payload[0].value}</p>
          <p>Percentage: {((payload[0].value / tasks.length) * 100).toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-20 flex flex-col lg:flex-row gap-6">
      
      {/* Left Side - Task List */}
      <motion.div
        className="w-full lg:w-2/3"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-purple-400">📋 Task List</h1>

        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks available.</p>
        ) : (
          tasks.map((task, index) => (
            <motion.div
              key={index}
              className={`relative p-6 mb-4 rounded-lg shadow-lg transition-all transform ${
                task.completed ? "bg-gray-700 opacity-60" : "bg-gray-800 hover:scale-102"
              }`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Task Completion Checkbox */}
              <div className="absolute top-3 right-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="h-6 w-6 accent-green-500"
                />
              </div>

              {/* Task Content */}
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`text-2xl ${task.completed ? "text-green-400" : "text-yellow-400"}`}>
                  {task.completed ? <FaCheckCircle /> : <FaRegClock />}
                </div>

                {/* Task Info */}
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{task.task}</h2>
                  
                  <p className="flex items-center text-gray-400 text-sm mb-2">
                    <FaUser className="mr-2" /> Assigned to: <span className="text-gray-300 ml-1">{task.assigned_to}</span>
                  </p>

                 {task.ai_assistance && (
                  <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center text-gray-300 text-sm mb-2">
                      <FaRobot className="mr-2 text-blue-300" />
                      <span>AI Suggestion: {task.ai_assistance.reason}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <FaMicrochip className="mr-2 text-green-300" />
                      <span>Suggested Model: {task.ai_assistance.model}</span>
                    </div>
                  </div>
                )}
                  {/* AI Assistance Button */}
                  {task.ai_assistance && (
                      <button
                          onClick={() => {
                            let route = "/ai-assistance";
                            const modelType = task.ai_assistance?.model.toLowerCase();
                            
                            if (modelType.includes("vision")) {
                              route = "/vision";
                            } else if (modelType.includes("text-to-image")) {
                              route = "/text-to-image";
                            } else if (modelType.includes("text-to-text")) {
                              route = "/text";
                            } else if (modelType.includes("image-to-text")) {
                              route = "/image-to-text"
                            } else if (modelType.includes("speech-recognition")) {
                              route = "/speech";
                            }

                            navigate(route, { state: { taskTitle: task.task } });
                          }}
                          className="bg-blue-500 hover:bg-blue-600 transition-all px-4 py-2 rounded text-sm mt-2"
                        >
                          Try AI Assistance
                      </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Right Side - Chart */}
      <motion.div
        className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-300 flex items-center">
          📊 Task Completion Overview
        </h2>

        {tasks.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label value={`${completedTasks}/${tasks.length} Done`} position="center" fill="white" />
              </Pie>
              <Tooltip content={renderTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-400 mt-4">No tasks available to display.</p>
        )}
      </motion.div>
      
    </div>
  );
};

export default Dashboard;
