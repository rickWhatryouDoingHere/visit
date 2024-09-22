// File: /api/getVisits.js
export default async function handler(req, res) {
    const { universeId } = req.query;

    if (!universeId) {
        return res.status(400).json({ error: "Universe ID is required" });
    }

    const apiUrl = `https://games.roblox.com/v1/games?universeIds=${universeId}`;

    try {
        const response = await fetch(apiUrl, {
            headers: { "accept": "application/json" },
        });

        if (!response.ok) {
            return res.status(500).json({ error: "Failed to fetch data from Roblox API" });
        }

        const data = await response.json();
        const visits = data.data[0]?.visits || 0;

        return res.status(200).json({ visits });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred" });
    }
}
