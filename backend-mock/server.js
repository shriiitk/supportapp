const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock scrape endpoint
app.post('/scrape', (req, res) => {
  const { businessName, website } = req.body;
  res.json({ name: businessName, website, details: "Mock data scraped from website" });
});

// Mock chat endpoint
app.post('/chat', (req, res) => {
  const { query, data } = req.body;
  res.json({ answer: `Mock answer for query '${query}' based on data from ${data.name}` });
});

app.listen(4000, () => console.log('Mock server running on http://localhost:4000'));