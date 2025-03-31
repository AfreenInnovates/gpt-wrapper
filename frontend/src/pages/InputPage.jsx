import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/InputPage.css"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const InputPage = () => {
  const [members, setMembers] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [preferences, setPreferences] = useState("");
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Add Member
  const addMember = () => {
    if (name && age && role && preferences) {
      setMembers([...members, { name, age: parseInt(age), role, preferences: preferences.split(",") }]);
      setName("");
      setAge("");
      setRole("");
      setPreferences("");
    }
  };

  // Remove Member
  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  // Add Task
  const addTask = () => {
    if (task) {
      setPendingTasks([...pendingTasks, task]);
      setTask("");
    }
  };

  // Remove Task
  const removeTask = (index) => {
    setPendingTasks(pendingTasks.filter((_, i) => i !== index));
  };

  // Submit Form
  const handleSubmit = async () => {
    if (members.length === 0 || pendingTasks.length === 0) {
      alert("Please add at least one member and one task!");
      return;
    }

    const data = { num_members: members.length, members, pending_tasks: pendingTasks };

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/input", data);
      console.log("Response:", response.data);
      navigate("/dashboard", { state: { tasks: response.data.tasks } });
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 lg:px-16 py-14 overflow-hidden">
      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-10"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Task Assignment Input
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Add Family Member */}
        <motion.div className="glassmorphism" variants={fadeInUp} initial="hidden" animate="visible">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Add Family Member</h2>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
              className="input-field" />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}
              className="input-field" />
            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}
              className="input-field" />
            <input type="text" placeholder="Preferences (comma-separated)" value={preferences}
              onChange={(e) => setPreferences(e.target.value)} className="input-field" />
          </div>
          <button onClick={addMember} className="btn-purple mt-4 w-full">
            Add Member
          </button>
        </motion.div>

        {/* Add Task */}
        <motion.div className="glassmorphism" variants={fadeInUp} initial="hidden" animate="visible">
          <h2 className="text-xl font-semibold mb-4 text-green-300">Add Task</h2>
          <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)}
            className="input-field w-full" />
          <button onClick={addTask} className="btn-green mt-4 w-full">
            Add Task
          </button>
        </motion.div>
      </div>

      {/* Members & Tasks */}
      <div className="grid lg:grid-cols-2 gap-10 w-full max-w-6xl mt-10">
        <motion.div className="glassmorphism" variants={fadeInUp} initial="hidden" animate="visible">
          <h2 className="text-xl font-semibold text-blue-300">Members</h2>
          <ul className="scrollable-list">
            <AnimatePresence>
              {members.map((m, index) => (
                <motion.li key={index} exit={{ opacity: 0, y: -10 }} className="list-item">
                  {m.name} - {m.role}
                  <button onClick={() => removeMember(index)} className="text-red-400">✖</button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>

        <motion.div className="glassmorphism" variants={fadeInUp} initial="hidden" animate="visible">
          <h2 className="text-xl font-semibold text-blue-300">Pending Tasks</h2>
          <ul className="scrollable-list">
            <AnimatePresence>
              {pendingTasks.map((t, index) => (
                <motion.li key={index} exit={{ opacity: 0, y: -10 }} className="list-item">
                  {t}
                  <button onClick={() => removeTask(index)} className="text-red-400">✖</button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.button onClick={handleSubmit} disabled={loading} className="btn-purple mt-10 w-full max-w-xl">
        {loading ? <div className="loader"></div> : "Generate Tasks"}
      </motion.button>
    </div>
  );
};

export default InputPage;
