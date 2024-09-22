document.getElementById('fetchButton').addEventListener('click', async () => {
    const placeId = document.getElementById('placeIdInput').value;
    const universeIdResponse = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`, {
        method: 'GET',
        headers: { 'accept': 'application/json' }
    });

    if (universeIdResponse.ok) {
        const universeData = await universeIdResponse.json();
        const universeId = universeData.id;
        fetchLiveCount(universeId);
    } else {
        alert('Failed to fetch universe ID. Please check the Place ID.');
    }
});

async function fetchLiveCount(universeId) {
    const liveCountElement = document.getElementById('liveCount');
    const totalVisitsElement = document.getElementById('totalVisits');

    setInterval(async () => {
        const gameInfoResponse = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`, {
            method: 'GET',
            headers: { 'accept': 'application/json' }
        });

        if (gameInfoResponse.ok) {
            const gameInfo = await gameInfoResponse.json();
            if (gameInfo.data.length > 0) {
                liveCountElement.textContent = gameInfo.data[0].playing;
                totalVisitsElement.textContent = gameInfo.data[0].visits;
            }
        }
    }, 5000);
}
