gsap.registerPlugin(ScrollTrigger);

// Mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZmpvZSIsImEiOiJjbTd4ajNraW8wNnJxMmtzY3ZocWtmeDV4In0.b-sPpedih2b4pnr6OxJ9Qw';

// OpenRouteService API key
const orsApiKey = '5b3ce3597851110001cf6248991046e1ec1d40029a127b8261bcc6c3';

let map;
const donations = [
    { lat: 0.1, lng: 0.1, name: "Restaurant A", items: "Pasta, Salad" },
    { lat: -0.1, lng: -0.1, name: "Bakery B", items: "Bread, Pastries" },
];

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Get the donate and find buttons
const donateButton = document.querySelector('.cta-button.donate');
const findButton = document.querySelector('.cta-button.find');

// Add event listeners to the buttons
donateButton.addEventListener('click', () => {
    document.querySelector('#donate').scrollIntoView({
        behavior: 'smooth'
    });
});

findButton.addEventListener('click', () => {
    document.querySelector('#find-food').scrollIntoView({
        behavior: 'smooth'
    });
});

// Animation for process steps
gsap.from(".process-step", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".process-container",
        start: "top 80%"
    }
});

// Form submission and adding to food list
const donationForm = document.getElementById('donation-form');
const foodList = document.getElementById('food-donations');

donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const restaurantName = document.getElementById('restaurant-name').value;
    const foodItems = document.getElementById('food-items').value;
    
    const newDonation = document.createElement('li');
    newDonation.textContent = `${restaurantName} - ${foodItems}`;
    
    foodList.appendChild(newDonation);
    
    // Animation for form submission
    gsap.to(donationForm, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        onComplete: () => {
            donationForm.innerHTML = '<h3>Thank you for your donation!</h3>';
            gsap.to(donationForm, {opacity: 1, y: 0, duration: 0.5});
            
            // Reset form after a delay
            setTimeout(() => {
                donationForm.reset();
                donationForm.innerHTML = donationForm.originalHTML;
                gsap.to(donationForm, {opacity: 1, y: 0, duration: 0.5});
            }, 2000);
        }
    });
});

// Store original form HTML
donationForm.originalHTML = donationForm.innerHTML;

// Parallax effect for home section
gsap.to("#home", {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Animated counter for impact statistics
const impactStats = [
    {element: document.getElementById('meals-served'), target: 10000},
    {element: document.getElementById('restaurants-partnered'), target: 500},
    {element: document.getElementById('ngo-partners'), target: 50}
];

impactStats.forEach(stat => {
    gsap.to(stat.element, {
        innerHTML: stat.target,
        duration: 2,
        scrollTrigger: {
            trigger: "#impact",
            start: "top 80%"
        },
        onUpdate: function() {
            stat.element.innerHTML = Math.ceil(this.targets()[0].innerHTML);
        }
    });
});

function initMap() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2
    });

    donations.forEach(donation => {
        const marker = new mapboxgl.Marker()
            .setLngLat([donation.lng, donation.lat])
            .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${donation.name}</h3><p>Items: ${donation.items}</p>`);

        marker.setPopup(popup);

        // Add donation to the list
        const li = document.createElement('li');
        li.textContent = `${donation.name} - ${donation.items}`;
        li.addEventListener('click', () => {
            map.flyTo({
                center: [donation.lng, donation.lat],
                zoom: 15
            });
            marker.togglePopup();
            
            // Get user's current location
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                getDirections(userLat, userLng, donation.lat, donation.lng);
            }, () => {
                console.error("Unable to get user's location");
            });
        });
        foodList.appendChild(li);
    });
}

// Function to get directions using OpenRouteService
function getDirections(startLat, startLng, endLat, endLng) {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${orsApiKey}&start=${startLng},${startLat}&end=${endLng},${endLat}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const route = data.features[0].geometry.coordinates;
            
            // Remove existing route layer if it exists
            if (map.getLayer('route')) {
                map.removeLayer('route');
            }
            if (map.getSource('route')) {
                map.removeSource('route');
            }

            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: route
                        }
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 8
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// Initialize the map
initMap();

// Form input animation
document.querySelectorAll('#donation-form input, #donation-form textarea').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {borderColor: '#2ecc71', duration: 0.3});
    });
    input.addEventListener('blur', () => {
        gsap.to(input, {borderColor: '#ddd', duration: 0.3});
    });
});

// Hover effect for process steps
document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
        gsap.to(step, {scale: 1.05, duration: 0.3});
    });
    step.addEventListener('mouseleave', () => {
        gsap.to(step, {scale: 1, duration: 0.3});
    });
});
