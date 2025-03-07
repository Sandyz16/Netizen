@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #f7f9fc;
    color: #333;
    line-height: 1.6;
}

#background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(135deg, #8B0000, #5B001F); /* Wine Red to Burgundy Gradient */
}

header {
    text-align: center;
    padding: 50px 0;
    background: linear-gradient(135deg, #004B93, #0074D9); /* Blue Gradient */
    color: white; /* White text for contrast */
}

h1 {
    font-size: 3rem;
    margin-bottom: 10px;
}

header p {
    font-size: 1.2rem;
}

main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px;
}

.services-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.service {
    background-color: white; /* White cards */
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service:hover {
    transform: translateY(-10px);
}

.service-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto 20px;
}

.service-icon img {
    width: 100%;
}

.service h2 {
    font-size: 1.5rem;
    color: #004B93; /* Blue for main text */
}

.service p {
    color: black; /* Black for captions */
}

footer {
    text-align: center;
    padding: 20px;
    background-color: #004B93; /* Solid blue footer */
    color: white; /* White text for contrast */
}
