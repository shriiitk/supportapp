const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Mock scraping endpoint
app.post('/api/scrape', (req, res) => {
    console.log('Scraping request received:', req.body);
    const { businessName, website } = req.body;
    if (!businessName || !website) {
        console.error('Error: Missing businessName or website');
        return res.status(400).json({ error: 'Business name and website are required.' });
    }
    // Mock response data
    res.json({
        businessName,
        website,
        data: `Mock data for ${businessName} from ${website}`
    });
});

// Mock chat endpoint
app.post('/api/chat', (req, res) => {
    console.log('Chat request received:', req.body);
    const { query, data } = req.body;
    if (!query || !data) {
        console.error('Error: Missing query or data');
        return res.status(400).json({ error: 'Query and data are required.' });
    }
    // Mock response
    res.json({
        answer: `Mock answer to "${query}" based on data "${data.data}".`
    });
});

app.listen(PORT, () => {
    console.log(`Mock backend running at http://localhost:${PORT}`);
});