// frontend\src\components\AddTopic.js

import React, { useState } from 'react';
import { addTopic } from '../../../Api/api';
import './AddTopic.css'



const AddTopic = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    videoLink: '',
    referenceLink: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Custom validation for mandatory fields
    const { category, name, description, videoLink, referenceLink } = formData;
    if (!category || !name || !description || !videoLink || !referenceLink) {
      alert('Please fill in all fields!');
      return;
    }

    // Submit data if validation passes
    addTopic(formData)
      .then((response) => {
        alert('Topic added successfully!');
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.error('Error adding topic:', error);
        alert('Failed to add topic. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Topic</h1>

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

      <button type="submit">Add Topic</button>
    </form>
  );
};

export default AddTopic;
