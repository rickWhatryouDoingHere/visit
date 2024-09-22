document.getElementById('getUniverseId').addEventListener('click', async () => {
    const placeId = document.getElementById('placeId').value;
    const universeResponse = await fetch(`/api/cors-proxy?url=https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    
    const universeData = await universeResponse.json();

    if (universeData && universeData.id) {
        document.getElementById('universeId').innerText = universeData.id;
        document.getElementById('universeInfo').classList.remove('hidden');
        fetchLiveVisits(universeData.id);
    } else {
        alert('Invalid Place ID or unable to retrieve Universe ID.');
    }
});

async function fetchLiveVisits(universeId) {
    const visitsResponse = await fetch(`/api/cors-proxy?url=https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const visitsData = await visitsResponse.json();
    
    if (visitsData && visitsData.data.length > 0) {
        const liveVisits = visitsData.data[0].playing;
        document.getElementById('liveVisits').innerText = liveVisits;
        setInterval(() => updateLiveVisits(universeId), 5000);
    } else {
        alert('Error fetching live visits data.');
    }
}

async function updateLiveVisits(universeId) {
    const visitsResponse = await fetch(`/api/cors-proxy?url=https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const visitsData = await visitsResponse.json();
    
    if (visitsData && visitsData.data.length > 0) {
        const liveVisits = visitsData.data[0].playing;
        document.getElementById('liveVisits').innerText = liveVisits;
    }
}
