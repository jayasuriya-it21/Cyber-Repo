const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Get All Topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Topic by ID
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Topic by Name
router.get('/name/:topicName', async (req, res) => {
  try {
    const topicName = req.params.topicName;
    const topic = await Topic.findOne({ name: topicName });

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create New Topic
router.post('/', async (req, res) => {
  const topic = new Topic(req.body);
  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Topic by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTopic) return res.status(404).json({ message: 'Topic not found' });
    res.json(updatedTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Topic by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTopic = await Topic.findByIdAndDelete(req.params.id);
    if (!deletedTopic) return res.status(404).json({ message: 'Topic not found' });
    res.json({ message: 'Topic deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
