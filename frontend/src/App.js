// frontend\src\App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Display from './components/Display';
import Navbar from './components/Navbar';
import AddTopic from './components/AddTopic';
import UpdateTopic from './components/UpdateTopic';
import AdminHome from './components/AdminHome';
import DeleteTopic from './components/DeleteTopic';
import { fetchTopics } from './api';

const App = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch topics on initial load
  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length >= 3) {
      const newCategory = pathParts[2];
      const newTopic = pathParts[3]?.replace(/-/g, ' ') || "";

      // Reset selected topic when category changes
      if (newCategory !== selectedCategory) {
        setSelectedCategory(newCategory);
        setSelectedTopic(""); // Clear selected topic
      } else {
        setSelectedTopic(newTopic);
      }
    }
  }, [location, selectedCategory]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedTopic(""); // Clear selected topic when category is changed
    navigate(`/courses/${category.toLowerCase()}`);
  };

  const handleSelectTopic = (category, topicName) => {
    setSelectedTopic(topicName);
    setSelectedCategory(category);
    navigate(`/courses/${category.toLowerCase()}/${topicName.replace(/\s+/g, '-')}`);
  };

  const filterTopicsByCategory = (category) => {
    return topics.filter(topic => topic.category.toLowerCase() === category.toLowerCase());
  };

  return (
    <div>
      <Navbar handleSelectCategory={handleSelectCategory} />
      <Routes>
        <Route path="/courses/basic" element={
          <div>
            <Menu onSelectTopic={(topicName) => handleSelectTopic("basic", topicName)} topics={filterTopicsByCategory("basic")} category="basic" selectedTopic="" />
            <Display selectedTopic={selectedTopic} />
          </div>
        } />
        <Route path="/courses/intermediate" element={
          <div>
            <Menu onSelectTopic={(topicName) => handleSelectTopic("intermediate", topicName)} topics={filterTopicsByCategory("intermediate")} category="intermediate" selectedTopic="" />
            <Display selectedTopic={selectedTopic} />
          </div>
        } />
        <Route path="/courses/advanced" element={
          <div>
            <Menu onSelectTopic={(topicName) => handleSelectTopic("advanced", topicName)} topics={filterTopicsByCategory("advanced")} category="advanced" selectedTopic="" />
            <Display selectedTopic={selectedTopic} />
          </div>
        } />

        {/* Dynamic route for individual topics */}
        <Route path="/courses/:category/:topicName" element={
          <div>
            <Menu onSelectTopic={(topicName) => handleSelectTopic(selectedCategory, topicName)} topics={filterTopicsByCategory(selectedCategory)} category={selectedCategory} selectedTopic={selectedTopic} />
            <Display selectedTopic={selectedTopic} />
          </div>
        } />
      </Routes>
      <Routes>
        <Route path="/admin" element={<AdminHome />} /> 
        <Route path="/admin/add" element={<AddTopic />} /> 
        <Route path="/admin/update" element={<UpdateTopic />} /> 
        <Route path="/admin/delete" element={<DeleteTopic />} /> {/* New Route for DeleteTopic */}
      </Routes> 
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
