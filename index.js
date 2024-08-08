const express = require("express");
const cors = require('cors');
const { config } = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');

config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
const authRoutes = require('./routes/auth');
const knowledgePoolRoutes = require('./routes/knowledgePool');
const aiModelRoutes = require('./routes/aiModel');
const routeRoutes = require('./routes/routes');
const customRoutes = require('./routes/customRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/knowledgepool', knowledgePoolRoutes);
app.use('/api/aimodel', aiModelRoutes);
app.use('/api/route', routeRoutes);
app.use('/api/custom-route', customRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected successfully to MongoDB");
})
.catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

// Catch-all route to serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
