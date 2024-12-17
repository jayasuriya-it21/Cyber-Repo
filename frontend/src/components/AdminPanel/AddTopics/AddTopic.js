import React, { useState } from 'react';
import { addTopic } from '../../../Api/api';
import './AddTopic.css';

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
    <div className="add-topic-container">
      <h1 className="add-topic-title">Add New Topic</h1>
      <form onSubmit={handleSubmit} className="add-topic-form">
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoLink">Video Link:</label>
          <input
            type="url"
            id="videoLink"
            name="videoLink"
            placeholder="Video Link"
            value={formData.videoLink}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="referenceLink">Reference Link:</label>
          <input
            type="url"
            id="referenceLink"
            name="referenceLink"
            placeholder="Reference Link"
            value={formData.referenceLink}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Topic
        </button>
      </form>
    </div>
  );
};

export default AddTopic;