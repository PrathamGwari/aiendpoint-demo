// routes/aiModelRoutes.js

const express = require('express');
const router = express.Router();
const AiModel = require('../models/AiModel');

// Create a new AI model
router.post('/', async (req, res) => {
  try {
    const { name, url, apiKey } = req.body;
    const newAiModel = await AiModel.create({ name, url, apiKey });
    res.status(201).json(newAiModel);
  } catch (error) {
    console.error('Error creating AI model:', error);
    res.status(500).json({ message: 'Failed to create AI model' });
  }
});

// Get all AI models
router.get('/', async (req, res) => {
  try {
    const aiModels = await AiModel.find();
    const aiModelsResponse = aiModels.map((model, idx) => {
        return {
            ...model.toObject(),
            id: idx + 1
        }
    })
    res.status(200).json(aiModelsResponse);
  } catch (error) {
    console.error('Error fetching AI models:', error);
    res.status(500).json({ message: 'Failed to fetch AI models' });
  }
});

// Get AI model by ID
router.get('/:id', async (req, res) => {
  try {
    const aiModel = await AiModel.findById(req.params.id);
    if (!aiModel) {
      return res.status(404).json({ message: 'AI model not found' });
    }
    res.status(200).json(aiModel);
  } catch (error) {
    console.error('Error fetching AI model:', error);
    res.status(500).json({ message: 'Failed to fetch AI model' });
  }
});

// Update AI model by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, url, apiKey } = req.body;
    const updatedAiModel = await AiModel.findByIdAndUpdate(req.params.id, { name, url, apiKey }, { new: true });
    if (!updatedAiModel) {
      return res.status(404).json({ message: 'AI model not found' });
    }
    console.log('updated ai model successfully')
    res.status(200).json(updatedAiModel);
  } catch (error) {
    console.error('Error updating AI model:', error);
    res.status(500).json({ message: 'Failed to update AI model' });
  }
});

// Delete AI model by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAiModel = await AiModel.findByIdAndDelete(req.params.id);
    if (!deletedAiModel) {
      return res.status(404).json({ message: 'AI model not found' });
    }
    res.status(200).json({ message: 'AI model deleted successfully' });
  } catch (error) {
    console.error('Error deleting AI model:', error);
    res.status(500).json({ message: 'Failed to delete AI model' });
  }
});

module.exports = router;
