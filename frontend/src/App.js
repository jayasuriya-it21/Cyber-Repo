import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Display from './components/Display';
import Navbar from './components/Navbar';
import AddTopic from './components/AddTopic';
import UpdateTopic from './components/UpdateTopic';
import AdminHome from './components/AdminHome';
import { fetchTopics, fetchTopicDetailsByName } from './api';

const App = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Fetch topics on initial load
  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  const handleSelectTopic = (topicName) => {
    setSelectedTopic(topicName);
  };

  const filterTopicsByCategory = (category) => {
    return topics.filter(topic => topic.category === category);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Route for topics by category */}
          <Route path="/courses/basic" element={
            <div>
              <Menu onSelectTopic={handleSelectTopic} topics={filterTopicsByCategory("Basic")} />
              <Display selectedTopic={selectedTopic} />
            </div>
          } />
          <Route path="/courses/intermediate" element={
            <div>
              <Menu onSelectTopic={handleSelectTopic} topics={filterTopicsByCategory("Intermediate")} />
              <Display selectedTopic={selectedTopic} />
            </div>
          } />
          <Route path="/courses/advance" element={
            <div>
              <Menu onSelectTopic={handleSelectTopic} topics={filterTopicsByCategory("Advanced")} />
              <Display selectedTopic={selectedTopic} />
            </div>
          } />

          {/* Dynamic route for individual topics */}
          <Route path="/courses/:category/:topicName" element={
            <div>
              <Menu onSelectTopic={handleSelectTopic} topics={topics} />
              <Display selectedTopic={selectedTopic} />
            </div>
          } />
        </Routes>
      </div>
      <div> 
        <Routes>
          <Route path="/add" element={<AddTopic />} /> 
          <Route path="/update" element={<UpdateTopic />} /> 
          <Route path="/admin" element={<AdminHome />} /> 
        </Routes> 
      </div>
    </Router>
  );
};

export default App;
