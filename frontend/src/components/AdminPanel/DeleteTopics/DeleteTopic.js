// frontend\src\components\DeleteTopic.js

import React, { useState, useEffect } from 'react';
import { fetchTopics, deleteTopic } from '../../../Api/api';
import "./DeleteTopic.css"



const DeleteTopic = () => {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopics(data);
        const uniqueCategories = [...new Set(data.map((topic) => topic.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    const filtered = topics.filter((topic) => topic.category === category);
    setFilteredTopics(filtered);
    setSelectedTopic('');
  };

  const handleTopicChange = (e) => {
    const topicId = e.target.value;
    setSelectedTopic(topicId);
  };

  const handleDelete = () => {
    if (!selectedTopic) {
      alert('Please select a topic to delete');
      return;
    }

    deleteTopic(selectedTopic)
      .then((response) => {
        alert('Topic deleted successfully!');
        setTopics(topics.filter((topic) => topic._id !== selectedTopic));
        setFilteredTopics(filteredTopics.filter((topic) => topic._id !== selectedTopic));
        setSelectedTopic('');
      })
      .catch((error) => {
        alert('Error deleting topic. Please try again.');
        console.error('Error deleting topic:', error);
      });
  };

  return (
    <div className="selectTopic">
      <h1>Delete Topic</h1>

      <label>Category:</label>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <>
          <label>Topic:</label>
          <select onChange={handleTopicChange} value={selectedTopic}>
            <option value="">Select Topic</option>
            {filteredTopics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.name}
              </option>
            ))}
          </select>
        </>
      )}

      <button onClick={handleDelete}>Delete Topic</button>
    </div>
  );
};

export default DeleteTopic;
