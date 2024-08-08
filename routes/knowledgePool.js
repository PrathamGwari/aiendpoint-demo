const express = require("express");
const router = express.Router();
const KnowledgePool = require("../models/KnowledgePool");

// Create a new knowledge pool entry
router.post("/", async (req, res) => {
  try {
    const { title, data } = req.body;
    const knowledgePool = new KnowledgePool({ title, data });
    await knowledgePool.save();
    res.status(201).send(knowledgePool);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read all knowledge pool entries
router.get("/", async (req, res) => {
  try {
    const knowledgePools = await KnowledgePool.find();
    // Add unique id property for each knowledge pool row
    const updatedKnowledgePools = knowledgePools.map((pool, idx) => ({
      ...pool.toObject(),
      id: idx + 1,
    }));
    res.status(200).send(updatedKnowledgePools);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read a single knowledge pool entry by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const knowledgePool = await KnowledgePool.findById(id);
    if (!knowledgePool) {
      return res.status(404).send("KnowledgePool not found");
    }
    res.status(200).send(knowledgePool);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a knowledge pool entry by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, data } = req.body;
    const knowledgePool = await KnowledgePool.findByIdAndUpdate(
      id,
      { title, data },
      { new: true, runValidators: true }
    );
    if (!knowledgePool) {
      return res.status(404).send("KnowledgePool not found");
    }
    res.status(200).send(knowledgePool);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a knowledge pool entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const knowledgePool = await KnowledgePool.findByIdAndDelete(id);
    if (!knowledgePool) {
      return res.status(404).send("KnowledgePool not found");
    }
    res.status(200).send("KnowledgePool deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
