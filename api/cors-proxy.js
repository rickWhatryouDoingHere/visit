const fetch = require('node-fetch');

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            // Forward the error message from the API response
            const errorData = await response.text(); // Get the error message
            return res.status(response.status).json({ error: errorData });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data: ' + error.message });
    }
}
