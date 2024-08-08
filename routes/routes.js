const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

// Create a new route
router.post('/', async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find().populate('knowledgePoolId aiModels');
    const routesResponse = routes.map((route, idx) => {
      return {
        ...route.toObject(),
        id: idx + 1
      }
    })
    res.json(routesResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single route by ID
router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('knowledgePoolId aiModels');
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a route
router.put('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('knowledgePoolId aiModels');
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a route
router.delete('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
