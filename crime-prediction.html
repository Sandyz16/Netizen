document.getElementById('predict-btn').addEventListener('click', function () {
    const location = document.getElementById('location').value.trim();
    const hour = parseInt(document.getElementById('hour').value.trim());

    if (!location || isNaN(hour)) {
        alert("Please enter a valid location and hour.");
        return;
    }

    // Call the backend API to get prediction
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location, hour })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('result').innerText = data.error;
            } else {
                document.getElementById('result').innerText =
                    data.prediction ? "High Risk" : "Low Risk";
            }
        })
        .catch(error => console.error('Error:', error));
});
