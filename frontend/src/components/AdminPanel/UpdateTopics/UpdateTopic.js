// frontend\src\components\UpdateTopic.js

import React, { useState, useEffect } from 'react';
import { fetchTopics, updateTopic } from '../../../Api/api';
import './UpdateTopic.css'


const UpdateTopic = () => {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    videoLink: '',
    referenceLink: '',
  });

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
    setSelectedTopic(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      category,
      name: '',
      description: '',
      videoLink: '',
      referenceLink: '',
    }));
  };

  const handleTopicChange = (e) => {
    const topicId = e.target.value;
    const topic = filteredTopics.find((t) => t._id === topicId);
    setSelectedTopic(topic);
    setFormData({
      category: topic.category,
      name: topic.name,
      description: topic.description,
      videoLink: topic.videoLink,
      referenceLink: topic.referenceLink,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const { category, name, description, videoLink, referenceLink } = formData;
    if (!category || !name || !description || !videoLink || !referenceLink) {
      alert('All fields are required!');
      return;
    }

    updateTopic(selectedTopic._id, formData)
      .then((response) => {
        alert('Topic updated successfully!');
        console.log('Topic updated:', response);
        window.location.reload(); // Reload the page after successful update
      })
      .catch((error) => {
        alert('Error updating topic. Please try again.');
        console.error('Error updating topic:', error);
      });
  };

  return (
    <div className='container'>

      <div className="selectTopic">

        <h1>Select Topic to Update</h1>

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
          <select onChange={handleTopicChange} value={selectedTopic?._id || ''}>
            <option value="">Select Topic</option>
            {filteredTopics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.name}
              </option>
            ))}
          </select>
        </>
      )}
      </div>


      {selectedTopic && (
        <form onSubmit={handleSubmit}>
          <h1>Update Topic</h1>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            {formData.category !== 'Basic' && formData.category !== 'Intermediate' && formData.category !== 'Advanced' && (
              <option value={formData.category}>{formData.category}</option>
            )}
          </select>

          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Video Link:</label>
          <input
            type="url"
            name="videoLink"
            placeholder="Video Link"
            value={formData.videoLink}
            onChange={handleChange}
            required
          />

          <label>Reference Link:</label>
          <input
            type="url"
            name="referenceLink"
            placeholder="Reference Link"
            value={formData.referenceLink}
            onChange={handleChange}
            required
          />

          <button type="submit">Update Topic</button>
        </form>
      )}
    </div>
  );
};

export default UpdateTopic;
