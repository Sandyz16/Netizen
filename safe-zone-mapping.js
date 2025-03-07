mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZmpvZSIsImEiOiJjbTd4ajNraW8wNnJxMmtzY3ZocWtmeDV4In0.b-sPpedih2b4pnr6OxJ9Qw'; // Replace with your Mapbox token
const orsApiKey = '5b3ce3597851110001cf6248991046e1ec1d40029a127b8261bcc6c3'; // Your ORS API key

// Initialize Mapbox map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // Dark theme for the map
    center: [-74.5, 40], // Default center (New York coordinates)
    zoom: 9
});

map.addControl(new mapboxgl.NavigationControl()); // Add navigation controls (zoom, rotate)

// Ensure map resizes properly when window resizes
window.addEventListener('resize', () => {
    map.resize();
});

// Function to add a marker to the map
function addMarker(coordinates, locationName, description) {
    const marker = new mapboxgl.Marker({ color: "#ffffff" }) // White marker color
        .setLngLat(coordinates) // Set marker position
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${locationName}</h3><p>${description}</p>`)) // Add popup with location details
        .addTo(map);

    marker.togglePopup(); // Automatically open the popup
}

// Function to use ORS for geocoding
async function geocodeLocation(locationName, description) {
    try {
        const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${orsApiKey}&text=${encodeURIComponent(locationName)}`);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates; // Get the first result's coordinates

            // Add marker and fly to location
            addMarker(coordinates, locationName, description);
            map.flyTo({
                center: coordinates, // Fly to the found location
                zoom: 14,
                essential: true
            });

            addSafeZone(coordinates[0], coordinates[1]); // Add to heatmap source
        } else {
            alert("Location not found. Please try a different name.");
        }
    } catch (error) {
        console.error("Error fetching location data:", error);
        alert("An error occurred while searching for the location.");
    }
}

// Handle form submission
const reportForm = document.getElementById('reportForm');
reportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const locationName = document.getElementById('locationName').value;
    const description = document.getElementById('description').value;

    geocodeLocation(locationName, description); // Call ORS geocoding function
    reportForm.reset(); // Reset form fields after submission
});

// Initialize heatmap layer for safe zones
map.on('load', () => {
    map.addSource('safe-zones', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [] // Empty feature collection initially
        }
    });

    map.addLayer({
        id: 'safe-zones-heat',
        type: 'heatmap',
        source: 'safe-zones',
        maxzoom: 15,
        paint: {
            'heatmap-weight': 1,
            'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 1,
                15, 3
            ],
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
            ],
            'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 2,
                15, 20
            ],
            'heatmap-opacity': 0.7
        }
    });
});

// Function to add a safe zone to the heatmap source
function addSafeZone(lng, lat) {
    const safeZones = map.getSource('safe-zones')._data;
    safeZones.features.push({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lng, lat]
        }
    });
    map.getSource('safe-zones').setData(safeZones); // Update heatmap data source with new point
}

// Allow users to click on the map to add safe zones manually (optional)
map.on('click', (e) => {
    addSafeZone(e.lngLat.lng, e.lngLat.lat);
});
