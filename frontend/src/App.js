import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/CourseDisplay/Navbar/Navbar';
import AddTopic from './components/AdminPanel/AddTopics/AddTopic';
import UpdateTopic from './components/AdminPanel/UpdateTopics/UpdateTopic';
import AdminHome from './components/AdminPanel/Home/AdminHome';
import DeleteTopic from './components/AdminPanel/DeleteTopics/DeleteTopic';
import { fetchTopics } from './Api/api';
import CourseRoutes from './components/CourseDisplay/Route/CourseRoutes'; // Import the new component

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

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminRoute && <Navbar handleSelectCategory={handleSelectCategory} />}
      <CourseRoutes
        handleSelectTopic={handleSelectTopic}
        filterTopicsByCategory={filterTopicsByCategory}
        selectedCategory={selectedCategory}
        selectedTopic={selectedTopic}
      />
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
