let map;
let routeLayer;

document.addEventListener('DOMContentLoaded', function () {
    const findRouteButton = document.getElementById('find-route');
    const resultDiv = document.getElementById('route-result');

    // Initialize the map
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    findRouteButton.addEventListener('click', async () => {
        const startInput = document.getElementById('start').value.trim();
        const destinationInput = document.getElementById('destination').value.trim();

        if (!startInput || !destinationInput) {
            alert('Please enter both start and destination locations.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/find_safe_route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ start: startInput, destination: destinationInput })
            });

            const data = await response.json();

            if (data.status === "success") {
                resultDiv.innerHTML = `
                    <h3>SafeRoute Results</h3>
                    <p><strong>Start:</strong> ${data.start}</p>
                    <p><strong>Destination:</strong> ${data.destination}</p>
                    <p><strong>Distance:</strong> ${data.distance_km} km</p>
                    <p><strong>Duration:</strong> ${data.duration_minutes} minutes</p>
                    <p><strong>Safety Score:</strong> ${data.safety_score}</p>
                `;

                // Display the route on the map
                displayRoute(data.route_geometry);
            } else {
                resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to find a safe route. Try again later.');
        }
    });
});

function displayRoute(routeGeometry) {
    // Remove existing route layer if any
    if (routeLayer) {
        map.removeLayer(routeLayer);
    }

    // Create a new route layer
    routeLayer = L.polyline(routeGeometry, {color: 'blue', weight: 5}).addTo(map);

    // Fit the map to the route bounds
    map.fitBounds(routeLayer.getBounds());
}
