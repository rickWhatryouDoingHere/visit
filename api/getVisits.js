// File: api/getVisits.js

export default async function handler(req, res) {
  const { universeId } = req.query;

  // Debugging: Check if universeId is received
  console.log("Received Universe ID:", universeId);

  if (!universeId) {
    console.error("No Universe ID provided");
    return res.status(400).json({ error: "Universe ID is required" });
  }

  const apiUrl = `https://games.roblox.com/v1/games?universeIds=${universeId}`;

  try {
    // Fetch from Roblox API
    console.log("Fetching data from:", apiUrl);

    const response = await fetch(apiUrl, {
      headers: { "accept": "application/json" },
    });

    // Debugging: Check if response is OK
    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Failed to fetch from Roblox API");
      return res.status(500).json({ error: "Failed to fetch data from Roblox API" });
    }

    const data = await response.json();

    // Debugging: Check the received data
    console.log("Roblox API data:", data);

    const visits = data.data[0]?.visits || 0;

    // Debugging: Log the visits count
    console.log("Visits count:", visits);

    return res.status(200).json({ visits });
  } catch (
